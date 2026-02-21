---
title: "Volatility 📂"
date: 2022-02-17T21:05:30+01:00
draft: false
hideLastModified: true
summaryImage: "img/vol.png"
keepImageRatio: true
summary: "Analyse des Arbeitsspeicher mit Volatility"
showInMenu: false
tags: ["Forensik"]
---

{{< notificationBlue >}}
Hier wird der Umgang mit Volatility 2 gezeigt. Aktuell ist mittlerweile Volatility 3.
{{< /notificationBlue >}}

Wer nach einem Einbruch den Arbeitsspeicher eines Rechners untersuchen
muss, darf sich der tatkräftigen Unterstützung des Python-Framework
Volatility erfreuen. In diesem Post geht es noch um Volatility 2 mittlerweile gibt es die dreier Version.
Hier hat sich einiges verändert, so ist zum Beispiel das Erstellen von Profilen nicht mehr notwendig.

Vorerst muss jedoch der Arbeitsspeicher des betroffenen Systems gespeichert werden.

## Memory Speicherauszug (Dump) erstellen

Um den Arbeitsspeicher zu untersuchen, brauchen wir erst einmal ein
Abbild des aktuellen Arbeitsspeichers. Hier gib es verschiedene Tools
unter Linux z.B.: LiMe oder Img. Diese Tools brauchen Root bzw.
Administratorrechte um zu funktionieren. Bedenke auch, dass RAM
heutzutage groß sein kann, hier muss natürlich genügend Speicherplatz
zur Verfügung stehen. Bei Desktop Systemen sind 16 GB keine Seltenheit
mehr und bei Servern kommen wir schnell an die ein bis mehrere Terabyte
ran.

### Integritätsprüfung

Auch wichtig zu beachten ist, dass wir kein Hash vom RAM machen können,
da dieser sich kontinuierlich ändert (sollte logisch sein, nur so zur
Info). Nach dem Erstellen eines Abbildes, ist es möglich eine Checksumme
über dieses zu bilden.

### Direct Memory Access (DMA)

Eine Methode die vielleicht nicht unerwähnt bleiben solle, ist die des
DMA. Hierbei werden Schwachstellen der Hardware ausgenutzt, um an den
Inhalt des Arbeitsspeicher zu gelangen, in der Vergangenheit häufig bei
Thunderbold3, PCIe und USB-C.

