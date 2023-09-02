---
title: "Proxmox 🗄️"
date: 2022-02-16T16:51:35+01:00
draft: false
hideLastModified: true
summaryImage: "img/proxmox.png"
keepImageRatio: true
summary: "Ein Überblick zu Proxmox VE. Und der Einsatz im Privaten sowie im geschäftlichen."
showInMenu: false
tags: ["Home Lab", "Proxmox"]
---

Während meiner Arbeitszeit sollte ich mich mit dem Thema Proxmox auseinander setzten. Doch irgendwie hat das Thema auch privat bei mir Einzug gehalten.
Meine Hardware habe ich ja schon in einem vorherigen Post beschrieben, nun ja auf dieser läuft oh Wunder: Proxmox. 🤯

## Virtualisierung
Ein paar Vorteile der Virtualisierung:
  - Die vorhandene Hardware kann besser ausgelastet werden.
  - Mehrerer Betriebssysteme auf einem Host
  - Trennung verschiedener Aufgabenbereiche
  - Besseres Handling bei Notfällen – Desaster Recovery
  - Kann Verfügbarkeiten erhöhen
  - Zentralisierte Verwaltung und Kontrolle
  - Fehler- und Sicherheitsisolation
  - Migrieren von VM’s auf beliebigen Host


## Das Unternehmen
Die Proxmox Server Solutions GmbH ist ein Unternehmen in Österreich, welches drei wesentliche Produkte anbietet:
  - Proxmox Virtual Environment (Um dies geht es heute 🙂)
  - Proxmox Mail Gateway
  - Proxmox Backup Server (Komm ich bestimmt auch noch irgendwann drauf zu sprechen 😉)

## Subscription
Vorab Proxmox ist eine Open source Lösung und lässt sich ganz ohne jegliche Lizenzkosten betreiben. Dennoch ist es ein Unternehmen, dass natürlich Geld verdienen möchte.

Darum gibt es ein vier stufiges Subscription Modell, dass einen Zugriff auf ein Repository bietet, in denen extra getestete Pakete zur Verfügung stehen.
Des weiteren gibt es je nach Stufe unterschiedlichen Support. 

Ich denke, für die privat betriebenen Home Labs sind dies nicht wirkliche Dinge, die man braucht. Aber als mittleres bis großes Unternehmen will man schon das die Software getestet ist und bei Fragen einer angerufen werden kann.

## System Requirements
Welche Vorraussetzungen muss man erfüllen, um seine eigene Promxox Umgebung zu betreiben?

  - CPU: 64bit (Intel EMT64 or AMD64) ( Also normale Computer CPU und keine Raspberry Pi)
  - Intel VT/AMD-V capable CPU/Mainboard for KVM full virtualization support
  - RAM: 1 GB RAM, plus additional RAM used for guests
  - Hard drive (Es sollten über 3GB sein, gibt Fälle, da ist das wichtig.)
  - One NIC (Muss idealerweise statische IP vergeben.)

## Installation
Die Installation ähnelt sehr stark einer normalen Linux Installation, was klar ist, da es sich um ein Debian mit vielen Erweiterungen handelt.
Wichtig ist, wie oben schon geschrieben das bei der Installation nach einer statischen IP Adresse gefragt wird. Sonst ist es einfaches durch klicken.

## Webinterface
Nach der erfolgreichen Einrichtung begrüßt einen auch schon das Webinterface von Proxmox.
Zu beachten ist hier, dass https und der Port 8006 verwendet werden muss.

```https://<Statische IP>:8006 ```

![Zeigt das Webinterface von Proxmox](img/webinterface.png)

Das Webinterface ist recht strukturiert aufgebaut. Auf der linken Seite sind die Virtuellen Maschinen und Container aufgelistet.
Wenn auf diese klickt wird, bekommt man mehr Informationen über diese Maschinen angezeigt.

## Container vs VMs

