---
title: "Gitea 🍵"
date: 2022-08-08T20:03:02+02:00
draft: false
hideLastModified: true
summaryImage: "img/gitea.webp"
keepImageRatio: true
summary: "Setting up your own Git service. And the migration from Alpine to Debian."
showInMenu: false
tags: ["Programming", "Git", "Home Lab", "DevOps"]
---

## Introduction to Git

Git is currently the dominant version control tool in the market.
The main idea behind it is to manage the state of various versions of source code.
A full Git tutorial would be too lengthy for a blog post, so instead, I'll point you to a good resource.
The comprehensive manual available at: [Pro Git Book](https://git-scm.com/book/en/v2).

Another key feature of Git is that it's a distributed system.
It allows every user to create their own repository and sync it with others.
However, it's common practice to have a central server where the main repository is hosted.
These servers often come with a simple web UI to facilitate interactions with the repository.
The largest platform for this type of software is [GitHub](https://github.com/), but there are others like [GitLab](https://about.gitlab.com) and [Gitea](https://gitea.io/en-us/).

## My Experience with Gitea 🕰️

The first service I installed on my home server was Gitea.

It's lightweight, consumes minimal resources, and its web interface is quite user-friendly, making it the perfect choice for me.
My initial Gitea installation ran inside an LXC container with Alpine Linux.
Using Alpine’s package manager, installing gitea was straightforward.

However, I aim to create a homogeneous server environment, meaning all servers should run Debian 11 on LXC.
As a result, the Alpine container had to go, and I needed to migrate my Git server.

Unfortunately, Gitea doesn’t provide a pre-packaged solution for Debian, so the installation is a bit more complex compared to Alpine.
Gitea is written in [Golang](https://go.dev/), and they provide a static-linked binary that you can download, but the rest requires some manual setup by the admin.

## Installing Gitea on Debian

Here’s a rough outline of how to install Gitea on Debian:

**Update and Install Dependencies:**

{{< codeWide >}}
apt -y update
apt -y install git vim bash-completion
{{< /codeWide >}}

**Add a User for Gitea:**

{{< codeWide >}}
adduser \
   --system \
   --shell /bin/bash \
   --gecos 'Git Version Control' \
   --group \
   --disabled-password \
   --home /home/gitea \
   gitea
{{< /codeWide >}}

**Download the Binary and Move it to `/usr/local/bin:`**

{{< codeWide >}}
curl -s  https://api.github.com/repos/go-gitea/gitea/releases/latest | grep browser_download_url  |  cut -d '"' -f 4  | grep '\linux-amd64$' | wget -i -
{{< /codeWide >}}

**Change Permissions and Rename the Binary:**

{{< codeWide >}}
chmod +x gitea-*-linux-amd64
mv gitea-*-linux-amd64 /usr/local/bin/gitea
{{< /codeWide >}}

**Create Directories for Files:**

{{< codeWide >}}
mkdir -p /etc/gitea /var/lib/gitea/{custom,data,indexers,public,log}
chown gitea:gitea /var/lib/gitea/{data,indexers,log}
chmod 750 /var/lib/gitea/{data,indexers,log}
chown root:gitea /etc/gitea
chmod 770 /etc/gitea
{{< /codeWide >}}

**Create a Systemd Unit File:**

{{< codeWide >}}
vim /etc/systemd/system/gitea.service
{{< /codeWide >}}

Content of the file:

{{< codeWide >}}

[Unit]
Description=Gitea (Git with a cup of tea)
After=syslog.target
After=network.target

[Service]
LimitMEMLOCK=infinity
LimitNOFILE=65535
RestartSec=2s
Type=simple
User=gitea
Group=gitea
WorkingDirectory=/var/lib/gitea/
ExecStart=/usr/local/bin/gitea web -c /etc/gitea/app.ini
Restart=always
Environment=USER=gitea HOME=/home/gitea GITEA_WORK_DIR=/var/lib/gitea

[Install]
WantedBy=multi-user.target
{{< /codeWide >}}

**Start Gitea Service with Systemd:**

{{< codeWide >}}
systemctl daemon-reload
systemctl enable --now gitea
systemctl status gitea
{{< /codeWide >}}

**Additional Permissions for Gitea**

This is important, or the service won't start properly.

{{< codeWide >}}
setcap 'cap_net_bind_service=+ep' /usr/local/bin/gitea
{{< /codeWide >}}

## Migration

The migration involved two steps: backing up the data and the database.
The data primarily consisted of the repositories, which needed to be copied to the new server.
You may also need to adjust Linux permissions if the user running Gitea has changed.

In my case, I also had to update Git hooks, as the directory where Gitea was installed had changed. To do this, you can use the following command:

{{< codeWide >}}
grep -r "/usr/bin/gitea" . | cut -d : -f1 | xargs sed -i 's#/usr/bin/gitea#/usr/local/bin/gitea#g'
{{< /codeWide >}}

The database was SQLite, and it was easy to dump and restore.

In conclusion, the migration was more difficult than I initially anticipated,
but it wasn’t rocket science.
I'm happy to say that I now have Gitea running on Debian 11! 😄