Guter Vortrag von Ulf Frisk auf dem 34C3:
  - [Vortrag auf dem 34C3](https://www.youtube.com/watch?v=XcEYkcwbRX8)
  - [Deutsche Übersetzung von Vortrag auf dem 34C3](https://www.youtube.com/watch?v=DJSRVaj4nQc)
  - [Github von Ulf Frisk](https://github.com/ufrisk)


Die deutsche Übersetzung stockt ein wenig, wer des Englischen mächtig ist, sollte lieber diese gucken.

### LiME

Das Tool muss selbst kompiliert werden, das kann den Zustand des
Arbeitsspeichers, des zu testenden System verändern, darum sollte es
extern kompiliert werden (Sofern möglich).

[Link zum Github: LiME](https://github.com/504ensicsLabs/LiME)

Herunterladen des Tools:

{{< codeWide >}}
cd /opt
sudo git clone https://github.com/504ensicsLabs/LiME.git
{{< /codeWide >}}

Kompilieren des Tools:

{{< codeWide >}}
cd LiMe/src
sudo make 
{{< /codeWide >}}

Der Output sollte dann so ähnlich aussehen:

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

Für das Nutzen von LiMe wird also ein Kernel Modul erstellt. Dies Modul
richtet sich nach dem aktuellen Kernel der Maschine, auf dem es gebaut
wurde. Das Modul läuft also nicht unter anderen Kernel Versionen.

#### Kernel Modul laden und Memory Abbild erstellen:

Format ist hier raw:

```sudo insmod lime-4.15.0-88-generic.ko 'path=../Linux64.mem format=raw'```

Besser ist das Format `lime` dies kann auch von Volatility interpretiert werden:

```sudo insmod lime-4.15.0-88-generic.ko 'path=../Linux64.mem format=lime'```

Das `path` gibt an wo das Memory Abbild hin soll.

### Img

[Link zum Github: Img](https://github.com/halpomeranz/lmg)

Ich habe das Tool noch nicht getestet, doch es soll recht gut sein.

### DumpIt.exe

Ein einfaches Command Line Tool unter Windows nennt sich DumpIt, mit ihm
lässt sich auch der gesammte Arbeitsspeicher eines Systems abbilden.

[Link zum Github DumpIt.exe](https://github.com/thimbleweed/All-In-USB/tree/master/utilities/DumpIt)

## Volatility zur Analyse

Volatility kann als Stand-Alone Version und als Git-Version installiert werden.
Unter Linux ist es zu empfehlen, die Git Version zu nehmen (Macht das Erstellen von Profilen einfacher).

[Stand-Alone Versin auf der Webseite](https://www.volatilityfoundation.org/releases)

[Link zum Github Volatility](https://github.com/volatilityfoundation/volatility)

### Installation unter Linux

Einfach das Git Repository klonen:
{{< codeWide >}}
cd /opt 
sudo git clone https://github.com/volatilityfoundation/volatility.git>
{{< /codeWide >}}

Hinweis, es wird distorm3 benötigt, einfach mit pip Installieren: ```pip2 install distorm3```

### Erstellen von Profilen
Um zu verstehen, was all die Daten bedeuten, braucht Volatility einige
Informationen über das System von dem das Memory Abbild stammt. Diese
nennen sich dann Profile. Unter Linux müssen diese Profile selbst
erstellt werden.[Link zum Volatility Wiki](https://github.com/volatilityfoundation/volatility/wiki/Linux#Linux-Profiles)

Unter Debian und Ubuntu wird `dwarfdump` benötigt:```sudo apt install dwarfdump```

Erstmal den aktuellen Kernel auslesen mit: ```uname -r``` 

Erstellen der `modules` Datei. (Wichtig: Command im Ordner `/volatility/tools/linux` ausführen)
```sudo make -C /lib/modules/<Kernel Vesion>/build/ CONFIG_DEBUG_INFO=y M=$PWD modules```

Es kommt ein ähnlicher Output:

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

Nochmal gucken, ob die `module.o` Datei da ist und dann die `module.dwarf` Datei erstellen.

```dwarfdump -di ./module.o > module.dwarf```

Zusammenfassen der module.dwarf und er `/boot/System.map....` zu einer .zip Datei

{{< codeWide >}}
sudo zip Test-Rechner.zip module.dwarf /boot/System.map-<Kernel Version>
adding: module.dwarf (deflated 91%)
adding: boot/System.map-4.15.0-88-generic (deflated 79%)
{{< /codeWide >}}

Die erstellte .zip Datei dann in das Verzeichnis: `/volatility/plugins/overlays/linux`

Gucken, ob das Profil von volatility erkannt wurde:

{{< codeWide >}}
python vol.py --info | grep  Linux                                                                                                                                
Volatility Foundation Volatility Framework 2.6.1
LinuxMint-Sebastian-x250x64 - A Profile for Linux Mint-Sebastian-x250 x64
LinuxAMD64PagedMemory          - Linux-specific AMD 64-bit address space.
linux_aslr_shift           - Automatically detect the Linux ASLR shift
linux_banner               - Prints the Linux banner information
linux_yarascan             - A shell in the Linux memory image
{{< /codeWide >}}

### Mögliche Befehle unter volatility

Mit dem `python vol.py --info` lassen sich alle Befehle anzeigen, die
volatility kennt.

#### Hier ein kleiner Auszug

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


#### Befehle für Linux und Mac

Bei volatility gibt es Befehle, die sind speziell auf Linux oder Mac
Memory Abbilder spezialisiert. 
Diese lassen sich mit: ```python vol.py --info | grep -i linux``` anzeigen.

#### Auch hier ein kleiner Auszug
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

### Struktur des volatility Aufrufes

```python vol.py --file=/opt/LiME/Linux64.mem --profile=Test-Rechnerx64 linux_psaux```

Mit `--file` wird das Memory Abbild angegeben.
Mit `--profile` wird das Profil des Rechners angegeben für Linux und Mac müssen diese erstellt werden.
Für Windows bringt volatility viele Profile mit.
Das letzte ist der Befehl, der ausgeführt werden soll. Wichtig ist, dass die Reihenfolge der Parameter eine Rolle spielt.

Grundsätzlich kann man sagen das nutzen des Tools ist nicht schwer, nur die Auswertung, der zu bekommenden Ergebnisse ist schwer.

### Profil erkennen

Mit diesem Command versucht volatility zu erkennen, um was für ein Profil es sich handelt.
```sudo python vol.py --file=/opt/volatility/test_memory/windows/sample001.bin imageinfo ```

Der Output von diesem sieht dann in etwa so aus:
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

Damit können wir annehmen, dass es sich hier um ein WinXPSP2x86 handelt.
Sprich ein Windows XP Service pack 2 auf einer x86 Prozessorarchitektur.

### Plugins

Bei volatility handelt es sich um ein Framework, dass heißt das Tool lässt sich einfach erweitern. Es müssen nur .py Dateien in
`/volatility/plugins` kopiert werden.

Beispiel von volatility-plugins

[Link zu Github volatility-plugins](https://github.com/superponible/volatility-plugins)

Hier handelt es sich um eine kleine Sammlung von Plugins. Diese
funktionieren leider nur unter Windows Profilen und unterstützen keine
Linux Profile.

Es gibt noch viele weitere Plugins, es ist jedoch ein wenig schwer, diese zu finden. Eine gute Anlaufstelle ist des weiteren der
Volatility Contest, bei dem werden plugins der letzten Zeit ausgezeichnet wurden.

[Website zum Volatility Contest](https://www.volatilityfoundation.org/contest)

### Rootkits unter Linux erkennen

Ein Überblick zu verschaffen, ob der Rechner mit einem Rootkit infiziert
ist, kann Volatility manchmal ganz hilfreich sein. Auch hierfür bietet Volatility
einige Möglichkeiten, dies zu erkennen. Der Command `linux_check_idt`.
Es zeigt die Interrupt-Descriptor-Tabelle, wenn hier ein Eintrag umgeleitet (Hooked) ist, spricht einiges für ein manipuliertes System.

#### Test auf Ubuntu 14.04 mit Rootkit

Test System ist ein Ubuntu 14.04 in der Server Version mit einem 4.4.0-142-generic Linux Kernel.

Auf diesem wurde dieses Rootkit installiert: [Test Rootkit von Github](https://github.com/nurupo/rootkit)

Danach wurde ein Memory Abbild mit LiMe erstellt sowie das entsprechende Profil.

Mit `linux_hidden_modules` können wir jetzt nach versteckten Kernel Modulen suchen:

```vol -f test_memory/linux_rootkit.mem --profile=Linuxubuntu14x64 linux_hidden_modules```

In diesem Fall fällt das rootkit natürlich sehr schnell auf:
{{< codeWide >}}
    Volatility Foundation Volatility Framework 2.6.1
    Offset (V)         Name
    ------------------ ----
    0xffffffffc00ad040 rootkit
{{< /codeWide >}}

### Malware unter Windows erkennen

Das Erkennen von Windows Maleware ist nochmal ein wenig aufwendiger, da
man sich sehr gut, mit der Internen Struktur von Windows auskennen muss.

#### Beispiel eines Stuxnet Befalls an einem Windows XP Rechner

Stuxnet ist ein Computerwurm, der mutmaßlich von der NSA in Zusammenarbeit mit Israel geschaffen wurde, um das Iranisches Atomprogramm zu schwächen.
Dieser benutze mehrere Schwachstellen in Windows und er ist auf das Befallen von Steuerungssysteme von Industrieanlagen der Firmen Siemens und Simatic S7 ausgelegt. 
Eine tiefgehende Analyse würde hier jedoch zu weit führen, hier nur kurz gezeigt, wie dieser erkannt werden kann.

Um raus zu kriegen, um welches OS, es sich handelt, benutzen wir
`imageinfo`: ```vol -f test_memory/stuxnet.vmem imageinfo ```

Wir wissen jetzt, dass es sich um Windows XP Service Pack 2 auf einem x86 Prozessor handelt, dies wird in der späteren Analyse noch wichtig sein.

Mit dem Befehl `pstree` lassen wir uns alle laufenden Prozesse anzeigen.
In diesem Fall sieht der auszuführende Command so aus:
```vol -f test_memory/stuxnet.vmem --profile=WinXPSP2x86 pstree```

Der Output sieht dann so aus:
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

Es fällt auf, dass die `lsass.exe` dreimal vorhanden ist, mit den Pids 680, 868 und 1928. Das `lsass` steht für Local Security Authority
Subsystem Service diese Prozess ist für Authentifizierung von Nutzern in Windows zuständig. Er sorgt dafür, die Gültigkeit des Benutzeraccounts
an dem Windows zu prüfen. Er darf nur einmal ausgeführt werden. Daran merken wir, dass hier was nicht stimmt. Nicht selten versuchen Schadcode
Hersteller, sich hinter interne Prozesse zu verstecken. Das macht das
Erkennen selbst für erfahrene Nutzer schwer und kann gleichzeitig für
Verunsicherungen bei unerfahrenen Nutzern sorgen.

Wichtig ist es jetzt, zu wissen, dass `lass` ein parent process (dt.
Elternprozess) mit dem Namen `winlogon` hat, dies gilt für Windows XP.
Ab Windows Vista und folgende heißt dieser Prozess `wininit`.

Zur Übersicht sind die betroffenen Prozesse nochmal dargestellt:
{{< codeWide >}}
    System(4)
     ↳smss(376)
      ↳winlogon(624)
       ↳lass(680)
       ↳services(668)
         ↳lsass(868)
         ↳lsass(1928)
{{< /codeWide >}}

Der `lass` Prozess mit der Pid 680 ist, wie erwartet ein Kindprozess von `winlogon`, dies sieht so aus, als wäre es ein normaler Prozess vom
Windows aus. Die anderen beide Prozesse mit den Pids 868 und 1928 sind keine Kindprozesse von `winlogon` sondern von `services`, hier ist also was faul.

Cooles Feature von Volatility ist das Executables von Prozessen
exportiert werden kann, dies geht mit `procdump`.

```vol -f test_memory/stuxnet.vmem --profile=WinXPSP2x86 procdump -p 668,1928 --dump-dir=test_memory/program/```

Diese Dateien können dann auch noch mal auf VirusTotal hochgeladen werden.
VirusTotal ist ein Dienst bei dem Files hoch geladen werden können und diese dann durch mehrer Anti-Viren scanns durchläuft.
