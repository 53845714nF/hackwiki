---
title: "Schutzziel 🔒"
date: 2022-02-12T19:18:13+01:00
draft: false
hideLastModified: true
summaryImage: "img/schutzziele.jpg"
keepImageRatio: true
summary: "Eine kleine Zusammenfassung der IT-Schutzziele."
showInMenu: false
tags: ["Hacking", "Sicherheit"]
---

Ein Klassiker der IT-Sicherheit sind die Schutzziele, manchmal auch Sicherheitsziele genannt.

Vor kurzem habe ich mal wieder in einem Buch (Einstieg in Kali Linux Penetration Testing und Ethical Hacking mit Linux) etwas über Schutzziele gelesen.

{{< book title="Einstieg in Kali Linux Penetration Testing und Ethical Hacking mit Linux" authors="Jürgen Ebner" image="img/buch.jpg" size="300x" >}}
Das Buch bietet eine Überblick in das Betriebssystem Kali Linux darüber hinaus wird über verfahren der IT-Security aufgeklärt.
{{< /book >}}

Im Buch wird von der CIA-Triade gesprochen also:
  - Confidentiality (Vertrautlichkeit)
  - Integrity (Integrität)
  - Availability (Verfügbarkeit)

Ich kenne das mit vier bzw. sieben Zielen aber das CIA-Triade klingt natürlich viel cooler. 😎

## Authentizität
Hier geht es darum, dass ich wissen will, mit wem ich kommuniziere. Also die Echtheit meines gegenüber.
Ein gutes Beispiel hierfür sind digitale Signaturen, wie sie bei https verwendet werden.
Hier kann ich sehen, von wem diese Webseite ist.

## Integrität
Hier geht es um die Unveränderbarkeit von Daten sicher zu stellen.
Einfachster Weg dies zu tun, ist eine Einwegfunktion (Hashfunktion) über die Datei laufen zu lassen. Diese generiert einen Code (Hash).
Dies muss nach dem fertigen erstellen einer Datei passieren und nochmal nach einen up/download. Da es beim versenden immer zu Fehlern kommen kann, bzw. von einem Angreifer manipulierte werden kann.

## Vertraulichkeit
Hier ist sicherzustellen, dass Geheimnisse auch geheim bleiben. Dies gilt für alle Geheimnisse, ob privat oder Geschäftlich.

## Verfügbarkeit
Ja der Name sagt es ja schon, wenn ich Systeme hab, möchte ich auch das es immer da ist.
Was man auch als einen Ausfall der Verfügbarkeit betrachten muss, ist natürlich auch ein Ausfall eines Automatisierten Backups. Da hier der Backup Prozess nicht sichergestellt ist.
Auch wenn das Backup nicht benötigt wird.

### Größen Abschätzung
Wenn man einen Dienst anbietet, ist es auch wichtig, die Größe, der dahinter liegenden Infrastruktur zu betrachten. Mein Blog hat niemals so viele Leser wie Amazon Kunden hat, daraus ergibt sich folglich auch, 
dass meine Infrastruktur um ein vielfaches kleiner ist als die von Amazon. Gleichzeitig ist Amazons Chinesischer Konkurrent Alibaba nochmal viel größer als Amazon, auch diese müssen sich Gedanken machen, dass es zu keinen Ausfällen ihres Dienstes kommt.

## Zusatz Ziele
Im laufe der Jahre sind immer mehr Schutzziele aufgetreten.

### Datenschutz
Ist ein rechtliches Konstrukt, dass den Schutz vor Missbrauch von Datenverarbeitung sicher stellen soll.

### Anonynität
Ich möchte Dinge erledigen können, ohne das ich immer gleich meine gesamte Identität preis gebe. 

### Verbindlichkeiten
Sind rechtliche Bestimmungen z.B eine geschäftliche Transaktion


Häufig greifen diese Ziele ineinander und sind schwer zu trennen.