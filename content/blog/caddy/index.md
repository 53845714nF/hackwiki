---
title: "Caddy"
date: 2026-05-14T20:33:01+02:00
draft: false
hideLastModified: true
summaryImage: "img/logo.jpg"
keepImageRatio: true
summary: "Tooltipp Reverse Proxy: Caddy"
showInMenu: false
tags: ["Network", "LetsEncrypt"]
---

Eigentlich ist Caddy keinen eigenen Post wert, da es so einfach ist, aber ich wollte es erwähnen, falls es jemand nicht kennt.
Caddy ist ein Reverse Proxy, ähnlich wie Nginx oder Apache, der aber sehr einfach konfiguriert werden kann. Er kann HTTPS automatisch bereitstellen (Let's Encrypt). Er bietet eine Menge an Features, z.B. File Server, Load Balancing und vieles mehr.


Die Installation ist denkbar einfach. Unter Debian führt man dies mit `sudo apt install caddy` aus.

Danach muss nur noch das Caddyfile konfiguriert werden. Es liegt meistens unter `/etc/caddy/Caddyfile`.

Da ist der Knackpunkt, denn das `Caddyfile` ist super einfach gehalten.
Gute Doku dazu findet ihr unter [Caddyfile](https://caddyserver.com/docs/caddyfile).
