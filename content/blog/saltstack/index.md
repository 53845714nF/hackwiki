---
title: "Salt 🧂"
date: 2024-09-27T21:22:04+02:00
draft: false
hideLastModified: true
summaryImage: "img/saltstack.png"
keepImageRatio: true
summary: "Ein kurzer Blick zu Salt ein Konfigurationsmanagement Tool."
showInMenu: false
tags: ["Saltstack", "IaC", "DevOps"]
---

Salt ist ein leistungsstarkes Tool für Konfigurationsmanagement und Automatisierung.
Es ermöglicht die Verwaltung von Servern durch das Ausführen von Befehlen auf verschiedenen Betriebssystemen,
darunter fast alle gängigen Linux-Distributionen, die BSD-Familie und Windows.

Ein einfaches Beispiel für die Nutzung von Salt wäre:
{{< codeWide >}}
salt <Minion Name> pkg.upgrade
{{< /codeWide >}}

Dieser Befehl aktualisiert alle installierten Pakete auf den verwalteten Systemen, unabhängig davon, ob sie mit `apt`, `yum`, `pacman` oder `zypper` arbeiten.
Neben Befehlen können auch benutzerdefinierte Konfigurationen in einer YAML-Syntax beschrieben werden, um den Zustand eines Systems festzulegen.

Um Salt effektiv nutzen zu können, ist es hilfreich, einige der wichtigsten Begriffe zu kennen.
Salt arbeitet im klassischen Master-Minion-Modell.
Der Master fungiert als zentrale Instanz, die weiß, wo es langgeht.
Er hält die Konfigurationen, die in sogenannten States abgelegt sind.
Der Minion ist das verwaltete System, das die Anweisungen des Masters ausführt.

Es gibt zwei grundlegende Interaktionsmodelle:
- **Pull-Prinzip**: Der Minion holt sich Befehle aktiv vom Master.
- **Push-Prinzip**: Der Master schickt Befehle aktiv an die Minions.

## Salt Master

Der Master gibt die Richtung vor und verwaltet die Anweisungen der Minions.Standardmäßig liegen diese Konfigurationen unter `/srv/salt/`.
Alternativ lässt sich auch eine Git-Anbindung einrichten, wobei darauf zu achten ist, GitPython als `gitfs` Provider zu verwenden, nicht `pygit2`.

**Installation (Beispiel Debian 10):**
Unter [Salt Repo](http://repo.saltstack.com) lässt einsehen, wie man Salt Master auf all den verschiedenen Systemen installiert.

Hier nur kurz gezeigt, wie das unter Debian 10 geht (als root ausführen): 

1. GPG-Schlüssel herunterladen und hinzufügen:
{{< codeWide >}}
wget -O - https://repo.saltstack.com/py3/debian/10/amd64/latest/SALTSTACK-GPG-KEY.pub | apt-key add -
{{< /codeWide >}}

2. Saltstack-Repository hinzufügen:
{{< codeWide >}}
deb http://repo.saltstack.com/py3/debian/10/amd64/latest buster main
{{< /codeWide >}}

3. Paketlisten aktualisieren:
{{< codeWide >}}
apt-get update
{{< /codeWide >}}

4. Salt Master installieren:
{{< codeWide >}}
apt-get install salt-master
{{< /codeWide >}}

## Salt Minion

Der Minion ist das verwaltete System, auf dem die Befehle ausgeführt werden. Die zentrale Konfigurationsdatei befindet sich unter `/etc/salt/minion`, wo der Master-Server festgelegt wird. Standardmäßig lautet dieser einfach `salt`, kann aber je nach Netzwerkumgebung angepasst werden.

**Installation (Beispiel Debian 10):**

Ähnlich wie beim Master lässt sich die Instalation unter [Salt Repo](http://repo.saltstack.com) einsehen.
Dieser lässt sich natürlich auf verschiedenen Systemen installieren. 

1. GPG-Schlüssel herunterladen und hinzufügen:
{{< codeWide >}}
wget -O - https://repo.saltstack.com/py3/debian/10/amd64/latest/SALTSTACK-GPG-KEY.pub | apt-key add -
{{< /codeWide >}}

2. Saltstack-Repository hinzufügen:
{{< codeWide >}}
deb http://repo.saltstack.com/py3/debian/10/amd64/latest buster main
{{< /codeWide >}}

3. Paketlisten aktualisieren:
{{< codeWide >}}
apt-get update
{{< /codeWide >}}

4. Salt Minion installieren:
{{< codeWide >}}
apt-get install salt-minion
{{< /codeWide >}}

5. Konfiguration anpassen, falls nötig.

6. Den Dienst neustarten:
{{< codeWide >}}
systemctl restart salt-minion
{{< /codeWide >}}

## Salt States

Salt States sind wie Bauanleitungen für ein System.
Sie beschreiben den gewünschten Zustand eines Rechners – welche Programme installiert sein sollen, welche Konfigurationen gelten, etc.
Diese Anweisungen werden in YAML verfasst.
Der Minion lädt diese "Bauanleitung" vom Master herunter und führt sie aus.

## Salt Grains

Grains sind systemeigene Eigenschaften der Minions, wie das Betriebssystem (`os`) oder der Virtualisierungstyp (`virtual`).
Um eine Liste aller Grains eines Hosts abzurufen, kann folgender Befehl verwendet werden:
{{< codeWide >}}
salt '*' grains.ls
{{< /codeWide >}}

Um die Werte der Grains einzusehen:
{{< codeWide >}}
salt '*' grains.items
{{< /codeWide >}}

## Salt Pillar

Pillars dienen als ein Key-Value-Speicher, der vor allem für sensible Informationen wie Passwörter oder API-Schlüssel verwendet wird.
Im Gegensatz zu Grains werden Pillars nicht direkt auf den Minions ausgeführt, sondern nur vom Master bereitgestellt.

## Fazit 🎉

Salt bietet eine mächtige Plattform für das Management unterschiedlichster Systeme. Mit seiner Push- und Pull-Architektur,
der Möglichkeit, einfache oder komplexe Konfigurationen zu erstellen,
und der breiten Betriebssystemunterstützung ist es ein unverzichtbares Tool für die Automatisierung in modernen IT-Umgebungen.

## Weitere gute Quellen

- Ein [Blog](https://thorstenkramm.gitbook.io/saltstack/) von Thorsten Kramm der den Einstieg in Salt erleichtert.
- Die offizielle [Salt Dokumentation](https://docs.saltproject.io/en/latest/topics/tutorials/).
- Ein [Vortrag](https://www.youtube.com/watch?v=8ytAHUGponk) zu Salt Stack von Thorsten Kramm. (Leider schon sehr alt.)


Falls Sie Anmerkungen, Vorschläge oder Fragen haben, können Sie sich gerne per E-Mail, LinkedIn oder GitHub bei mir melden.