![Zeigt die Unterschiede zwischen KVM und Containern](img/lxc_vs_kvm.png)

Der große Unterschied zu normalen Virtuelllen Maschinen ist, dass die Virtualisierung auf Kernel Ebenen von statten geht.
Es wird also keine Hardware vorgespielt, auf dem dann das eigentliche Betriebssystem installiert wird.

### LXC
Eine kurze Auflistung die LXC besonders machen:
  - Nur Linux 🐧
  - kein Windows/BSD 
  - brauchen weniger Ram
  - teilweise unsicher ('lxd' Privilege Escalation)
  - kein eingebautes snapshot werden höstens vom File System übernommen 
  - keine live Migration
  - einzelne Features müssen 

### KVM
Sind klassische WMs
  - Kann alle Betriebssysteme installieren 
  - brauchen oft mehr Ram
  - Die Technologie ist älter und es gibt weniger Sicherheitslücken, die aufgedeckt werden
  - Es sind Snapshots in das mit eingebaut 📸
  - Live Migration ist möglich
  - Templates

## Cluster
Ein Thema was wohl wenige privat Anwender betrifft, aber ich will kurz ein paar Worte los werden.
Es gibt die Möglichkeit Proxmox auf mehren Servern zu installieren und diese dann miteinander zu verbinden.
Die zwei großen Vorteile liegen auf der Hand: Ressourcen zu teilen und Ausfall Sicherheit herzustellen.

## Netzwerke 🌐
Kann an jedem Proxmox Host konfiguriert werden:

### Klassise Linux Netzwerk Konfiguration
  - Brige
  - Bonds
  - VLAN

### Open vSwitch (OVS) 
  - Command Line =  ovs-vsctl
  - Brige
  - Bond
  - VLAN

## Storage 💾
Speicheranbindung ist für einige ein Thema, gerade wenn man vielleicht schon ein NAS im Betrieb hat.
Ich habe jedoch alle meine Platten lokal auf meinen Host eingebaut. Ein Terabyte als LVM-Thin für meine VMs.
Aber hier die besten Möglichkeiten shared Storage einzubinden.

### CIFS
Proxmox unterstützt SMB Version 2 und 3. Es wird aber als langsam beschrieben.

### NFS
Es werden alle NFS (Network File System) Versionen unterstützt. Die vierte soll am schnellsten sein.
Ich finde es einfach, schnell und praktisch.

### ISCSI
Bei ISCSI gibt es zwei Wege dies einzurichten:
  - Der erste ist, die LUN (Logical Unit Number) an die VMs durch zu reichen.
  - Der zweite Weg ist es das ISCSI einzubinden und dann im LVM, ZFS oder Directory zu formatieren. Dies ist aufwändiger.


## Migration von ESXi
Ein Punkt, der auch selten für Privat Anwender interessant ist. Aber ab und zu kommt es vor, dass Dienste, die man betreiben möchte als virtuelle Appliances zur Verfügung stehen.
Diese muss man dann umwandeln. Hier eine kurzer Ablauf:

1. .vmdk Dateien kopieren zum Proxmox 
2. Die .vmdk Dateien in qcow2 Format umwandeln:
```qemu-img convert -f vmdk ten4sg.vmdk -O qcow2 /var/lib/vz/images/123/ten4sg```
3. VM erstellen am Besten im Webinterface
4. Einbinden mit:
```qm importdisk 123 ten4sg local-1-HDD --format qcow2 ```
5. Einhängen und alte Platte löschen auch im Webinterface.


## App 📱
Proxmox bietet eine App, mit der man auch per Smartphone sein Proxmox Instanz administrieren kann.
Ist recht gut, um mal zu gucken, ob und wie die Maschinen laufen, sonst verwende ich sie eher selten.

## Andere Features
  - ZFS (Zettabyte File System)
  - Ceph
  - Vlan/Vxlan
  - API
  - Hochverfügbarkeit (englisch high availability, HA) 