---
title: "Talos Frankenstein for SOPINE board"
date: 2026-10-23T09:57:04+02:00
draft: false
hideLastModified: true
summaryImage: "img/talos_pine.jpg"
keepImageRatio: true
summary: "How LLMs led me to create a Frankenstein OS."
showInMenu: false
tags: ["Hardware", "Kubernetes"]
---


# Talos on the SOPINE Board: Building a Frankenstein System with AI

I wanted to try running Talos on my [SOPINE Board](https://pine64.org/devices/sopine/).

The [Talos Image Factory](https://factory.talos.dev/) provides an image for Pine64, but it is not entirely clear which specific board this image is intended for.

So, I tested my board with Armbian once again to make sure that the board itself and the UART interface were working correctly.

Then I tried booting Talos – but there was nothing to see on the serial console.

I fed the Armbian logs and my failed boot attempts to Gemini, Google's large language model. Gemini suggested that the problem might be related to the bootloader. Its idea was to simply reuse the bootloader from Armbian.

The proposed solution was to extract the bootloader from the Armbian image using a disk dump and then transplant it into the Talos image using another disk dump.

The result would be a genuine Frankenstein system.

If a colleague at the office had suggested this, I probably would have told them they were crazy. But since the suggestion came from an AI, I decided to give it a try.

It took three attempts to find the correct bootloader size. After that, it actually worked.

For me, this is another one of those "Move 37" moments – a reference to AlphaGo's legendary move in the game of Go that few people had anticipated.

Of course, the question remains whether I inadvertently nudged the AI in this direction by providing the Armbian logs and my previous failed attempts. Nevertheless, I find it remarkable that it came up with such an unconventional solution.

## The Final Procedure

1. Flash Talos onto an SD card using Balena Etcher.
2. Unmount the SD card: `sudo umount /dev/sdb* 2>/dev/null`
3. Extract the bootloader from the Armbian image: `dd if=armbian.img of=u-boot-sopine-exact.bin bs=1024 skip=8 count=1016`
4. Transplant the bootloader onto the SD card containing Talos: `sudo dd if=u-boot-sopine-exact.bin of=/dev/sdb bs=1024 seek=8 conv=notrunc`
5. Make sure all write operations have completed: `sync`
6. Insert the SD card into the SOPINE Board and boot Talos.

{{< notificationBlue >}}
Important: Make sure `/dev/sdb` actually refers to your SD card before running these commands. Always verify the target device carefully, as `dd` can overwrite data on the target drive.
{{< /notificationBlue >}}
