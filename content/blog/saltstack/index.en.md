---
title: "Salt 🧂"
date: 2024-09-27T21:22:04+02:00
draft: false
hideLastModified: true
summaryImage: "img/salt.webp"
keepImageRatio: true
summary: "A quick look at Salt, a configuration management tool."
showInMenu: false
tags: ["Saltstack", "IaC", "DevOps"]
---

Salt is a powerful tool for configuration management and automation. It allows you to manage servers by executing commands on various operating systems, including almost all common Linux distributions, the BSD family, and Windows.

Here’s a simple example of how to use Salt:
{{< codeWide >}}
salt <Minion Name> pkg.upgrade
{{< /codeWide >}}

This command upgrades all installed packages on the managed systems, regardless of whether they use `apt`, `yum`, `pacman`, or `zypper`.
In addition to running commands, you can also define custom configurations using YAML syntax to specify the desired state of a system.

To use Salt effectively, it's helpful to understand some key terms.
Salt works on a classic master-minion model.
The master acts as the central authority, holding the configurations that are stored in what are called States.
The minion is the managed system that executes the instructions from the master.

There are two basic interaction models:

- **Pull model**: The minion actively fetches commands from the master.
- **Push model**: The master sends commands to the minions.

## Salt Master

The master sets the direction and manages the instructions for the minions. By default, these configurations are stored under `/srv/salt/`. Alternatively, you can set up a Git integration, but make sure to use GitPython as the `gitfs` provider, not `pygit2`.

**Installation (Example for Debian 12)**

Here’s a quick overview of how to install it on Debian 12 (as root):

1. Download and add the GPG key:
{{< codeWide >}}
curl -fsSL https://packages.broadcom.com/artifactory/api/security/keypair/SaltProjectKey/public | sudo tee /etc/apt/keyrings/salt-archive-keyring.pgp
{{< /codeWide >}}

2. Add the SaltStack repository:
{{< codeWide >}}
curl -fsSL https://github.com/saltstack/salt-install-guide/releases/latest/download/salt.sources | sudo tee /etc/apt/sources.list.d/salt.sources
{{< /codeWide >}}

3. Update the package lists:
{{< codeWide >}}
apt-get update
{{< /codeWide >}}

4. Install the Salt Master:
{{< codeWide >}}
apt-get install salt-master
{{< /codeWide >}}

## Salt Minion

The minion is the managed system where commands are executed. Its main configuration file is located at `/etc/salt/minion`, where the master server is defined.
By default, the master is set to `salt`, but this can be adjusted depending on your network environment.

**Installation (Example for Debian 12)**

1. Download and add the GPG key:
{{< codeWide >}}
curl -fsSL https://packages.broadcom.com/artifactory/api/security/keypair/SaltProjectKey/public | sudo tee /etc/apt/keyrings/salt-archive-keyring.pgp
{{< /codeWide >}}


2. Add the SaltStack repository:
{{< codeWide >}}
curl -fsSL https://github.com/saltstack/salt-install-guide/releases/latest/download/salt.sources | sudo tee /etc/apt/sources.list.d/salt.sources
{{< /codeWide >}}

3. Update the package lists:
{{< codeWide >}}
apt-get update
{{< /codeWide >}}

4. Install the Salt Minion:
{{< codeWide >}}
apt-get install salt-minion
{{< /codeWide >}}

5. Adjust the configuration if needed.

6. Restart the service:
{{< codeWide >}}
systemctl restart salt-minion
{{< /codeWide >}}

## Salt States

Salt States are like blueprints for a system.
They describe the desired state of a machine—what programs should be installed,
what configurations should be applied, etc.
These instructions are written in YAML.
The minion fetches these "blueprints" from the master and executes them.

## Salt Grains

Grains are system properties of the minions,
such as the operating system (`os`) or the virtualization type (`virtual`).
To list all grains for a host, you can use:
{{< codeWide >}}
salt '*' grains.ls
{{< /codeWide >}}

To see the values of the grains:
{{< codeWide >}}
salt '*' grains.items
{{< /codeWide >}}

## Salt Pillar

Pillars are key-value stores primarily used for sensitive information like passwords or API keys. Unlike grains, pillars are not directly executed on the minions; they are only provided by the master.

## Conclusion 🎉

Salt provides a powerful platform for managing diverse systems.
With its push-and-pull architecture, the ability to create simple or complex configurations, and broad operating system support, it is an indispensable tool for automation in modern IT environments.

## Further Resources
- The official [Salt documentation](https://docs.saltproject.io/en/latest/topics/tutorials/).

Feel free to reach out via email, LinkedIn, or GitHub if you have any comments, suggestions, or questions!
