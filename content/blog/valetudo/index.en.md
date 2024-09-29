---
title: "Valetudo 🤖"
date: 2022-08-28T21:57:55+02:00
draft: false
hideLastModified: true
summaryImage: "img/valetudo.png"
keepImageRatio: true
summary: "Freeing the vacuum cleaner robot from the Chinese cloud."
showInMenu: false
tags: ["Smart Home", "Home Assistant"]
---

I want to talk about Valetudo, an open-source firmware for vacuum robots. Many of these devices come equipped with network sniffers that send collected data to servers in China. Valetudo aims to prevent this, which is why I’m glad this project exists.

I recently purchased a Dreamy Bot L10 Pro and followed the installation guide found [here](https://valetudo.cloud/pages/installation/dreame.html#uart).

Here’s an image of the installation process:

[Robot connected to USB adapter on laptop](img/valetudo_flash.jpg)

Another cool software is an [extension](https://github.com/Hypfer/lovelace-valetudo-map-card) for [Home Assistant](https://www.home-assistant.io/). This extension allows you to display the maps generated during cleaning, send control commands, and monitor the charging status as well as battery consumption.