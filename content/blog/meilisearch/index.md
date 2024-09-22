---
title: "Meilisearch 🔎"
date: 2024-03-02T22:37:35+01:00
draft: false
hideLastModified: true
summaryImage: "img/meilisearch.png"
keepImageRatio: true
summary: "Ein kurzer Einblick in Meilisearch, und das Syncen von Postgres Daten."
showInMenu: false
tags: ["Search", "Saltstack"]
---

Vor ein paar Wochen habe ich [Meilisearch](https://www.meilisearch.com/) entdeckt und bin begeistert. Es ist eine schnelle, Open-Source-Suchmaschine. Ich habe schon öfter darüber nachgedacht, ob ich Elasticsearch in meinen Projekten verwenden sollte, aber es schien mir immer zu kompliziert und zu aufgebläht. Meilisearch ist einfach zu installieren und zu verwenden. Da es in Rust geschrieben ist und eine REST-API bietet, ist es einfach, es in jede Anwendung zu integrieren. (Hust, kein Java wie bei Elasticsearch.)

Besonders wenn man bereits eine fertige Datenbank hat und nur eine schnelle Suche benötigt, ist Meilisearch eine gute Wahl.

## Installation ✨
Die Installation von Meilisearch ist einfach. Unter Debian/Ubuntu fügt man einfach das Repository hinzu und installiert es.


{{< codeWide >}}
echo "deb [trusted=yes] https://apt.fury.io/meilisearch/ /" | sudo tee /etc/apt/sources.list.d/fury.list
sudo apt update && sudo apt install meilisearch
{{< /codeWide >}}

Alternativ kann man die Installation auch mit Saltstack automatisieren:

{{< codeWide >}}
meilisearch_repo:
  pkgrepo.managed:
    - name: deb [trusted=yes] https://apt.fury.io/meilisearch/ /
    - file: /etc/apt/sources.list.d/meilisearch.list

meilisearch_pkg:
  pkg.installed:
    - name: meilisearch
    - require:
      - pkgrepo: meilisearch_repo
{{< /codeWide >}}


## Starten von Meilisearch 🚀
Danach kann Meilisearch einfach gestartet werden:

{{< codeWide >}}
meilisearch --http-addr <your-ip>:7700
{{< /codeWide >}}

Achtung: Meilisearch ist in diesem Modus standardmäßig ungesichert. Es ist also ratsam, es in einer sicheren Umgebung zu verwenden oder es zu schützen. (Vielleicht komme ich darauf noch einmal zu sprechen, das wäre für diesen Blog ja angebracht.)

## Synchronisieren von Postgres-Daten 🗣️
Ich habe ein Projekt, das auf Postgres basiert, und ich wollte Meilisearch darin verwenden. Glücklicherweise gibt es ein Tool, das das Synchronisieren von Postgres-Daten mit Meilisearch einfach macht. Es heißt [meilisync](https://github.com/long2ice/meilisync).

Bei der Installation von Meilisync gibt es einiges zu beachten, und das möchte ich hier mal aufzeigen.

### Vorbedingungen von Postgres  🐘
Es ist wichtig, dass die Datenbank so konfiguriert ist, dass sie die WAL-Protokollierung unterstützt. Das bedeutet, dass die Datenbank so konfiguriert sein muss, dass sie die Änderungen protokolliert, die an den Daten vorgenommen werden. Das ist notwendig, damit Meilisync die Änderungen an den Datenbanken verfolgen kann.

Dafür muss die `postgresql.conf` angepasst werden:

{{< codeWide >}}
vim /etc/postgresql/15/main/postgresql.conf
{{< /codeWide >}}


Folgendes muss hinzugefügt werden:
  - wal_level = logical
  - max_replication_slots = 10
  - max_wal_senders = 10

### Installieren von wal2json 📦
Außerdem muss das wal2json-Plugin installiert werden. Das ist ein Plugin, das die Änderungen an den Datenbanken in JSON-Format protokolliert. Das ist notwendig, damit Meilisync die Änderungen an den Datenbanken verfolgen kann.

Ich musste ein wenig suchen, um das Paket zu finden, aber unter Debian 12 ist es `postgresql-15-wal2json`. Das kann einfach mit apt installiert werden: `apt install postgresql-15-wal2json`

Dann muss Postgres neu gestartet werden: `systemctl restart postgresql`

### Installieren von Meilisync 

Ich möchte Meilisync in einer virtuellen Umgebung installieren, um die Abhängigkeiten zu verwalten. Dafür muss ich sicherstellen, dass Python 3.11 und venv installiert sind.

Python 3.11 kann unter Debian 12 mit `apt install python3.11-venv` installiert werden.

Nun kann ich meilisync installieren dafür gehe ich ins `opt` Verzeichnis und erstelle ein Verzeichnis für meilisync. Dann erstelle ich eine virtuelle Umgebung und installiere meilisync.

{{< codeWide >}}
cd opt 
mkdir meilisync
python3 -m venv venv
source venv/bin/activate
pip3 install meilisync
{{< /codeWide >}}


Bei den ersten Durchläufen von Meilisync musste ich noch ein paar Abhängigkeiten nachinstallieren:

{{< codeWide >}}
pip3 install motor
pip3 install asyncmy
pip install psycopg2-binary
pip3 install redis
{{< /codeWide >}}

Das Wichtigste ist nun die Konfiguration von Meilisync. Dafür erstelle ich eine `config.yaml` Datei im `opt/meilisync` Verzeichnis:

{{< codeWide >}}
progress:
  type: file
source:
  type: postgres
  host: 127.0.0.1
  port: 5432
  user: <your-postgres-user>
  password: <your-postgres-password>
  database: <your-database-name>
meilisearch:
  api_url: http://<meilisearch-url>:7700
  api_key:
  insert_size: 2000
  insert_interval: 10
sync:
  - table: users
    pk: id
    full: true
    fields:
      id:
      name:
      email:
{{< /codeWide >}}

### Syncen starten 🔄
Nun kann ich meilisync starten: `meilisync start`
Das Tool estellt automatisch die nötigen Indizes auf Meilisearch und beginnt mit der Synchronisierung der Daten.


Die Indizes sind die Daten, die von Meilisearch durchsucht werden. In diesem Fall handelt es sich um die Tabelle `users` und die Felder `id`, `name` und `email`.

## Test der Suche 🔍

Unter der URL `http://<meilisearch-url>:7700` kann ich nun die Suche testen und prüfen, ob sie so funktioniert, wie ich es mir vorstelle.



