---
title: "Distrobuilder for Lxc 📦"
date: 2024-03-10T19:16:43+01:00
draft: false
hideLastModified: true
summaryImage: "img/distrobuilder.png"
keepImageRatio: true
summary: "Creating an OpenWrt image for LXC with Distrobuilder and integrating it into Proxmox."
showInMenu: false
tags: ["lxc", "Proxmox", "Linux", "Distrobuilder", "golang", "containers", "OpenWrt", "Virtualization"]
---

Have you ever wondered how to create your own images for LXC and then integrate them into Proxmox?
Although I've been working with LXC for some time, I never really got around to creating my own image. Curious, I went on a quest and stumbled upon [Distrobuilder](https://github.com/lxc/distrobuilder) – a tool for creating images for LXC and LXD, written in Go.
(The tool can also create VM images, but I haven't tried that yet.)

## Installation ✨
The installation documentation is quite comprehensive, so I won't delve into it here.
Just note that at least Golang 1.21 is required.
I initially ran into problems because my Golang version was still at 1.20.

## Templates 🧩
Next, I grabbed the templates from the [template](https://github.com/lxc/lxc-ci) directory.
I was particularly interested in the OpenWrt template.

## Creating an image 🔨

In the template directory, I then executed the following command:
{{< codeWide >}}
distrobuilder build-lxc images/openwrt.yaml -o image.variant=default -o image.release=23.05 
{{< /codeWide >}}

This command creates a `rootfs.tar.xz` and `metadata.tar.xz`. The `rootfs.tar.xz` can then be copied to the Proxmox server using `scp` or `rsync`.

It took me a while to understand that the `rootfs.tar.xz` is sufficient to create a container.
I thought I still needed to create a separate image.
But that's not the case.
Proxmox offers the ability to create a container directly from a `rootfs.tar.xz`.

With the following command, I created the container:

{{< codeWide >}}
pct create 107 ./rootfs.tar.xz --unprivileged 1 --ostype unmanaged --hostname openwrt -net0 name=eth0 -net1 name=eth1 --storage local-lvm
{{< /codeWide >}}

After some settings adjustments to the network interfaces, the container was ready to go and could be started.

## Conclusion 🏁
Overall, I find Distrobuilder to be an excellent tool for creating images for LXC. It's easy to use and allowed me to quickly and effortlessly create my own OpenWrt image and integrate it into Proxmox.