---
title: "MicroPython Firmware Update"
date: 2025-05-10T13:35:53+02:00
draft: false
hideLastModified: true
summaryImage: "img/board.jpg"
keepImageRatio: true
summary: "A guide to compiling MicroPython firmware and flashing it onto a China clone of the PyBoard."
showInMenu: false
tags: ["Hardware", "Microcontroller"]
---

Hello, in this post it's about flashing MicroPython firmware onto a China clone of the PyBoard. It is a clone with the STM32F405RGT6 chip.

Today, probably very few people still use this board. ESP32 and RP2040 are far more well-known competitors here.
But for people like me who own the board and wonder how to flash new firmware onto the chip, I have created a short how-to.

The hardware:

![pic1](./img/board.jpg)

To flash the firmware, we need:

- The PyBoard Clone
- A MicroUSB cable
- Jumper wires to short the boot pin

To be able to flash firmware at all, we need the program `dfu-util`. This is already available in the package repositories of many Linux distributions. It can be installed simply with `sudo apt install dfu-util`.

Now we need to bring the board into the so-called bootloader mode. For this, the two boot pins must be shorted. Jumper wires or a piece of wire are suitable for this. BOOT0 must be connected to 3.3V.

![pic2](./img/board_flash.jpg)

Now connect the board to our PC via USB. `dfu-util` should be able to detect the board.

Now we can save the firmware on the board. (I would definitely do this, I have already needed this backup).

{{< codeWide >}}
sudo dfu-util --alt 0 --upload pyboard-original.dat -s:524288
{{< /codeWide >}}

In case you need to restore the backup:

{{< codeWide >}}
$ sudo dfu-util --alt 0 -D pyboard-original.dat -d 0483:df11 -s 0x8000000
{{< /codeWide >}}

Since the firmware is not available for our board on the MicroPython website,
we have to compile it ourselves.
For this we need `git`, `make` and `arm-none-eabi-gcc`.

{{< codeWide >}}
sudo apt install git build-essential gcc-arm-none-eabi \
    libnewlib-arm-none-eabi \
    make python3 python3-pip \
    cmake ninja-build
{{< /codeWide >}}

Now the Micropython Git repository needs to be downloaded.

{{< codeWide >}}
git clone https://github.com/micropython/micropython
cd micropython
git submodule update --init --recursive
{{< /codeWide >}}

Now `mpy-cross` needs to be compiled. This is used to translate Python code into machine code.

{{< codeWide >}}
cd mpy-cross
make
cd ..
{{< /codeWide >}}

Now the submodules from Ports/STM32 need to be downloaded. For this we need to change to the ports/stm32 directory.

{{< codeWide >}}
cd ports/stm32
make submodules
{{< /codeWide >}}

Now we still need to compile the firmware. For this we use the command `make BOARD=PYBV3`. PYBV3 is the board type.

{{< codeWide >}}
make BOARD=PYBV3
{{< /codeWide >}}

Afterwards, the firmware is located in the directory `micropython/ports/stm32/build-PYBV3/firmware.dfu`. This can now be flashed again.

{{< codeWide >}}
sudo dfu-util --alt 0 -D firmware.dfu
{{< /codeWide >}}

Our board now has the latest MicroPython version running.