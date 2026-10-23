---
title: "Graphics card for home server"
date: 2026-10-23T10:03:13+02:00
draft: false
hideLastModified: true
summaryImage: "img/graphic_card.jpg"
keepImageRatio: true
summary: "How do you set up a graphics card in Proxmox?"
showInMenu: false
tags: ["Homelab", "Proxmox", "Containers", "Hardware", "Virtualization"]
---

My home server has been running almost continuously for more than five years. Under normal circumstances, a hardware upgrade would be worth considering. Unfortunately, prices have risen significantly due to the high demand from AI data centers, affecting almost all other hardware components as well.

I recently started running a Jellyfin instance on my server. To handle transcoding, I need a graphics card.

Since the motherboard is already quite old and the case is very small, there aren't many cards to choose from. Ideally, I would have gone with the NVIDIA Quadro T600 with 4 GB of VRAM, but even its price has nearly doubled.

In the end, I went with the NVIDIA Quadro P400. It should be sufficient for Full HD transcoding, but unfortunately, 4K transcoding is out of the question.

Installing the card was a little fiddly due to the limited space inside the case. All in all, however, the installation was quick and straightforward.

## Installing the drivers on the host

First, we need to disable the open-source Nouveau driver, as it does not support hardware transcoding via NVENC.

Check whether Nouveau is currently in use:

{{< codeWide >}}
lsmod | grep nouveau
{{< /codeWide >}}

If it is, the driver needs to be blacklisted:

{{< codeWide >}}
echo -e "blacklist nouveau\noptions nouveau modeset=0" > /etc/modprobe.d/blacklist-nouveau.conf
update-initramfs -u
reboot
{{< /codeWide >}}

Next, install the required tools:

{{< codeWide >}}
apt update && apt full-upgrade -y
apt install -y pve-headers-$(uname -r) build-essential dkms
{{< /codeWide >}}

Find the appropriate driver:

You can enter your graphics card details [here](https://www.nvidia.com/en-us/drivers/). In my case, the search returned [this driver](https://www.nvidia.com/en-us/drivers/details/281494/).

{{< codeWide >}}
wget https://de.download.nvidia.com/XFree86/Linux-x86_64/580.196.07/NVIDIA-Linux-x86_64-580.196.07.run
chmod +x NVIDIA-Linux-x86_64-580.196.07.run
./NVIDIA-Linux-x86_64-580.196.07.run
{{< /codeWide >}}

Verify that the installation was successful:

{{< codeWide >}}
nvidia-smi
{{< /codeWide >}}

## Passing the graphics card through to a container

The graphics card needs to be passed through to the LXC container. The exact same driver must be installed inside the container, but without the kernel module, since the container shares its kernel with the Proxmox host.

{{< codeWide >}}
vim /etc/pve/lxc/380.conf
{{< /codeWide >}}

Add the following entries:

{{< codeWide >}}
lxc.cgroup2.devices.allow: c 195:* rwm
lxc.cgroup2.devices.allow: c 226:* rwm
lxc.mount.entry: /dev/nvidia0 dev/nvidia0 none bind,optional,create=file
lxc.mount.entry: /dev/nvidiactl dev/nvidiactl none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-uvm dev/nvidia-uvm none bind,optional,create=file
lxc.mount.entry: /dev/nvidia-modeset dev/nvidia-modeset none bind,optional,create=file
{{< /codeWide >}}

Then install the driver inside the container:

{{< codeWide >}}
wget https://de.download.nvidia.com/XFree86/Linux-x86_64/580.196.07/NVIDIA-Linux-x86_64-580.196.07.run
chmod +x NVIDIA-Linux-x86_64-580.196.07.run
./NVIDIA-Linux-x86_64-580.196.07.run --no-kernel-module
{{< /codeWide >}}

{{< notificationBlue >}}
Note 1: `nvidia-smi` does not show processes running inside the container. However, they are visible when running it on the Proxmox host. This appears to be a permissions issue.
{{< /notificationBlue >}}

{{< notificationBlue >}}
Note 2: Since LXC containers are not full virtual machines but share the kernel (and therefore the hardware drivers) with the Proxmox host, the graphics card can be passed through to multiple LXC containers simultaneously.

However, sharing the same graphics card between multiple virtual machines is not possible with this method. When passing a graphics card through to a full virtual machine, Proxmox uses PCIe passthrough (VFIO). This method detaches the graphics card physically from the host system and assigns it exclusively to the virtual machine.
{{< /notificationBlue >}}