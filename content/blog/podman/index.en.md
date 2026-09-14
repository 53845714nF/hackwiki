---
title: "Podman Quadlets and Pods"
date: 2026-05-14T15:40:45+02:00
draft: false
hideLastModified: true
summaryImage: "img/logo.jpg"
keepImageRatio: true
summary: "This post shows how to run Podman Quadlet rootless and Pods under Debian."
showInMenu: false
tags: ["Containers", "DevOps"]
---

This article shows how to run Podman Quadlets and Pods under Debian. First, Podman Quadlets are installed rootless, and then a Pod is created.

## Quadlet Rootless Setup

Here is shown how to run Podman rootless under Debian.
Install Podman as follows: `sudo apt update && sudo apt install -y podman`

First, a user is created to run podman rootless: `useradd -m -s /bin/bash podmanuser`

Then, linger is activated for the user: `loginctl enable-linger podmanuser`

Linger is there so that the user can start their processes even when not logged in.

Then switch to the new user: `su - podmanuser`

Then set the XDG_RUNTIME_DIR variable in the bashrc:
{{< codeWide >}}
export XDG_RUNTIME_DIR=/run/user/1000
{{< /codeWide >}}

Save and log back in. Now Podman can be run rootless.

Now we can set up a Quadlet as a service as podmanuser:

For this, we still need to create the following directory: `mkdir -p ~/.config/containers/systemd`

### NGINX Example

Example under: `~/.config/containers/systemd/nginx.container`
The name of the file is important here, as it must end with `.container`.

{{< codeWide >}}
[Unit]  
Description=nginx Container  
After=network-online.target
  
[Container]  
Image=docker.io/nginx:latest  
Volume=/home/crunner/content:/usr/share/nginx/html  
PublishPort=8080:80  
ContainerName=nginx
  
[Install]  
WantedBy=multi-user.target default.target
{{< /codeWide >}}

There is a command to test if the configuration is error-free: `/usr/libexec/podman/quadlet -dryrun -user`

To start the container:
`systemctl --user daemon-reload`

`systemctl --user start nginx`

## Creating Pods

A Pod is a group of containers that work together.
It can be compared to Docker Compose.

In this example, a Pod is created consisting of two containers. A vector database called Weaviate and a small self-developed backend service.

The configuration looks like this:

A Pod File is created. This file must end with `.pod`.

{{< codeWide >}}
[Unit]
Description= Malware Univers Pod

[Pod]
PodName=malwareuniverse
Network=bridge

[Install]
WantedBy=default.target
{{< /codeWide >}}

The interesting parameter here is `Network`, which specifies the network the Pod should join. In this case, the `bridge` network is used.
This is a special case, as Weaviate always needs a private IP when starting. This is not the case for most other containers. The bridge is not a classic bridge that you can see with `ip a`. You can imagine it as a virtual network or a userspace network interface. I still find this a bit confusing. Under the hood, Podman uses the software [Pasta](https://passt.top/passt/about/) to realize this. The Pasta website is one of the wildest internet pages I know.

Then create the Quadlet file for the database container. This file must again end with `.container`.

{{< codeWide >}}
[Unit]  
Description=Vector Database for Malwareunivers
After=network-online.target
Wants=network-online.target
  
[Container]
ContainerName=weaviate
Image=cr.weaviate.io/semitechnologies/weaviate:1.31.6-7af1f78
Volume=/home/podmanuser/projects/malwareuniverse/weaviate:/var/lib/weaviate
Pod=malwareuniverse.pod
Exec=--host 0.0.0.0 --port 8080 --scheme http

Environment=QUERY_DEFAULTS_LIMIT=25
Environment=AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED=true
Environment=PERSISTENCE_DATA_PATH=/var/lib/weaviate
Environment=ADVERTISE_ADDRESS=127.0.0.1
Environment=CLUSTER_HOSTNAME=node1
Environment=DISABLE_CLUSTER=true
Environment=RAFT_BOOTSTRAP_EXPECT=1

[Install]  
WantedBy=default.target
{{< /codeWide >}}

For the pod, we then set the Pod we just created.

The other container looks like this in my case:

{{< codeWide >}}
[Unit]  
Description=Backend for Malwareunivers
After=network-online.target
Wants=network-online.target
  
[Container]
[Unit]  
Description=Reduces n-dimensional vectors
After=network-online.target
Wants=network-online.target
  
[Container]
ContainerName=reducer
Image=ghcr.io/malwareuniverse/reducer/reducer:v1.0.1
Pod=malwareuniverse.pod

Environment=WEAVIATE_HOST=weaviate
Environment=WEAVIATE_HTTP_PORT=8080
Environment=WEAVIATE_HTTP_SECURE=
Environment=WEAVIATE_GRPC_SECURE=

[Install]  
WantedBy=default.target
{{< /codeWide >}}

The backend service here called reducer is reachable on port 8000. If we want to reach it from outside (i.e., from the host), we need to add the following parameter to the Pod file:

{{< codeWide >}}
[Container]
PublishPort=8000:8000
{{< /codeWide >}}

With `systemctl --user start malwareuniverse-pod.service` we can then start the service. And with `systemctl --user status malwareuniverse-pod.service` we can check the status. With `podman ps`, all running containers are listed.

## Conclusion

I must say that I am pretty impressed with Quadlet and Pods.
It is a great way to run containers rootless and group the containers in Pods.
It is still a bit more cumbersome than Docker Compose though.