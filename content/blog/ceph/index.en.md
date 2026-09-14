---
title: "Ceph for Dummies"
date: 2026-05-13T15:51:16+02:00
draft: false
hideLastModified: true
summaryImage: "img/logo.jpg"
keepImageRatio: true
summary: "The post shows my path to the first Ceph cluster."
showInMenu: false
tags: ["ceph", "storage", "homelab", "DevOps"]
---

I've been looking into Ceph a bit; I'm still no expert, but I wanted to share and document what I've learned for myself.

Ceph is an Open-Source Software-Defined Storage (SDS) system that provides a scalable and fault-tolerant solution for storing and managing large amounts of data.

## Installation

### Minimal Setup

This is the absolute minimum to get Ceph running.
For production environments, there are certainly much better guides online.
This is simply what I did.

  - 3 Nodes
  - Debian 13 Trixie ([Packer Template for Debian](https://github.com/53845714nF/packer-proxmox-debian))
  - Ceph Quincy (Standard Version)

It is important that the nodes have a fixed IP address and can reach each other by hostname. The nodes must be time-synchronized. Password-less SSH access between the nodes is also mandatory. Hostnames must be entered in `/etc/hosts`.

### Network Preparation

I installed 3 interfaces on the nodes:

  - `vmbr0` - Management Interface (also used by Proxmox) e.g.: `192.168.178.0/24`
  - `vmbr1` - Ceph Public Interface e.g.: `10.10.0.0/24`
  - `vmbr2` - Ceph Cluster Interface e.g.: `10.10.20.0/24`

The Public network is used for communication between clients and the cluster. The Cluster network is used for communication between nodes in the cluster.

The Cluster network is used for OSD replication, recovery, and rebalancing.

### Setting Up the Network

On the nodes, I configured the network cards as follows in `/etc/network/interfaces`:

{{< codeWide >}}
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
allow-hotplug ens18
iface ens18 inet dhcp
# This is an autoconfigured IPv6 interface
iface ens18 inet6 auto

auto ens19
  iface ens19 inet static
  address 10.10.10.1/24

auto ens20
  iface ens20 inet static
  address 10.10.20.1/24
{{< /codeWide >}}

Restart the network: `sudo systemctl restart networking`
Add hostnames to `/etc/hosts`:

{{< codeWide >}}
10.10.10.1 ceph1
10.10.10.2 ceph2
10.10.10.3 ceph3
{{< /codeWide >}}

Enable password-less SSH login between the nodes:

{{< codeWide >}}
ssh-keygen -t ed25519
ssh-copy-id root@ceph2
ssh-copy-id root@ceph3
{{< /codeWide >}}

### Installing Dependencies

Next, we need to make sure the necessary packages are installed. For this we need Podman under Debian, since the current Ceph version is not available as a Debian package.

{{< codeWide >}}
apt update
apt install -y curl gnupg podman lvm2 chrony
{{< /codeWide >}}

Then install the Cephadm package:

{{< codeWide >}}
apt install -y cephadm
{{< /codeWide >}}

If `lvcreate` is not found, the path needs to be adjusted: `export PATH=$PATH:/usr/sbin:/sbin`

Then we start the deployment of Ceph:

{{< codeWide >}}
cephadm bootstrap --mon-ip 192.168.178.139
{{< /codeWide >}}

If you have comments, suggestions, or questions, feel free to contact me by email, LinkedIn, or GitHub.