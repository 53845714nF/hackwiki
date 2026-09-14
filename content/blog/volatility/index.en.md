---
title: "Volatility 📂"
date: 2022-02-17T21:05:30+01:00
draft: false
hideLastModified: true
summaryImage: "img/vol.png"
keepImageRatio: true
summary: "Analyzing memory with Volatility"
showInMenu: false
tags: ["Forensics"]
---

{{< notificationBlue >}}
This post shows how to use Volatility 2. Volatility 3 is currently available.
{{< /notificationBlue >}}

When you need to investigate the memory of a computer after a breach, you can turn to the Python framework
Volatility for powerful support. This post is still about Volatility 2, meanwhile there is a version 3.
A lot has changed here, such as the fact that creating profiles is no longer necessary.

For now, however, the memory of the affected system must first be saved.

## Creating a Memory Dump

To examine the memory, we first need an image of the current memory. There are various tools
under Linux, e.g.: LiMe or Img. These tools require root or
administrator privileges to function. Also keep in mind that RAM
can be very large these days; sufficient storage space must be available. For desktop systems, 16 GB is no longer
uncommon, and for servers we quickly reach one to several terabytes.

### Integrity Check

It is also important to note that we cannot hash the RAM,
since it changes continuously (which should be logical, just for
information). After creating an image, it is possible to create a checksum
over it.

### Direct Memory Access (DMA)

A method that should not go unmentioned is DMA. Here, hardware vulnerabilities are exploited to access
the content of the memory. In the past, this was often done via
Thunderbolt 3, PCIe, and USB-C.

