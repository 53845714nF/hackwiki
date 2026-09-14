---
title: "Caddy"
date: 2026-05-14T20:33:01+02:00
draft: false
hideLastModified: true
summaryImage: "img/logo.jpg"
keepImageRatio: true
summary: "Tip of the hat Reverse Proxy: Caddy"
showInMenu: false
tags: ["Network", "LetsEncrypt"]
---

Actually, Caddy deserves its own post, but it's so simple that I just wanted to mention it in case someone doesn't know it.
Caddy is a Reverse Proxy, similar to Nginx or Apache, but it can be configured very easily. It can automatically provide HTTPS (let's encrypt). It offers many features, such as File Server, Load Balancing, and much more.

The installation is incredibly simple. Under Debian, this is done with `sudo apt install caddy`.

After that, only the Caddyfile needs to be configured. It is usually located at `/etc/caddy/Caddyfile`.

The catch is that the `Caddyfile` is super simple.
Good documentation can be found at [Caddyfile](https://caddyserver.com/docs/caddyfile).