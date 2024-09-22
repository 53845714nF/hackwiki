---
title: "Meilisearch 🔎"
date: 2024-03-02T22:37:35+01:00
draft: false
hideLastModified: true
summaryImage: "img/meilisearch.png"
keepImageRatio: true
summary: "A brief insight into Meilisearch and the synchronisation of Postgres data."
showInMenu: false
tags: ["Search", "Saltstack"]
---

I discovered Meilisearch a few weeks ago and I'm delighted with it. It's a fast, open-source search engine. I've often considered whether I should use Elasticsearch in my projects, but it always seemed too complicated and bloated for my needs. Meilisearch is easy to install and use. It's written in Rust and provides a REST API, making it easy to integrate into any application. (No Java required, unlike Elasticsearch!)

Especially when you already have your database ready and just need a quick search, Meilisearch is a great choice.

## Installation ✨

The installation of Meilisearch is simple. On Debian/Ubuntu, simply add the repository and install it.

{{< codeWide >}}
echo "deb [trusted=yes] https://apt.fury.io/meilisearch/ /" | sudo tee /etc/apt/sources.list.d/fury.list
sudo apt update && sudo apt install meilisearch
{{< /codeWide >}}

Or, like I did, automate its installation with Saltstack:

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

## Starting Meilisearch 🚀

Then, Meilisearch can be easily started:

{{< codeWide >}}
meilisearch --http-addr <your-ip>:7700
{{< /codeWide >}}

Note: Meilisearch in this mode is unsecured by default. So, it's advisable to use it in a secure environment or protect it. (I might touch on this later in the blog, as it would be appropriate.)

## Synchronising Postgres Data 🗣️
I have a project based on Postgres and I wanted to use Meilisearch in it. Fortunately, there's a tool that makes syncing Postgres data with Meilisearch easy. It's called [meilisync](https://github.com/long2ice/meilisync).

During the installation of meilisync, there are a few things to consider, and I wanted to highlight them here.

### Postgres Prerequisites 🐘
t's important that the database is configured to support Write-Ahead Logging (WAL). This means the database must be configured to log the changes made to the data. This is necessary for meilisync to track changes to the databases.

To do this, the `postgresql.conf` file must be modified:

{{< codeWide >}}
vim /etc/postgresql/15/main/postgresql.conf
{{< /codeWide >}}

The following must be added:
  - wal_level = logical
  - max_replication_slots = 10
  - max_wal_senders = 10

### Installing wal2json 📦
The wal2json plugin must also be installed. This is a plugin that logs changes to the databases in JSON format. This is necessary for meilisync to track changes to the databases.

I had to search a bit to find the package, but on Debian 12, it's `postgresql-15-wal2json`. It can be installed easily with apt: `apt install postgresql-15-wal2json`

Then, Postgres must be restarted: `systemctl restart postgresql`

### Installing meilisync

I want to install meilisync in a virtual environment to manage dependencies. To do this, I need to ensure Python 3.11 and venv are installed.

Python 3.11 can be installed on Debian 12 with: `apt install python3.11-venv`

Now I can install meilisync, for which I go to the `opt` directory, create a directory for meilisync, create a virtual environment, and install meilisync.

{{< codeWide >}}
cd opt
mkdir meilisync
python3 -m venv venv
source venv/bin/activate
pip3 install meilisync
{{< /codeWide >}}

For the initial runs of meilisync, I had to install a few more dependencies:

{{< codeWide >}}
pip3 install motor
pip3 install asyncmy
pip install psycopg2-binary
pip3 install redis
{{< /codeWide >}}

Now the most important thing is to configure meilisync. For this, I create a `config.yaml` file in the `opt/meilisync` directory.

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

### Starting the Sync 🔄
Now I can start meilisync: `meilisync start`
The tool automatically creates the necessary indexes on Meilisearch and starts syncing the data.

The indexes are the data that Meilisearch will search. In this case, it's the `users` table and the fields `id`, `name`, and `email`.

## Testing the Search 🔍

At the URL http://<meilisearch-url>:7700, I can now test the search and see if it works as I expect.
