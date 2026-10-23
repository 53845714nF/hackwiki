---
title: "Talos Frankenstein für SOPINE Board"
date: 2026-10-23T09:57:04+02:00
draft: false
hideLastModified: true
summaryImage: "img/talos_pine.jpg"
keepImageRatio: true
summary: "Wie mich LLM dazu brachte ein Frankenstein OS zu erstellen"
showInMenu: false
tags: ["Hardware", "Kubernetes"]
---

Ich wollte Talos auf meinem [SOPINE Board](https://pine64.org/devices/sopine/) ausprobieren.

In der [Talos Factory](https://factory.talos.dev/) gibt es ein Image für Pine64. Allerdings ist nicht ganz klar, für welches Board genau dieses Image gedacht ist.

Also habe ich zunächst noch einmal Armbian auf meinem Board getestet, um sicherzustellen, dass das Board selbst und die UART-Schnittstelle funktionieren.
Anschließend habe ich versucht, Talos zu starten doch auf der seriellen Konsole war nicht viel zu sehen.
Ich habe die Logs von Armbian und meine fehlgeschlagenen Bootversuche Gemini, dem großen Sprachmodell von Google, vorgelegt.
Gemini vermutete, dass das Problem beim Bootloader liegen könnte. Die Idee: Man könnte einfach den Bootloader aus Armbian übernehmen.

Der Vorschlag war, den Bootloader mithilfe eines Disk Dumps aus dem Armbian-Image zu extrahieren und anschließend mit einem weiteren Disk Dump in das Talos-Image zu transplantieren.
Das Ergebnis wäre für mich ein Frankenstein System.
Hätte mir ein Kollege im Büro diesen Vorschlag gemacht, hätte ich wahrscheinlich gesagt: „Du spinnst!“
Aber da der Vorschlag von einer KI kam, habe ich es tatsächlich ausprobiert.

Drei Anläufe hat es gebraucht, um die richtige Größe für den Bootloader zu finden.
Danach hat es tatsächlich funktioniert.
Für mich ist das wieder so ein „Move 37“-Moment: eine Anspielung auf den legendären Zug von AlphaGo, den im Go-Spiel zuvor kaum jemand für möglich gehalten hätte.
Natürlich stellt sich die Frage, ob ich die KI durch die Armbian-Logs und meine bisherigen Fehlversuche unbewusst in diese Richtung gelenkt habe.
Trotzdem finde ich es bemerkenswert, dass sie auf einen derart ungewöhnlichen Lösungsansatz gekommen ist.

## Der finale Weg

1. Talos mit Balena Etcher auf eine SD-Karte schreiben.
2. Die SD-Karte aushängen:`sudo umount /dev/sdb* 2>/dev/null`
3. Den Bootloader aus dem Armbian-Image extrahieren:`dd if=armbian.img of=u-boot-sopine-exact.bin bs=1024 skip=8 count=1016`
4. Den Bootloader in das Talos-Image auf der SD-Karte transplantieren:`sudo dd if=u-boot-sopine-exact.bin of=/dev/sdb bs=1024 seek=8 conv=notrunc`
5. Sicherstellen, dass alle Schreibvorgänge abgeschlossen sind:`sync`
6. Die SD-Karte in das SOPINE Board einsetzen und Talos booten.

{{< notificationBlue >}}
Wichtig: `/dev/sdb` muss tatsächlich die SD-Karte sein. Vor dem Ausführen der `dd`-Befehle unbedingt das richtige Laufwerk überprüfen. Der Vorgang überschreibt Daten auf dem Zieldatenträger.
{{< /notificationBlue >}}