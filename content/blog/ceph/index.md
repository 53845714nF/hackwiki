---
title: "Ceph für dummies"
date: 2026-05-13T15:51:16+02:00
draft: false
hideLastModified: true
summaryImage: "img/logo.jpg"
keepImageRatio: true
summary: "Der Post zeigt meinen Weg zum ersten Ceph Cluster."
showInMenu: false
tags: ["ceph", "storage", "homelab", "DevOps"]
---

Ich habe mich ein wenig mit Ceph auseinandergesetzt, ich bin noch lange kein Profi, aber ich wollte mien wissen teilen und für mich selbst festhalten. 

Ceph ist ein Open-Source Software-Defined Storage (SDS)-System, das eine skalierbare und fehlertolerante Lösung für die Speicherung und Verwaltung großer Datenmengen bietet.

## Installation

### Minimal Setup

Das ist das absolute Minimum um Ceph zum Laufen zu bekommen.
Für produktive Umgebungen gibt es bestimmt deutlich bessere Anleitungen online.
Das hier ist einfach das, was ich gemacht habe.

  - 3 Nodes
  - Debian 13 Trixie ([Packer Template für Debian](https://github.com/53845714nF/packer-proxmox-debian))
  - Ceph Quincy (Standard Version)

Wichtig ist, dass die Nodes eine feste IP haben und sich gegenseitig per Hostnamen erreichen können. Die Nodes müssen Zeitlich Synchronisiert sein. SSH Zugriff zwischen den Nodes ohne Passwort ist auch zwingend notwendig. Hostnames müssen in `/etc/hosts` eingetragen sein.

### Netzwerk Vorbereitung

Ich habe 3 Interfaces auf den Nodes verbaut:

  - `vmbr0` - Management Interface (Wird auch von Proxmox genutzt) Bsp.: `192.168.178.0/24`
  - `vmbr1` - Ceph Public Interface Bsp.: `10.10.0.0/24`
  - `vmbr2` - Ceph Cluster Interface Bsp.: `10.10.20.0/24`

Das Public Netzwerk wird für die Kommunikation zwischen den Clients und dem Cluster genutzt. Das Cluster Netzwerk wird für die Kommunikation zwischen den Nodes im Cluster genutzt.

Das Cluster Netzwerk wird für OSD Replikation, Recovery und Rebalancing genutzt.


### Netzwerk einrichten

Auf den Nodes habe ich die Netzwerkkarten wie folgt konfiguriert `/etc/network/interfaces`:

{{< codeWide >}}
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug ens18
iface ens18 inet dhcp
# This is an autoconfigured IPv6 interface
iface ens18 inet6 auto

auto ens19
  iface ens19 inet static
  address 10.10.10.1/24

auto ens20
  iface ens20 inet static
  address 10.10.20.1/24
{{< /codeWide >}}


Netzwerk neu starten: `sudo systemctl restart networking`
Hostnamen in die `/etc/hosts` eintragen:


{{< codeWide >}}
10.10.10.1 ceph1
10.10.10.2 ceph2
10.10.10.3 ceph3
{{< /codeWide >}}

SSH Login zwischen den Nodes ohne Passwort ermöglichen:

{{< codeWide >}}
ssh-keygen -t ed25519
ssh-copy-id root@ceph2
ssh-copy-id root@ceph3
{{< /codeWide >}}

### Abhängigkeiten Installieren

Als nächstes müssen wir sicherstellen, dass die nötigen Pakete installiert sind. Dafür benötigen wir unter Debian Podman, da die Aktuelle Ceph Version nicht als Debian Paket zur Verfügung steht.

{{< codeWide >}}
apt update
apt install -y curl gnupg podman lvm2 chrony
{{< /codeWide >}}

Danach den Cephadm Paket installieren:

{{< codeWide >}}
apt install -y cephadm
{{< /codeWide >}}

Falls lvcreate nicht gefunden werden sollte, muss der Path angepasst werden: `export PATH=$PATH:/usr/sbin:/sbin`

Danach starten wir das Deployment von Ceph:

{{< codeWide >}}
cephadm bootstrap --mon-ip 192.168.178.139
{{< /codeWide >}}

Falls Sie Anmerkungen, Vorschläge oder Fragen haben, können Sie sich gerne per E-Mail, LinkedIn oder GitHub bei mir melden.