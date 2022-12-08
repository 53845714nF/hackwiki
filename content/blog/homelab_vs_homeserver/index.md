---
title: "Home Lab vs Home Server 💻"
date: 2021-09-25T14:07:04+02:00
draft: false
hideLastModified: true
summaryImage: "img/homelab.jpg"
keepImageRatio: true
summary: "Wo sehe ich die Unterschiede zwischen Home Lab und Home Server."
showInMenu: false
tags: ["Home Lab", "Home Server"]
---

Ich möchte hier mal kurz einen Überblick geben, was sich hinter den Begriffen verbirgt.

## Der Home Server 🏠🖥️
Fangen wir erst mal mit dem "Home" an, offensichtlich ist das Englisch für "Zu Hause". Und darum geht es, einen Server für zu Hause ein Platz für alle seine Daten die nicht irgendwo in der Cloud liegen. ☁️

Doch was verbirgt sich nun hinter dem Bergriff "Server"?

Vereinfacht ein Gerät, das für andere im Netz bestimmte Aufgaben übernimmt.
Also häufig irgendeine Art von Computer beziehungsweise Hardware NAS. Einer der häufigste Probleme dürfte wohl das Speichern und Bereitstellen von Daten sein. 💾

Der Home Server wird also für den privaten Einsatz genutzt und ist somit im produktiven Einsatz. Des weiteren kann man sagen, dass er oft nur einen bis wenige Dienste beherbergt.

### Zusammenfassung
  - häufig ein Rechner 🖥️
  - weniger Dienste 🖨️💾🎬
  - Produktiver Einsatz 🏋

## Das Home Lab 🏠🔬🧪
Einer der bekanntesten Orte im Internet wo sich alles über Home Labs dreht ist wohl [Subreddit Homelab](https://www.reddit.com/r/homelab/).

Aber was ist das nun genau?
Lab ist auch wieder Englisch und heißt Labor. Also ein Ort in dem Experimente durchgeführt werden, oder was man häufiger hört eine Testumgebung.
Viele berichten z.B. bei Reddit, es sei ihre Testumgebung, um sich weiter zu entwickeln.
Ziel ist es neue Werkzeuge auszuprobieren, Verfahren testen und zu entwickeln. Aber vor allem sein können und Umgang mit der Materie zu erweitern.
Ein weitere Punkt den es noch zum Vergleich zum Home Server gibt, ist das es hier auch um den Aufbau des Netzwerkes geht.
Gerade auf Reddit sieht man RGB beleuchtet Racks mit krassen Patchpanels, Switchen, Routern und etc.

### Zusammenfassung
  - mehrere Computer 🖥️🖥️
  - viele unterschiedliche Dienste
  - läuft nicht produktiv oder gekapselt vom Produktivsystem 🚧
  - häufig mit extra Netzwerk Komponenten 🕸️

## Mein Setup
Ich hab mir schon häufiger die Frage gestellt was ich den jetzt betreibe?
Wahrscheinlich ein Home Lab, auch wenn ich es ungern so nenne.
Ich betreibe einige VM und Container und habe auch ein paar Netzwerkkomponenten verbaut, dazu kommt noch ein Backup.

Recht Unspektakulär aber das sind meine Babys:

![My Lab](img/my_lab.jpg)

Ich möchte eine kleine Blog Reihe starten, in der ich zeige wie mein "Home Lab" aufgebaut ist.

Als erster kommt Hard- und Software. Ein kurzer einblick was VMs und Container sind.
Sowie meine Backup Lösung.
Dann natürlich noch einige Dienste, die ich darauf betreibe.
Um ein kleinen Überblick zu geben, ein Versionierungs-, Verwaltungs- Server, Cloud Instanz, Dokumentation, VPN, Config Management und in 2021 darf natürlich die Haus Automatisierung nicht fehlen.
Und natürlich will man das alles sicher gestalten.🔒