Great lecture by Ulf Frisk at the 34C3:
  - [Lecture at 34C3](https://www.youtube.com/watch?v=XcEYkcwbRX8)
  - [German translation of lecture at 34C3](https://www.youtube.com/watch?v=DJSRVaj4nQc)
  - [Github of Ulf Frisk](https://github.com/ufrisk)

The German translation is a bit rough, if you are fluent in English, you should rather watch the English one.

### LiME

The tool has to be compiled itself, which can alter the state of the
memory of the system being tested, so it should be compiled externally
(if possible).

[Link to Github: LiME](https://github.com/504ensicsLabs/LiME)

Downloading the tool:

{{< codeWide >}}
cd /opt
sudo git clone https://github.com/504ensicsLabs/LiME.git
{{< /codeWide >}}

Compiling the tool:

{{< codeWide >}}
cd LiME/src
sudo make
{{< /codeWide >}}

The output should look something like this:

{{< codeWide >}}
sudo make
make -C /lib/modules/4.15.0-88-generic/build M="/opt/LiME/src" modules
make[1]: Entering directory '/usr/src/linux-headers-4.15.0-88-generic'
  CC [M]  /opt/LiME/src/tcp.o
  CC [M]  /opt/LiME/src/disk.o
  CC [M]  /opt/LiME/src/main.o
  CC [M]  /opt/LiME/src/hash.o
  CC [M]  /opt/LiME/src/deflate.o
  LD [M]  /opt/LiME/src/lime.o
  Building modules, stage 2.
  MODPOST 1 modules
  CC      /opt/LiME/src/lime.mod.o
  LD [M]  /opt/LiME/src/lime.ko
make[1]: Leaving directory '/usr/src/linux-headers-4.15.0-88-generic'
strip --strip-unneeded lime.ko
mv lime.ko lime-4.15.0-88-generic.ko
{{< /codeWide >}}

For using LiMe, a kernel module is created. This module
is tailored to the current kernel of the machine it was built
on. The module will not work under other kernel versions.

#### Loading the Kernel Module and Creating a Memory Image:

The format here is raw:

```sudo insmod lime-4.15.0-88-generic.ko 'path=../Linux64.mem format=raw'```

The `lime` format is better, as it can also be interpreted by Volatility:

```sudo insmod lime-4.15.0-88-generic.ko 'path=../Linux64.mem format=lime'```

The `path` specifies where the memory image should go.

### Img

[Link to Github: Img](https://github.com/halpomeranz/lmg)

I have not tested the tool yet, but it is supposed to be quite good.

### DumpIt.exe

A simple command-line tool under Windows is called DumpIt, with it
the entire memory of a system can be imaged.

[Link to Github DumpIt.exe](https://github.com/thimbleweed/All-In-USB/tree/master/utilities/DumpIt)

## Analyzing with Volatility

Volatility can be installed as a Stand-Alone version or as a Git version.
Under Linux, it is recommended to use the Git version (it makes creating profiles easier).

[Stand-Alone version on the website](https://www.volatilityfoundation.org/releases)

[Link to Github Volatility](https://github.com/volatilityfoundation/volatility)

### Installation under Linux

Simply clone the Git repository:
{{< codeWide >}}
cd /opt
sudo git clone https://github.com/volatilityfoundation/volatility.git>
{{< /codeWide >}}

Note that distorm3 is required, simply install it with pip: ```pip2 install distorm3```

### Creating Profiles

To understand what all the data means, Volatility needs some
information about the system from which the memory image comes. These
are called Profiles. Under Linux, these profiles must be created
yourself.[Link to the Volatility Wiki](https://github.com/volatilityfoundation/volatility/wiki/Linux#Linux-Profiles)

Under Debian and Ubuntu, `dwarfdump` is required:```sudo apt install dwarfdump```

First, read the current kernel with: ```uname -r```

Create the `modules` file. (Important: Run the command in the `/volatility/tools/linux` directory)
```sudo make -C /lib/modules/<Kernel Version>/build/ CONFIG_DEBUG_INFO=y M=$PWD modules```

A similar output appears:

{{< codeWide >}}
make: Entering directory '/usr/src/linux-headers-4.15.0-88-generic'
  CC [M]  /home/sebastian/Documents/volatility/tools/linux/module.o
  Building modules, stage 2.
  MODPOST 1 modules
WARNING: modpost: missing MODULE_LICENSE() in /home/sebastian/Documents/volatility/tools/linux/module.o
see include/linux/module.h for more information
  CC      /home/sebastian/Documents/volatility/tools/linux/module.mod.o
  LD [M]  /home/sebastian/Documents/volatility/tools/linux/module.ko
make: Leaving directory '/usr/src/linux-headers-4.15.0-88-generic'
{{< /codeWide >}}

Check again if the `module.o` file exists, then create the `module.dwarf` file.

```dwarfdump -di ./module.o > module.dwarf```

Combine the module.dwarf and `/boot/System.map....` into a .zip file

{{< codeWide >}}
sudo zip Test-Rechner.zip module.dwarf /boot/System.map-<Kernel Version>
adding: module.dwarf (deflated 91%)
adding: boot/System.map-4.15.0-88-generic (deflated 79%)
{{< /codeWide >}}

Then place the created .zip file in the directory: `/volatility/plugins/overlays/linux`

Check if the profile was recognized by Volatility:

{{< codeWide >}}
python vol.py --info | grep  Linux
Volatility Foundation Volatility Framework 2.6.1
LinuxMint-Sebastian-x250x64 - A Profile for Linux Mint-Sebastian-x250 x64
LinuxAMD64PagedMemory          - Linux-specific AMD 64-bit address space.
linux_aslr_shift           - Automatically detect the Linux ASLR shift
linux_banner               - Prints the Linux banner information
linux_yarascan             - A shell in the Linux memory image
{{< /codeWide >}}

### Possible Commands in Volatility

With `python vol.py --info`, all commands that volatility knows can be displayed.

#### Here is a small excerpt

{{< codeWide >}}
     Plugins
     -------
     amcache                    - Print AmCache information
     apihooks                   - Detect API hooks in process and kernel memory
     apihooksdeep               - Detect API hooks in process and kernel memory, with ssdeep for whitelisting
     atoms                      - Print session and window station atom tables
     atomscan                   - Pool scanner for atom tables
     auditpol                   - Prints out the Audit Policies from HKLM\SECURITY\Policy\PolAdtEv
     bigpools                   - Dump the big page pools using BigPagePoolScanner
     bioskbd                    - Reads the keyboard buffer from Real Mode memory
     cachedump                  - Dumps cached domain hashes from memory
     callbacks                  - Print system-wide notification routines
     chromecookies              - Scans for and parses potential Chrome cookie data
     chromedownloadchains       - Scans for and parses potential Chrome download chain records
     chromedownloads            - Scans for and parses potential Chrome download records
     chromehistory              - Scans for and parses potential Chrome url history
     chromesearchterms          - Scans for and parses potential Chrome keyword search terms
     chromevisits               - Scans for and parses potential Chrome url visits data -- VERY SLOW, see -Q option
     clipboard                  - Extract the contents of the windows clipboard
     cmdline                    - Display process command-line arguments
     cmdscan                    - Extract command history by scanning for _COMMAND_HISTORY
     connections                - Print list of open connections [Windows XP and 2003 Only]
     connscan                   - Pool scanner for tcp connections
     consoles                   - Extract command history by scanning for _CONSOLE_INFORMATION
     crashinfo                  - Dump crash-dump information

{{< /codeWide >}}

#### Commands for Linux and Mac

In Volatility there are commands specialized for Linux or Mac
memory images.
These can be displayed with: ```python vol.py --info | grep -i linux```

#### Also here a small excerpt
{{< codeWide >}}
     linux_apihooks             - Checks for userland apihooks
     linux_arp                  - Print the ARP table
     linux_aslr_shift           - Automatically detect the Linux ASLR shift
     linux_banner               - Prints the Linux banner information
     linux_bash                 - Recover bash history from bash process memory
     linux_bash_env             - Recover a process' dynamic environment variables
     linux_bash_hash            - Recover bash hash table from bash process memory
     linux_check_afinfo         - Verifies the operation function pointers of network protocols
     linux_check_creds          - Checks if any processes are sharing credential structures
     linux_check_evt_arm        - Checks the Exception Vector Table to look for syscall table hooking
     linux_check_fop            - Check file operation structures for rootkit modifications
     linux_check_idt            - Checks if the IDT has been altered
     linux_check_inline_kernel  - Check for inline kernel hooks
     linux_check_modules        - Compares module list to sysfs info, if available
     linux_check_syscall        - Checks if the system call table has been altered
     linux_check_syscall_arm    - Checks if the system call table has been altered
     linux_check_tty            - Checks tty devices for hooks
     linux_cpuinfo              - Prints info about each active processor
     linux_dentry_cache         - Gather files from the dentry cache
     linux_dmesg                - Gather dmesg buffer
     linux_dump_map             - Writes selected memory mappings to disk
     linux_dynamic_env          - Recover a process' dynamic environment variables
     linux_elfs                 - Find ELF binaries in process mappings
     linux_enumerate_files      - Lists files referenced by the filesystem cache
     linux_find_file            - Lists and recovers files from memory
     linux_getcwd               - Lists current working directory of each process
     linux_hidden_modules       - Carves memory to find hidden kernel modules
     linux_ifconfig             - Gathers active interfaces

{{< /codeWide >}}

### Structure of a Volatility Call

```python vol.py --file=/opt/LiME/Linux64.mem --profile=Test-Rechnerx64 linux_psaux```

With `--file`, the memory image is specified.
With `--profile`, the profile of the computer is specified; for Linux and Mac, these must be created.
For Windows, Volatility comes with many profiles.
The last is the command to be executed. It is important that the order of parameters matters.

Basically, using the tool is not difficult; only interpreting the results is challenging.

### Detecting the Profile

With this command, Volatility tries to detect what profile it is.
```sudo python vol.py --file=/opt/volatility/test_memory/windows/sample001.bin imageinfo```

The output looks approximately like this:
{{< codeWide >}}
     Volatility Foundation Volatility Framework 2.6.1
     INFO    : volatility.debug    : Determining profile based on KDBG search...
               Suggested Profile(s) : WinXPSP2x86, WinXPSP3x86 (Instantiated with WinXPSP2x86)
                          AS Layer1 : IA32PagedMemory (Kernel AS)
                          AS Layer2 : FileAddressSpace (/opt/volatility/test_memory/windows/sample001.bin)
                           PAE type : No PAE
                                DTB : 0x39000L
                               KDBG : 0x8054cde0L
               Number of Processors : 1
          Image Type (Service Pack) : 3
                     KPCR for CPU 0 : 0xffdff000L
                  KUSER_SHARED_DATA : 0xffdf0000L
                Image date and time : 2012-11-27 01:57:28 UTC+0000
          Image local date and time : 2012-11-26 19:57:28 -0600
{{< /codeWide >}}

From this we can assume it is a WinXPSP2x86.
That means a Windows XP Service Pack 2 on an x86 processor architecture.

### Plugins

Volatility is a framework, meaning the tool can be easily extended. You just need to copy .py files to
`/volatility/plugins`.

Example from volatility-plugins

[Link to Github volatility-plugins](https://github.com/superponible/volatility-plugins)

This is a small collection of plugins. Unfortunately, they only work
under Windows profiles and do not support Linux profiles.

There are many more plugins, but it is a bit hard to find them. A good starting point is the
Volatility Contest, where plugins have been awarded recently.

[Website to the Volatility Contest](https://www.volatilityfoundation.org/contest)

### Detecting Rootkits on Linux

To get an overview of whether a computer is infected with a rootkit,
Volatility can sometimes be very helpful. For this, Volatility offers
several ways to detect them. The command `linux_check_idt`.
It shows the Interrupt-Descriptor-Table, and if an entry has been redirected (Hooked), it speaks for a manipulated system.

#### Test on Ubuntu 14.04 with Rootkit

The test system is an Ubuntu 14.04 server version with a 4.4.0-142-generic Linux Kernel.

This rootkit was installed on it: [Test Rootkit from Github](https://github.com/nurupo/rootkit)

After that, a memory image was created with LiMe as well as the corresponding profile.

With `linux_hidden_modules` we can now search for hidden kernel modules:

```vol -f test_memory/linux_rootkit.mem --profile=Linuxubuntu14x64 linux_hidden_modules```

In this case, the rootkit is very quickly noticeable:
{{< codeWide >}}
    Volatility Foundation Volatility Framework 2.6.1
    Offset (V)         Name
    ------------------ ----
    0xffffffffc00ad040 rootkit
{{< /codeWide >}}

### Detecting Malware on Windows

Detecting Windows malware is a bit more involved, as
you need to know the internal structure of Windows very well.

#### Example of a Stuxnet Infection on a Windows XP Computer

Stuxnet is a computer worm allegedly created by the NSA in collaboration with Israel to weaken the Iranian nuclear program.
It uses several Windows vulnerabilities and is designed to infect control systems of industrial companies from Siemens and Simatic S7.
A deep analysis would go too far here, so only briefly shown how it can be detected.

To find out what OS it is, we use
`imageinfo`: ```vol -f test_memory/stuxnet.vmem imageinfo ```

We now know it is Windows XP Service Pack 2 on an x86 processor, which will be important for the later analysis.

With the command `pstree` we display all running processes.
In this case, the command to execute looks like this:
```vol -f test_memory/stuxnet.vmem --profile=WinXPSP2x86 pstree```

The output then looks like this:
{{< codeWide >}}
    Volatility Foundation Volatility Framework 2.6.1
    Name                                                  Pid   PPid   Thds   Hnds Time
    -------------------------------------------------- ------ ------ ------ ------ ----
     0x823c8830:System                                      4      0     59    403 1970-01-01 00:00:00 UTC+0000
    . 0x820df020:smss.exe                                 376      4      3     19 2010-10-29 17:08:53 UTC+0000
    .. 0x821a2da0:csrss.exe                               600    376     11    395 2010-10-29 17:08:54 UTC+0000
    .. 0x81da5650:winlogon.exe                            624    376     19    570 2010-10-29 17:08:54 UTC+0000
    ... 0x82073020:services.exe                           668    624     21    431 2010-10-29 17:08:54 UTC+0000
    .... 0x81fe52d0:vmtoolsd.exe                         1664    668      5    284 2010-10-29 17:09:05 UTC+0000
    ..... 0x81c0cda0:cmd.exe                              968   1664      0 ------ 2011-06-03 04:31:35 UTC+0000
    ...... 0x81f14938:ipconfig.exe                        304    968      0 ------ 2011-06-03 04:31:35 UTC+0000
    .... 0x822843e8:svchost.exe                          1032    668     61   1169 2010-10-29 17:08:55 UTC+0000
    ..... 0x822b9a10:wuauclt.exe                          976   1032      3    133 2010-10-29 17:12:03 UTC+0000
    ..... 0x820ecc10:wscntfy.exe                         2040   1032      1     28 2010-10-29 17:11:49 UTC+0000
    .... 0x81e61da0:svchost.exe                           940    668     13    312 2010-10-29 17:08:55 UTC+0000
    .... 0x81db8da0:svchost.exe                           856    668     17    193 2010-10-29 17:08:55 UTC+0000
    ..... 0x81fa5390:wmiprvse.exe                        1872    856      5    134 2011-06-03 04:25:58 UTC+0000
    .... 0x821a0568:VMUpgradeHelper                      1816    668      3     96 2010-10-29 17:09:08 UTC+0000
    .... 0x81fee8b0:spoolsv.exe                          1412    668     10    118 2010-10-29 17:08:56 UTC+0000
    .... 0x81ff7020:svchost.exe                          1200    668     14    197 2010-10-29 17:08:55 UTC+0000
    .... 0x81c47c00:lsass.exe                            1928    668      4     65 2011-06-03 04:26:55 UTC+0000
    .... 0x81e18b28:svchost.exe                          1080    668      5     80 2010-10-29 17:08:55 UTC+0000
    .... 0x8205ada0:alg.exe                               188    668      6    107 2010-10-29 17:09:09 UTC+0000
    .... 0x823315d8:vmacthlp.exe                          844    668      1     25 2010-10-29 17:08:55 UTC+0000
    .... 0x81e0eda0:jqs.exe                              1580    668      5    148 2010-10-29 17:09:05 UTC+0000
    .... 0x81c498c8:lsass.exe                             868    668      2     23 2011-06-03 04:26:55 UTC+0000
    .... 0x82279998:imapi.exe                             756    668      4    116 2010-10-29 17:11:54 UTC+0000
    ... 0x81e70020:lsass.exe                              680    624     19    342 2010-10-29 17:08:54 UTC+0000
     0x820ec7e8:explorer.exe                             1196   1728     16    582 2010-10-29 17:11:49 UTC+0000
    . 0x81c543a0:Procmon.exe                              660   1196     13    189 2011-06-03 04:25:56 UTC+0000
    . 0x81e86978:TSVNCache.exe                            324   1196      7     54 2010-10-29 17:11:49 UTC+0000
    . 0x81e6b660:VMwareUser.exe                          1356   1196      9    251 2010-10-29 17:11:50 UTC+0000
    . 0x8210d478:jusched.exe                             1712   1196      1     26 2010-10-29 17:11:50 UTC+0000
    . 0x81fc5da0:VMwareTray.exe                          1912   1196      1     50 2010-10-29 17:11:50 UTC+0000
{{< /codeWide >}}

It is noticeable that `lsass.exe` appears three times, with PIDs 680, 868, and 1928. `lsass` stands for Local Security Authority
Subsystem Service, this process is responsible for user authentication in Windows. It ensures the validity of the user account
on Windows. It should only be running once. From this we recognize that something is wrong. Malware creators often try to hide
behind internal processes, making detection hard even for experienced users and potentially confusing inexperienced users.

It is important to know that `lsass` has a parent process named `winlogon`, this is the case for Windows XP.
Starting with Windows Vista and later, this process is called `wininit`.

For clarity, the affected processes are shown again:
{{< codeWide >}}
    System(4)
     ↳smss(376)
      ↳winlogon(624)
       ↳lass(680)
       ↳services(668)
         ↳lsass(868)
         ↳lsass(1928)
{{< /codeWide >}}

The `lass` process with PID 680 is, as expected, a child process of `winlogon`, which looks like a normal Windows process.
The other two processes with PIDs 868 and 1928 are not child processes of `winlogon` but of `services`, so something is fishy here.

A cool feature of Volatility is that it can export process executables,
this works with `procdump`.

```vol -f test_memory/stuxnet.vmem --profile=WinXPSP2x86 procdump -p 668,1928 --dump-dir=test_memory/program/```

These files can also be uploaded to VirusTotal.
VirusTotal is a service where files can be uploaded and then run through multiple antivirus scans.