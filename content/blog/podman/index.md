---
title: "Podman Quadlets und Pods"
date: 2026-05-14T15:40:45+02:00
draft: false
hideLastModified: true
summaryImage: "img/logo.jpg"
keepImageRatio: true
summary: "In diesem Post wird gezeigt wie Podman Quadlet rootless und Pods unter Debian betreiben kann."
showInMenu: false
tags: ["Containers", "DevOps"]
---

In diesem Artikel wird gezeigt wie man Podman Quadlets und Pods unter Debian betreiben kann. Dazu werden erst Podman Quadlets rootless installiert und dann ein Pod erstellt.

## Quadlet rootless setup

Hier gezeigt wie man Podman rootless betreiben kann unter Debian.
Podman wie folgt installieren: `sudo apt update && sudo apt install -y podman`

Als erstes wird ein user erstellt, um podman rootless zu betreiben:`useradd -m -s /bin/bash podmanuser`

Danach wird der linger für den user aktiviert:`loginctl enable-linger podmanuser`

Ein linger ist dafür da, dass der user auch wenn er nicht eingeloggt ist, seine Prozesse starten kann.


Dann wechseln in den neuen User: `su - podmanuser`

Dann in der bashrc die Variable XDG_RUNTIME_DIR setzen:
{{< codeWide >}}
export XDG_RUNTIME_DIR=/run/user/1000
{{< /codeWide >}}

Speichern und neu einloggen. Nun kann Podman rootless betrieben werden.

Nun können wir als podmanuser Quatlet als Service einrichten:

Dafür müssen wirr noch den folgenden Ordner erstellen: `mkdir -p ~/.config/containers/systemd`

### NGINX Beispiel

Beispiel unter: `~/.config/containers/systemd/nginx.container`
Wichrig ist hier der Name des Files, da dieser mit `.container` enden muss.

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


Es gibt ein Befehl zum Testen, ob die Konfiguration Fehlerfrei ist: `/usr/libexec/podman/quadlet -dryrun -user`

Um den Container zu starten: 
`systemctl --user daemon-reload`

`systemctl --user start nginx`


## Pods erstellen

Ein Pod ist eine Gruppe von Containern, die zusammenarbeiten.
Vergleichen kann man es mit einem Docker Compose.

In diesem Beispiel wird ein Pod erstellt, der aus zwei Containern besteht. Eine Vektor Datenbank namens Weaviate und einen kleinem selbst entwickelten Backend Service.

Die Konfiguration dazu sieht wie folgt aus:

Es wird ein Pod File erstellt. Dieses Fiel muss auf `.pod` enden.

{{< codeWide >}}
[Unit]
Description= Malware Univers Pod

[Pod]
PodName=malwareuniverse
Network=bridge

[Install]
WantedBy=default.target
{{< /codeWide >}}

Interessant ist hier der Parameter `Network`, dieser gibt das Netzwerk an, dem der Pod beitreten soll. In diesem Fall wird das `bridge` Netzwerk genutzt.
Dies ist ein sonderfall, da Weaviate beim Start immer ein private IP benötigt. Dies ist bei den meisten anderen Containern nicht der Fall. Es handelt sich bei der bridge nicht um ein klassisches Bridge die man mit `ip a` sieht. Man kann es sich wie ein virtuelles virtuelles Netzwerk vorstellen oder ein userspace Netzwwerk Interface. Ich finde das immer noch ein wenig verwirrend. Unter der haube nutzt Podman die software [Pasta](https://passt.top/passt/about/) um dies zu realisieren. Die Seite von Pasta ist eine der willderen Internetseiten die ich kenne.

Dann das Quadlet file für den Datenbank Container erstellen. Dieses File muss mit der wieder mit der Endung `.container` enden.

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

Bei pod müssen wir dann unseren Pod den wir gerade erstellt haben setzen.

Den weitere Container sieht in meinem fall so aus:

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


Der Backend Service hier reduzer genannt ist auf port 8000 zu erreichen. Wenn wird diesen von außen (also auf dem Host) erreichen wollen müssen wir im Pod-File den folgenden Parameter hinzufügen:

{{< codeWide >}}
[Container]
PublishPort=8000:8000
{{< /codeWide >}}

Mit `systemctl --user start malwareuniverse-pod.service` können wir dann den Dienst starten. Und mit `systemctl --user status malwareuniverse-pod.service` können wir den Status prüfen. Mit `podman ps` werden alle laufenden Container aufgelistet.

## Fazit

Ich muss sagen, dass ich ziemlich begeistert von Quadlet und Pods bin. 
Es ist eine tolle Möglichkeit, Container rootless zu betreiben und die Container in Pods zu gruppieren.
Es aber um einiges umständlicher als Docker Compose.