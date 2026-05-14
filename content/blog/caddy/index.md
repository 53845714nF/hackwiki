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

Eigentlich ist Caddy keinen eigenen Post wert, da es so einfach ist, aber ich wollte es erwähnen falls es jemand nicht kennt.
Caddy ist ein Reverse Proxy, ähnlich wie Nginx oder Apache, der aber sehr einfach konfiguriert werden kann. Er kann HTTPS automatisch bereitstellen (let's encrypt). Er bietet eine menge an Features, z.B. File Server, Load Balancing und vieles mehr.


Die Insatallation ist denkbar einfach. Unter Debian führt man dies mit `sudo apt install caddy` aus.

Danach muss nur noch die Caddyfile konfiguriert werden. Das liegt meistens unter `/etc/caddy/Caddyfile`.

Da ist der Knackpunkt, denn das `Caddyfile` ist super einfach gehalten.
Gute Doku dazu findet ihr unter [Caddyfile](https://caddyserver.com/docs/caddyfile).
