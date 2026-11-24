---
title: "Lab Hardware 🧪"
date: 2022-02-09T23:57:56+01:00
draft: false
hideLastModified: true
summaryImage: "img/hardware.jpg"
keepImageRatio: true
summary: "Das Setup meines Home Labs. Und worauf ich bei der Erstellung geachtet habe."
showInMenu: false
tags: ["HomeLab"]
---

Ich möchte hier mal die Hardware meines Home Labs beschreiben.

Warnhinweis: Kann Spuren von unbezahlter Werbung enthalten

## Anfangen! ⏳

Aber viel wichtiger ist es, wenn man Interesse an dem Thema Home Lab hat, einfach mal anzufangen und keine Zeit zu verlieren.
Es ist erst mal nicht wichtig, mit welcher Hardware man startet, man wird sie sehr wahrscheinlich sowieso nochmal anpassen, wenn man merkt, was seine Bedürfnisse sind.
Ich selbst hab mit einem alten gebrauchten Dell Optiplex 755 von eBay angefangen. (Zugegeben vielleicht nicht die beste Wahl)
Man muss nicht warten, bis man sich die allzu teure Hardware leisten kann.

## Mainboard

Beim Mainboard hab ich mich für ein [Supermicro A2SDi-4C-HLN4F](https://www.supermicro.com/en/products/motherboard/A2SDi-4C-HLN4F) entschieden.
Preistechnisch war es kein Schnapper, aber ich hab auch zu einer Zeit gekauft, wo alles teuer war, von daher ...
Die CPU ist auf dem Mainboard verankert, kann also nicht entfernt oder ausgewechselt werden. Die CPU ist ein Intel Atom C3558 und damit eine x86_64 Architektur.
Zugegeben mit 2.2GHz und 4 Kernen ist diese recht schwach. Aber auch hier haben meine Erfahrungen gezeigt, dass es für mich völlig ausreicht.
Natürlich auch hier wieder abhängig von den Diensten und Anzahl der Nutzer.

## RAM

In meinem Setup hab ich auch festgestellt, dass ich immer knapp über 8GB brauche.
Darum hab ich mich für 16GB ECC RAM entschieden, so bleibt noch genug Platz für Spielereien aller Art.

### ECC

Es steht für Error Correction Code. Bei jeder Berechnung in einem Computer können Fehler entstehen, man spricht davon, dass Bits einfach umkippen (Bit-Flip).
Um diese Fehler zu vermeiden, gibt es diese Technologie des ECC. Die Grundidee ist es, aus einer Anzahl von Bits ein Paritätsbit zu generieren. Treten bei der Überprüfung dieses Bits Fehler auf, so
kann der Fehler gefunden und korrigiert werden. Dies passiert dann im laufenden Betrieb, so kann es weder zu Abstürzen noch zu Datenverlust kommen.

Wie sehe ich, ob ich ECC RAM verbaut habe?
Unter Linux kann man folgenden Befehl verwenden:

{{< codeWide >}}

# dmidecode 3.3

$ dmidecode --type 16
Getting SMBIOS data from sysfs.
SMBIOS 3.0.0 present.

Handle 0x0017, DMI type 16, 23 bytes
Physical Memory Array
Location: System Board Or Motherboard
Use: System Memory
Error Correction Type: Single-bit ECC
Maximum Capacity: 128 GB
Error Information Handle: Not Provided
Number Of Devices: 4
{{< /codeWide >}}

Braucht man ECC RAM?

Aus meiner Erfahrung macht das Verbauen von ECC RAM nur Sinn, wenn man Server aufbaut. Mein Gefühl würde mir auch sagen, dass es für den privaten Gebrauch ein wenig übertrieben ist. 🤓

## Ethernet Ports

Das Board verfügt über 4 Gigabit-Anschlüsse, welche es erlauben, auch mal einige Netzwerkkonfigurationen auszuprobieren.
Sprich das Testen von VLANs, Link Aggregation oder ein Port an eine bestimmte VM/Container weiterzuleiten. Sowie das Aufsetzen einer Firewall.

## IPMI

Was ist ein IPMI?

Der Begriff steht für Intelligent Platform Management Interface. Es ermöglicht eine Fernwartung des Rechners, die außerhalb des Betriebssystems stattfindet.
Eine Art BIOS, bloß dass man den Rechner noch durch das Netzwerk steuern kann. Das geht auch, wenn der Rechner aus ist.
Dieses Management System hat bei unterschiedlichen Herstellern andere Namen, bei Dell ist es iDRAC, bei HP ist es iLO.

Hier ein Bild von meinem Supermicro IPMI:

![IPMI Weboberfläche von Supermicro](img/ipmi.png)

Wichtig im Unternehmenskontext ist es, dies vom normalen Netzwerk zu separieren.
Weil es immer mal wieder zu Lücken in diesen Fernwartungssystemen kommt, zuletzt in [HPs iLO](https://www.heise.de/news/Rootkit-schluepft-durch-Luecke-in-HPEs-Fernwartung-iLO-6315714.html).

## Lautstärke 🔈

Lautstärke ist ja natürlich häufig Zuhause ein Thema, das Mainboard selbst hat keinen Lüfter verbaut.
Ich habe den Lüfter des Netzteils gegen einen Noctua 40x20mm Lüfter getauscht.
Die Noctua Lüfter haben den Ruf, dass sie besonders leise sind, und ich muss sagen, dass ich doch recht zufrieden bin.

Da die Temperatur der CPU doch recht hoch war, habe ich im Gehäuse einen 120mm Noctua Lüfter verbaut.

Apropos Gehäuse 🧐

## Gehäuse

Als Gehäuse verwende ich ein [INTER-TECH IPC SC-4004](https://www.amazon.de/INTER-TECH-IPC-SC-4004-HDD-EXT/dp/B01GZ1S7YI?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=inter-tech+ipc+sc-4004&qid=1612880770&s=computers&sr=1-1&linkCode=sl1&tag=austriangamer-21&linkId=8b18d316b1dfa6ce39d1c28a95147ec7&language=de_DE&ref_=as_li_ss_tl).
Die generelle Verarbeitungsqualität ist recht schlecht, aber was mir gefällt, ist, dass es die Möglichkeit bietet, vier 3,5 Zoll Festplatten unterzubringen. Diese könnte man auch im Hot Plug Verfahren tauschen.
Ich verwende zurzeit nur zwei davon, womit ich auch schon beim nächsten Thema bin.

## Speicher 💾

Ich habe zwei SSDs in meinem System verbaut, eine mit 120 GB, diese beherbergt das Basisbetriebssystem.
Die zweite hat ein Terabyte, hier werden alle VM/Container gespeichert.

Interessanter Command, um Platten auszulesen:

{{< codeWide >}}
$ lshw -class disk -short
H/W path Device Class Description
========================================================
/0/100/14/0 /dev/sda disk 1TB Samsung SSD 870
/0/100/14/1 /dev/sdb disk 120GB KINGSTON SV300S3
{{< /codeWide >}}

## Keine drehenden Platten 💿

Auf klassische Festplatten hab ich verzichtet in der Hoffnung, dass das System dann weniger Energie verbraucht, womit wir auch schon beim nächsten Thema wären.

## Strom ⚡

Leider ein großes Thema in Deutschland, auch Hetzner hat seine Preise erhöht, da der Strompreis gestiegen ist. [Golem Artikel](https://www.golem.de/news/hosting-hetzner-erhoeht-preise-teils-um-30-prozent-wegen-stromkosten-2201-162685.html)

Auch Zuhause sind das Kosten, die nicht außer Acht gelassen werden dürfen.

Ich hab mal ein Messgerät an meinen Server gesteckt:

![Messen von Strom](img/strom.jpg)

Ich komme auf einen durchschnittlichen Verbrauch von etwa 30 Watt.
Wenn man das mal in einen [Stromrechner](https://rechneronline.de/steckdose/stromkosten.php) wirft, kommt man auf ca. 80€ pro Jahr an Kosten.

## Interessante Hardware

Hier ein paar Rechner, die mir gerade für Anfänger aufgefallen sind:

- [Minisforum PCs](https://store.minisforum.de/)
- [Intel NUC](https://www.intel.de/content/www/de/de/products/details/nuc.html)
- [Mini PC von Amazon](https://www.amazon.de/dp/B089SHG28D/ref=cm_sw_r_oth_api_glt_i_SHYRM4DDHAQPEYV6RF8V?psc=1)
