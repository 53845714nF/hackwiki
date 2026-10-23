---
title: "Grafikkarte für Home Server"
date: 2026-10-23T10:03:13+02:00
draft: false
hideLastModified: true
summaryImage: "img/graphic_card.jpg"
keepImageRatio: true
summary: "Wie man Grafikarte in Proxmox einrichtet?"
showInMenu: false
tags: ["Homelab", "Proxmox", "Containers", "Hardware", "Virtualization"]
---


Seit nunmehr als fünf Jahren läuft mein Homeserver größtenteils durchgängig. Unter normalen Umständen wäre ein Hardware-Update denkbar. Leider sind die Preise aufgrund der hohen Nachfrage durch KI-Rechenzentren so stark gestiegen, dass sich dies auf fast alle anderen Hardwarekomponenten auswirkt.

Ich betreibe seit Kurzem eine Jellyfin-Instanz auf meinem Server. Für das Transcoding benötige ich eine Grafikkarte.

Da das Mainboard schon älter ist und das Gehäuse sehr klein ausfällt, kommen nicht viele Karten infrage. Am liebsten hätte ich die NVIDIA Quadro T600 mit 4 GB genommen, aber selbst hier haben sich die Preise nahezu verdoppelt.

Letztendlich ist es die NVIDIA Quadro P400 geworden. Für Full-HD-Transcoding sollte sie ausreichen. 4K ist damit bedauerlicherweise nicht drin.

Der Einbau war aufgrund des geringen Platzes im Gehäuse etwas fummelig. Alles in allem war er aber einfach und schnell erledigt.

## Treiber auf dem Host installieren

Zunächst müssen wir den Open-Source-Treiber Nouveau deaktivieren, da dieser kein Hardware-Transcoding über NVENC unterstützt.

Prüfen, ob Nouveau verwendet wird:

{{< codeWide >}}
lsmod | grep nouveau
{{< /codeWide >}}

Wenn das der Fall ist, muss der Treiber blockiert werden:

{{< codeWide >}}
echo -e "blacklist nouveau\noptions nouveau modeset=0" > /etc/modprobe.d/blacklist-nouveau.conf
update-initramfs -u
reboot
{{< /codeWide >}}

Anschließend installieren wir die benötigten Werkzeuge:

{{< codeWide >}}
apt update && apt full-upgrade -y
apt install -y pve-headers-$(uname -r) build-essential dkms
{{< /codeWide >}}

Den passenden Treiber heraussuchen:

[Hier](https://www.nvidia.com/de-de/drivers/) kann man die Daten der Grafikkarte eingeben. Bei mir wurde [dieser Treiber](https://www.nvidia.com/de-de/drivers/details/281494/) angezeigt.

{{< codeWide >}}
wget https://de.download.nvidia.com/XFree86/Linux-x86_64/580.196.07/NVIDIA-Linux-x86_64-580.196.07.run
chmod +x NVIDIA-Linux-x86_64-580.196.07.run
./NVIDIA-Linux-x86_64-580.196.07.run
{{< /codeWide >}}

Die erfolgreiche Installation überprüfen:

{{< codeWide >}}
nvidia-smi
{{< /codeWide >}}

## Karte an einen Container durchreichen

Die Grafikkarte wird an den LXC-Container durchgereicht. Dort muss exakt derselbe Treiber installiert werden, allerdings ohne das Kernel-Modul, da sich der Container den Kernel mit dem Proxmox-Host teilt.

{{< codeWide >}}
vim /etc/pve/lxc/380.conf
{{< /codeWide >}}

Folgende Einträge ergänzen:

{{< codeWide >}}
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 226:* rwm
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file
{{< /codeWide >}}

Anschließend den Treiber installieren:

{{< codeWide >}}
wget https://de.download.nvidia.com/XFree86/Linux-x86_64/580.196.07/NVIDIA-Linux-x86_64-580.196.07.run
chmod +x NVIDIA-Linux-x86_64-580.196.07.run
./NVIDIA-Linux-x86_64-580.196.07.run --no-kernel-module
{{< /codeWide >}}

{{< notificationBlue >}}
Hinweis 1: `nvidia-smi` zeigt die Prozesse im Container nicht an. Auf dem Proxmox-Host werden sie hingegen angezeigt. Das scheint ein Berechtigungsproblem zu sein.
{{< /notificationBlue >}}

{{< notificationBlue >}}
Hinweis 2: Da LXC-Container keine vollwertigen virtuellen Maschinen sind, sondern sich den Kernel (und damit die Hardware-Treiber) mit dem Proxmox-Host teilen, kann die Grafikkarte gleichzeitig an beliebig viele LXC-Container durchgereicht werden.

Das gleichzeitige Durchreichen an mehrere virtuelle Maschinen ist hingegen nicht möglich. Wenn du eine Grafikkarte an eine vollwertige virtuelle Maschine durchreichst, nutzt Proxmox dafür PCIe-Passthrough (VFIO). Bei dieser Methode wird die Grafikkarte physisch vom Host-System entkoppelt und exklusiv der virtuellen Maschine zugewiesen.
{{< /notificationBlue >}}