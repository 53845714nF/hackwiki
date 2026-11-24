---
title: "Schutzziel 🔒"
date: 2022-02-12T19:18:13+01:00
draft: false
hideLastModified: true
summaryImage: "img/schutzziele.jpg"
keepImageRatio: true
summary: "Eine kleine Zusammenfassung der IT-Schutzziele."
showInMenu: false
tags: ["Hacking"]
---

Ein Klassiker der IT-Sicherheit sind die Schutzziele, manchmal auch Sicherheitsziele genannt.

Vor Kurzem habe ich mal wieder in einem Buch (Einstieg in Kali Linux Penetration Testing und Ethical Hacking mit Linux) etwas über Schutzziele gelesen.

{{< book title="Einstieg in Kali Linux Penetration Testing und Ethical Hacking mit Linux" authors="Jürgen Ebner" image="img/buch.jpg" size="300x" >}}
Das Buch bietet einen Überblick über das Betriebssystem Kali Linux, darüber hinaus wird über Verfahren der IT-Security aufgeklärt.
{{< /book >}}

Im Buch wird von der CIA-Triade gesprochen also:
  - Confidentiality (Vertraulichkeit)
  - Integrity (Integrität)
  - Availability (Verfügbarkeit)

Ich kenne das mit vier bzw. sieben Zielen, aber die CIA-Triade klingt natürlich viel cooler. 😎

## Authentizität
Hier geht es darum, dass ich wissen will, mit wem ich kommuniziere. Also die Echtheit meines Gegenübers.
Ein gutes Beispiel hierfür sind digitale Signaturen, wie sie bei HTTPS verwendet werden.
Hier kann ich sehen, von wem diese Webseite ist.

## Integrität
Hier geht es darum, die Unveränderbarkeit von Daten sicherzustellen.
Der einfachste Weg, dies zu tun, ist, eine Einwegfunktion (Hashfunktion) über die Datei laufen zu lassen. Diese generiert einen Code (Hash).
Dies muss nach dem fertigen Erstellen einer Datei passieren und nochmal nach einem Up-/Download, da es beim Versenden immer zu Fehlern kommen kann bzw. die Datei von einem Angreifer manipuliert werden kann.

## Vertraulichkeit
Hier ist sicherzustellen, dass Geheimnisse auch geheim bleiben. Dies gilt für alle Geheimnisse, ob privat oder geschäftlich.

## Verfügbarkeit
Ja, der Name sagt es ja schon: Wenn ich Systeme hab, möchte ich auch, dass sie immer da sind.
Was man auch als einen Ausfall der Verfügbarkeit betrachten muss, ist natürlich auch ein Ausfall eines automatisierten Backups, da hier der Backup-Prozess nicht sichergestellt ist.
Auch wenn das Backup nicht benötigt wird.

### Größenabschätzung
Wenn man einen Dienst anbietet, ist es auch wichtig, die Größe der dahinterliegenden Infrastruktur zu betrachten. Mein Blog hat niemals so viele Leser wie Amazon Kunden hat, daraus ergibt sich folglich auch, 
dass meine Infrastruktur um ein Vielfaches kleiner ist als die von Amazon. Gleichzeitig ist Amazons chinesischer Konkurrent Alibaba nochmal viel größer als Amazon, auch diese müssen sich Gedanken machen, dass es zu keinen Ausfällen ihres Dienstes kommt.

## Zusatzziele
Im Laufe der Jahre sind immer mehr Schutzziele aufgetreten.

### Datenschutz
Ist ein rechtliches Konstrukt, das den Schutz vor Missbrauch von Datenverarbeitung sicherstellen soll.

### Anonymität
Ich möchte Dinge erledigen können, ohne dass ich immer gleich meine gesamte Identität preisgebe. 

### Verbindlichkeiten
Sind rechtliche Bestimmungen, z.B. eine geschäftliche Transaktion


Häufig greifen diese Ziele ineinander und sind schwer zu trennen.