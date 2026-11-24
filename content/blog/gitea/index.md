---
title: "Gitea 🍵"
date: 2022-08-08T20:03:02+02:00
draft: false
hideLastModified: true
summaryImage: "img/gitea.webp"
keepImageRatio: true
summary: "Den eigenen Git-Service einrichten. Und die Migration von Alpine zu Debian."
showInMenu: false
tags: ["Programmieren", "Git", "HomeLab", "DevOps"]
---

## Vorwort zu Git
Git ist das mittlerweile marktbeherrschende Versionsverwaltungstool. Die grobe Idee ist es, Zustände von verschiedenen Versionen des Quellcodes zu verwalten.
Ein Git-Tutorial wäre für einen Blogpost aber zu lang, darum verweise ich hier mal auf ein paar gute Quellen. 
Die erste ist eine gute YouTube-Einsteigerreihe, zu finden unter: [Git und Github Tutorials Deutsch](https://www.youtube.com/playlist?list=PLNmsVeXQZj7rbmmqb1Lt_RGU4DEhelTrR). Das zweite ist das ausführliche Handbuch, dies gibt es unter: [Pro Git Buch](https://git-scm.com/book/de/v2).

Eine weitere Eigenschaft von Git ist es, ein verteiltes System zu sein. Es besteht die Möglichkeit, dass jeder sein eigenes Repository eröffnet und dies mit anderen Repositorys abgleicht.
In der Regel hat man aber einen zentralen Server, auf dem das Hauptrepository abgelegt wird. Häufig verfügen diese Server noch über eine einfache Web UI, um Interaktionen mit dem Repo zu erleichtern.
Der wohl größte Vertreter dieser Art von Software ist wohl [GitHub](https://github.com/). Weitere sind [GitLab](https://about.gitlab.com) und [Gitea](https://gitea.io/en-us/).

## Meine Vorgeschichte mit Gitea 🕰️
Der erste Dienst, den ich auf meinem Home Server installiert habe, war nun also ein Gitea.

Es ist schlank, verbraucht wenig Ressourcen und die Weboberfläche sieht auch gut aus. Also ideal für mich.
Meine erste Installation von Gitea bestand aus einem LXC Container mit Alpine Linux. Mit dem Paketmanager von Alpine ließ sich das Paket `gitea` einfach installieren.
Da ich nun eine homogene Serverlandschaft anstrebe, sprich alle Server sollen mit Debian 11 auf LXC laufen, musste nun der Alpine Container weichen. 

Es stand mir jetzt die Migration meines Git-Servers bevor. Leider paketiert Gitea seine Software nicht für Debian. Die Installation ist somit ein wenig schwieriger als unter Alpine.
Gitea selbst ist in [Golang](https://go.dev/) geschrieben und es wird ein static link Binary zur Verfügung gestellt. Dies kann gedownloadet werden, doch der Rest muss vom Admin selbst angepasst werden.

## Installation von Gitea unter Debian

Hier gebe ich die Installation unter Debian schemenhaft an:

**Update und "Dependencies":**
{{< codeWide >}}
apt -y update
apt -y install git vim bash-completion
{{< /codeWide >}}

**Benutzer hinzufügen:**
{{< codeWide >}}
adduser \
   --system \
   --shell /bin/bash \
   --gecos 'Git Version Control' \
   --group \
   --disabled-password \
   --home /home/gitea \
   gitea
{{< /codeWide >}}


**Downloaden und nach `/usr/local/bin` verschieben:**
{{< codeWide >}}
curl -s  https://api.github.com/repos/go-gitea/gitea/releases/latest | grep browser_download_url  |  cut -d '"' -f 4  | grep '\linux-amd64$' | wget -i -
{{< /codeWide >}}

**Rechte verändern und umbenennen:**
{{< codeWide >}}
chmod +x gitea-*-linux-amd64
mv gitea-*-linux-amd64 /usr/local/bin/gitea
{{< /codeWide >}}

**Ordner für Files anlegen:**
{{< codeWide >}}
mkdir -p /etc/gitea /var/lib/gitea/{custom,data,indexers,public,log}
chown gitea:gitea /var/lib/gitea/{data,indexers,log}
chmod 750 /var/lib/gitea/{data,indexers,log}
chown root:gitea /etc/gitea
chmod 770 /etc/gitea
{{< /codeWide >}}

**Systemd Unit File erstellen:**
{{< codeWide >}}
vim /etc/systemd/system/gitea.service
{{< /codeWide >}}

{{< codeWide >}}
[Unit]
Description=Gitea (Git with a cup of tea)
After=syslog.target
After=network.target

[Service]
LimitMEMLOCK=infinity
LimitNOFILE=65535
RestartSec=2s
Type=simple
User=gitea
Group=gitea
WorkingDirectory=/var/lib/gitea/
ExecStart=/usr/local/bin/gitea web -c /etc/gitea/app.ini
Restart=always
Environment=USER=gitea HOME=/home/gitea GITEA_WORK_DIR=/var/lib/gitea

[Install]
WantedBy=multi-user.target
{{< /codeWide >}}

**Systemd gitea Service starten:**
{{< codeWide >}}
systemctl daemon-reload
systemctl enable --now gitea
systemctl status gitea
{{< /codeWide >}}

**Zusätzliche Rechte für Gitea**
Ist wichtig, da der Dienst sonst nicht startet.

{{< codeWide >}}
setcap 'cap_net_bind_service=+ep' /usr/local/bin/gitea
{{< /codeWide >}}

## Migration
Die Migration umfasste zwei Teile: ein Backup der Daten und ein Backup der Datenbank.
Die Daten waren hauptsächlich die Repos, die auf den neuen Server kopiert werden mussten.
Gegebenenfalls müssen noch Linux Rechte angepasst werden, falls sich der User, der Gitea ausführt, geändert hat. 

Ich hatte auch noch den Fall, dass ich Git Hooks anpassen musste, da sich das Verzeichnis, in dem Gitea liegt, verändert hat.
Hierfür folgenden Command benutzen:
{{< codeWide >}}
grep -r "/usr/bin/gitea" . | cut -d : -f1 | xargs sed -i 's#/usr/bin/gitea#/usr/local/bin/gitea#g' 
{{< /codeWide >}}

Die Datenbank war ein SQLite, diese ließ sich auch anstandslos dumpen und wieder einspielen. 

Abschließend kann man sagen, die Migration war schwieriger als erwartet, aber kein Hexenwerk. 
Ich bin zufrieden, dass ich nun ein Gitea mit Debian 11 unter der Haube besitze. 😄
