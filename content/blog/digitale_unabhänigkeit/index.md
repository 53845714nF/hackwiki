---
title: "Digitale Unabhängigkeit"
date: 2025-04-22T11:51:19+02:00
draft: false
hideLastModified: true
summaryImage: "img/digitale_unabhänigkeit.png"
keepImageRatio: true
summary: "Woher kommt meine Software? Wie unabhänig bin ich von auslänischen Unternehmen?"
showInMenu: false
tags: [""]
---

Seit der Wahl von Donald Trump steht für immer mehr Menschen das Thema digitale Unabhängigkeit im Fokus.
Mir persönlich war es schon vorher wichtig zu wissen, woher meine Software stammt – daher wollte ich einmal einen Kassensturz machen, was ich eigentlich alles verwende.


**Disclaimer:** Mir ist bewusst, dass selbst wenn ein System aus einem bestimmten Land stammt, darin oft Komponenten aus anderen Ländern stecken. Die folgende Darstellung ist daher stark vereinfacht. Es geht vor allem darum, wo die Unternehmen ihren Ursprung oder Hauptsitz haben – auch wenn sie in mehreren Ländern aktiv sind.


Auf die Idee hat mich das Video von the native web gebracht:

{{< yt oubEhb-_tEg >}}

## Hardware

- Zuhause verwende ich als Router eine [Fritz Box](https://fritz.com/). 🇩🇪
- Mein Fitnesstracker stammt von [Withings](https://www.withings.com/de/de/). 🇫🇷

Leider hört es bei europäischer Hardware auch schon auf.

Ich nutze:
  - Einen SoloKey,
  - Laptops von Lenovo,
  - ein Pixel-Smartphone,
  - Server von Supermicro,
  - Netzwerktechnik von Ubiquiti,
  - Mainboards von ASUS,
  - CPUs von Intel – allesamt US-Firmen. 🇺🇸

Einzige Ausnahmen: Monitore und Bildschirme von einem großen südkoreanischen Unternehmen mit "S". 🇰🇷

## Betribsysteme
Auf meinen Laptops und Desktops verwende ich:
  - [Linux Mint](https://www.linuxmint.com/) 🇮🇪
  - [Manjaro](https://manjaro.org/) 🇩🇪

In virtuellen Maschinen und Containern setze ich häufig auf [Debian](https://www.debian.org/).
Hier ist die Zuordnung schwierig: Obwohl Debian rechtlich in den USA sitzt, wird es weltweit von Freiwilligen entwickelt.

Auf meinem Smartphone läuft [Grapheneos](https://grapheneos.org/), das seinen Ursprung in Kanada hat. 🇨🇦

## Software im Altag

### Office
  - Für formatierte Texte nutze ich [Overleaf](https://www.overleaf.com). 🇬🇧
  - Für Tabellen verwende ich gelegentlich [LibreOffice](https://www.libreoffice.org). 🇩🇪

### E-Mail & Kalender
  - Meine Haupt-E-Mail liegt bei [Proton Mail](https://proton.me/), mit Sitz in der Schweiz. 🇨🇭
  - Auch den Kalender von Proton nutze ich gerne.
  - Empfehlenswert ist außerdem [Mailbox.org](https://mailbox.org/en/), ein deutscher Anbieter. 🇩🇪

### Soziale Netzwerke
  - Ich bin auf [Linkedin](https://www.linkedin.com) und [Github](https://github.com/) aktiv – beide US-Unternehmen. 🇺🇸
  - Europäische Alternativen wären [Xing](https://www.xing.com/) und [Codeberg](https://codeberg.org), beide aus Deutschland 🇩🇪 – aber dort fehlt oft der Netzwerkeffekt.

### Chat
Ich verwende aktuell drei Chat-Systeme – leider historisch gewachsen:

  - [Telegram](https://telegram.org/): Der Unternehmenssitz ist schwer festzumachen, mit Büros in Berlin, London und Singapur. 🇩🇪🇬🇧🇸🇬
  - [Discord](https://discord.com/): Ein US-Unternehmen 🇺🇸, das ich vor allem im Studium nutze – gute Chat- und Videokonferenzfunktionen.
  - [Matrix](https://matrix.org/): Ein dezentrales System mit Ursprung in England. 🇬🇧 Die Beliebtheit wächst, vor allem in technisch versierten Kreisen.

### Suchmaschine
Ich nutze [Startpage](https://www.startpage.com/), ein Anbieter aus den Niederlanden 🇳🇱 – auch wenn im Hintergrund Google die Suchergebnisse liefert.

### Code-Editor
Früher war ich großer Sublime-Fan – bis die Preise stiegen.
Danach habe ich viel mit [Vim](https://github.com/vim/vim) gearbeitet.
Der ursprüngliche Entwickler, Bram Moolenaar, kam aus den Niederlanden 🇳🇱, inzwischen wird das Projekt von Christian Brabandt aus Deutschland weitergeführt 🇩🇪.

Heute verwende ich jedoch fast ausschließlich VS Code von Microsoft 🇺🇸 – wegen der vielen Erweiterungen.

### Browser
Ich verwende [Firefox](https://www.mozilla.org/en-US/firefox/new/) – aber auch hier sind alle großen Alternativen aus den USA. 🇺🇸

### Video-Streaming
Auch wenn ich Frontends wie [NewPipe](https://github.com/TeamNewPipe/NewPipe) oder [Grajay](https://grayjay.app/) nutze, bleibt YouTube die unangefochtene Nummer eins.
Konkurrenz? Kaum – und wenn, dann auch meist aus den USA. 🇺🇸

### Karten & Reisen
Für Hotelbuchungen nutze ich oft [Booking.com](https://www.booking.com/). 🇳🇱
Für Navigation führt kaum ein Weg an Google Maps vorbei. 🇺🇸

Zwar hat [OpenStreetMap](https://www.openstreetmap.org) sehr gute Karten, aber leider keine echte Navigation durch Städte.

### KI & Sprachmodelle
Die dominanten Anbieter im Bereich generativer KI sind:
  - [ChatGPT](https://chatgpt.com) von [OpenAI](https://openai.com/) 🇺🇸
  - [Claude](https://claude.ai) von [Anthropic](https://www.anthropic.com/) 🇺🇸


## Cloud-Anbieter
Ich habe bisher folgende Anbieter genutzt:
  - [Hetzner](https://www.hetzner.com/) 🇩🇪
  - [Contabo](https://contabo.com/) 🇩🇪

Contabo ist günstig, aber der Service hat mich nicht ganz überzeugt – ich würde künftig wieder eher Hetzner nutzen.

## Selbsthosting
Wenn es um digitale Unabhängigkeit geht, ist **Self-Hosting** natürlich das Maß der Dinge – idealerweise mit selbst entwickelten oder kontrollierten Diensten.

Ich setze auf:
  - **Hypervisor/Basis:** [Proxmox](https://www.proxmox.com/en/) 🇦🇹
  - Alternativ: [Incus](https://github.com/lxc/incus) 🇨🇦

### Selbstgehostete Dienste (bei mir):

  - **Cloud-Speicher:** Nextcloud 🇩🇪
  - **Kubernetes:** K3s 🇩🇪
  - **Passwortmanager:** Psono 🇩🇪
  - **Dokumentation:** Bookstack 🇬🇧
  - **Git-Hosting:** Gitea 🇰🇷 (Alternative: Forgejo – mit mehr Community-Kontrolle)
  - **Monitoring:** Grafana 🇺🇸
  - **S3-Speicher:** Minio 🇺🇸
  - **Datenbank:** PostgreSQL 🇺🇸
  - **Konfigurationsmanagement:** SaltStack 🇺🇸
  - **Netzwerkmanagement:** Unifi Controller 🇺🇸

### Weitere spannende Tools (besonders für KMUs)

  - [Univention](https://www.univention.com) – Identity & Access Management 🇩🇪
  - [Open xchange](https://www.open-xchange.com) – E-Mail- und Groupware 🇩🇪
  - [FreeOffice](https://www.freeoffice.com) – Kompatibles Office zu Microsoft. 🇩🇪
  - [Odoo](https://www.odoo.com/) - ERP/CRM/CMS aus Belgien 🇧🇪
  - [Collabora Online](https://www.collaboraonline.com) – Office-Integration für Nextcloud 🇬🇧
  - [Matrix](https://matrix.org/) – dezentrales Chatprotokoll 🇬🇧


## Fatzit
Ich war selbst überrascht, wie viele deutsche (und europäische) Alternativen ich bereits verwende – oder zumindest kenne.

Die großen US-Softwareunternehmen nutze ich meist nur wegen des Netzwerkeffekts: Man ist dort, wo auch alle anderen sind.

Bei Hardware führt bei Mainstream-Komponenten leider kaum ein Weg an den USA vorbei.
