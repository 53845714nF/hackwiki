---
title: "Distrobuilder for Lxc 📦"
date: 2024-03-10T19:16:43+01:00
draft: false
hideLastModified: true
summaryImage: "img/distrobuilder.webp"
keepImageRatio: true
summary: "Creating an OpenWrt image for LXC with Distrobuilder and integrating it into Proxmox."
showInMenu: false
tags: ["Proxmox", "Containers", "Virtualization", "DevOps"]
---

Have you ever wondered how to create your own images for LXC and then integrate them into Proxmox?
Although I've been working with LXC for some time, I never really got around to creating my own image. Curious, I went on a quest and stumbled upon [Distrobuilder](https://github.com/lxc/distrobuilder) – a tool for creating images for LXC and LXD, written in Go.
(The tool can also create VM images, but I haven't tried that yet.)

## Installation ✨
The installation documentation is quite comprehensive, so I won't delve into it here.
Just note that at least Golang 1.21 is required.
I initially ran into problems because my Golang version was still at 1.20.

## Templates 🧩
Next, I grabbed the templates from the [template](https://github.com/lxc/lxc-ci) directory.
I was particularly interested in the OpenWrt template.

## Creating an image 🔨

In the template directory, I then executed the following command:
{{< codeWide >}}
distrobuilder build-lxc images/openwrt.yaml -o image.variant=default -o image.release=23.05 
{{< /codeWide >}}

This command creates a `rootfs.tar.xz` and `metadata.tar.xz`. The `rootfs.tar.xz` can then be copied to the Proxmox server using `scp` or `rsync`.

It took me a while to understand that the `rootfs.tar.xz` is sufficient to create a container.
I thought I still needed to create a separate image.
But that's not the case.
Proxmox offers the ability to create a container directly from a `rootfs.tar.xz`.

With the following command, I created the container:

{{< codeWide >}}
pct create 107 ./rootfs.tar.xz --unprivileged 1 --ostype unmanaged --hostname openwrt -net0 name=eth0 -net1 name=eth1 --storage local-lvm
{{< /codeWide >}}

After some settings adjustments to the network interfaces, the container was ready to go and could be started.

## Create VM 🔨

Before starting with the creation of the VM, the packages `btrfs-progs` and `qemu-utils` need to be installed on Debian:

{{< codeWide >}} apt install btrfs-progs qemu-utils {{< /codeWide >}}

In the template directory, I then executed the following command:

### Create Ubuntu VM

{{< codeWide >}} sudo /home/rar/go/bin/distrobuilder build-incus --vm ubuntu.yaml -o image.release=jammy {{< /codeWide >}}

This command generates the files: `disk.qcow2` and `incus.tar.xz`.
The file `disk.qcow2` can then be copied to the Proxmox server using `scp` or `rsync`.

{{< codeWide >}}
qm create 390 qm importdisk 390 ubuntu.qcow2 local-lvm -format qcow2
{{< /codeWide >}}

It is important to add the hard drive to the system (`Hardware` -> `Edit` -> `Add`) and to use UEFI:

![Hardware](img/Hardware.png)

Furthermore, the boot order must be set in `Options`:

![Options](img/Options.png)

After that, the VM starts as expected:

![Console](img/Console.png)

## Create OpenWrt VM

An OpenWrt VM can be created with the following command: 
{{< codeWide >}}
distrobuilder build-incus --vm images/openwrt.yaml -o image.release=23.05 
{{< /codeWide >}}

Unfortunately, there is an [issue](https://github.com/lxc/distrobuilder/issues/880) with the EFI partition in distrobuilder.

## Conclusion 🏁

Overall, I find Distrobuilder to be an excellent tool for creating images for LXC.
It's easy to use and allowed me to quickly and effortlessly create my own OpenWrt image and integrate it into Proxmox.