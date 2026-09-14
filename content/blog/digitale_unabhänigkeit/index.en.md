---
title: "Digital Independence"
date: 2025-04-22T11:51:19+02:00
draft: false
hideLastModified: true
summaryImage: "img/digitale_unabhänigkeit.png"
keepImageRatio: true
summary: "Where does my software come from? How independent am I from foreign companies?"
showInMenu: false
tags: [""]
---

Since the election of Donald Trump, the topic of digital independence has been in the focus of more and more people.
Personally, it was already important to me to know where my software comes from – so I wanted to do a stocktaking of what I actually use.

**Disclaimer:** I am aware that even if a system comes from a specific country, it often contains components from other countries. The following representation is therefore highly simplified. It is mainly about where the companies have their origin or headquarters – even if they are active in multiple countries.

The idea came from the video by the native web:

{{< yt oubEhb-_tEg >}}

## Hardware

- At home I use a [Fritz Box](https://fritz.com/) as my router. 🇩🇪
- My fitness tracker is from [Withings](https://www.withings.com/de/de/). 🇫🇷

Unfortunately, European hardware is where it ends.

I use:
  - A SoloKey,
  - Laptops from Lenovo,
  - a Pixel smartphone,
  - Servers from Supermicro,
  - Network equipment from Ubiquiti,
  - Motherboards from ASUS,
  - CPUs from Intel – all US companies. 🇺🇸

The only exceptions are monitors and screens from a large South Korean company with "S". 🇰🇷

## Operating Systems
On my laptops and desktops I use:
  - [Linux Mint](https://www.linuxmint.com/) 🇮🇪
  - [Manjaro](https://manjaro.org/) 🇩🇪

In virtual machines and containers I often use [Debian](https://www.debian.org/).
The assignment is difficult here: Although Debian is legally based in the USA, it is developed by volunteers worldwide.

On my smartphone, [GrapheneOS](https://grapheneos.org/) is installed, which originates from Canada. 🇨🇦

## Software in Daily Use

### Office
  - For formatted text I use [Overleaf](https://www.overleaf.com). 🇬🇧
  - For spreadsheets I occasionally use [LibreOffice](https://www.libreoffice.org). 🇩🇪

### Email & Calendar
  - My main email is with [Proton Mail](https://proton.me/), headquartered in Switzerland. 🇨🇭
  - I also enjoy using Proton's calendar.
  - Also recommended is [Mailbox.org](https://mailbox.org/en/), a German provider. 🇩🇪

### Social Networks
  - I am active on [LinkedIn](https://www.linkedin.com) and [Github](https://github.com/) – both US companies. 🇺🇸
  - European alternatives would be [Xing](https://www.xing.com/) and [Codeberg](https://codeberg.org), both from Germany 🇩🇪 – but the network effect is often missing there.

### Chat
I currently use three chat systems – unfortunately historically grown:

  - [Telegram](https://telegram.org/): The company headquarters are hard to pin down, with offices in Berlin, London, and Singapore. 🇩🇪🇬🇧🇸🇬
  - [Discord](https://discord.com/): A US company 🇺🇸, which I mainly use during my studies – good chat and video conferencing features.
  - [Matrix](https://matrix.org/): A decentralized system with origins in England. 🇬🇧 Its popularity is growing, especially in technically savvy circles.

### Search Engine
I use [Startpage](https://www.startpage.com/), a provider from the Netherlands 🇳🇱 – even though Google provides the search results in the background.

### Code Editor
I was a big Sublime fan – until the prices went up.
After that, I worked a lot with [Vim](https://github.com/vim/vim).
The original developer, Bram Moolenaar, came from the Netherlands 🇳🇱, and the project is now maintained by Christian Brabandt from Germany 🇩🇪.

However, today I almost exclusively use VS Code from Microsoft 🇺🇸 – because of the many extensions.

### Browser
I use [Firefox](https://www.mozilla.org/en-US/firefox/new/) – but even here all the major alternatives are from the USA. 🇺🇸

### Video Streaming
Even though I use frontends like [NewPipe](https://github.com/TeamNewPipe/NewPipe) or [Grajay](https://grayjay.app/), YouTube remains the undisputed number one.
Competition? Rarely – and when, then mostly from the USA. 🇺🇸

### Maps & Travel
For hotel bookings I often use [Booking.com](https://www.booking.com/). 🇳🇱
For navigation, Google Maps is hard to beat. 🇺🇸

While [OpenStreetMap](https://www.openstreetmap.org) has very good maps, it unfortunately has no real city navigation.

### AI & Language Models
The dominant providers in the field of generative AI are:
  - [ChatGPT](https://chatgpt.com) from [OpenAI](https://openai.com/) 🇺🇸
  - [Claude](https://claude.ai) from [Anthropic](https://www.anthropic.com/) 🇺🇸

## Cloud Providers
I have used the following providers so far:
  - [Hetzner](https://www.hetzner.com/) 🇩🇪
  - [Contabo](https://contabo.com/) 🇩🇪

Contabo is cheap, but the service did not fully convince me – I would use Hetzner again in the future.

## Self-Hosting
When it comes to digital independence, **Self-Hosting** is of course the gold standard – ideally with self-developed or controlled services.

I rely on:
  - **Hypervisor/Base:** [Proxmox](https://www.proxmox.com/en/) 🇦🇹
  - Alternative: [Incus](https://github.com/lxc/incus) 🇨🇦

### Self-Hosted Services (mine):

  - **Cloud Storage:** Nextcloud 🇩🇪
  - **Kubernetes:** K3s 🇩🇪
  - **Password Manager:** Psono 🇩🇪
  - **Documentation:** Bookstack 🇬🇧
  - **Git Hosting:** Gitea 🇰🇷 (Alternative: Forgejo – with more community control)
  - **Monitoring:** Grafana 🇺🇸
  - **S3 Storage:** Minio 🇺🇸
  - **Database:** PostgreSQL 🇺🇸
  - **Configuration Management:** SaltStack 🇺🇸
  - **Network Management:** Unifi Controller 🇺🇸

### Other Interesting Tools (especially for SMEs)

  - [Univention](https://www.univention.com) – Identity & Access Management 🇩🇪
  - [Open xchange](https://www.open-xchange.com) – Email and Groupware 🇩🇪
  - [FreeOffice](https://www.freeoffice.com) – Microsoft-compatible Office. 🇩🇪
  - [Odoo](https://www.odoo.com/) - ERP/CRM/CMS from Belgium 🇧🇪
  - [Collabora Online](https://www.collaboraonline.com) – Office integration for Nextcloud 🇬🇧
  - [Matrix](https://matrix.org/) – decentralized chat protocol 🇬🇧

## Conclusion
I was surprised myself by how many German (and European) alternatives I already use – or at least know about.

I mostly use the big US software companies only because of the network effect: You are where everyone else is.

For mainstream hardware components, unfortunately there is hardly any way around the USA.