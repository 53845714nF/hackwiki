---
title: "Assembler ⚙️"
date: 2022-02-19T12:40:27+01:00
draft: false
hideLastModified: true
summaryImage: "img/assembler.png"
keepImageRatio: true
summary: "Mitschriften The Morpheus Assembler. Beschreibt die Grundstruktur eines Assembler Programms."
showInMenu: false
tags: ["Programmieren"]
---

## Mitschriften von Assembler Tutorial von The Morpheus Tutorials
[Link zur Playlist](https://www.youtube.com/watch?v=UiqAq-iWHPI&list=PLNmsVeXQZj7rhjy2t320NvKKGwP6Rxnpg)

### 1. Einführung
- sehr Maschinennah 
- erkennt wie CPU den Code interpretiert

#### Warum?
#### Vorteile
- Maschinenabhängiger Code 
- I/O Controlle
- Bei Hardware kann es nötig
- Reverse Engineering
- Malware Analyse
- optimierter Code
- Verständnis für CPU

#### Nachteile
- Anstrengend
- viele Bugs
- unlesbar
- nicht portabel
- verliert sich in Details


#### Code Auszug Beispiel:
{{< codeWide >}}
.top
  mov	di,num1+digits-1
  mov	si,num2+digits-1
  mov	cx, digts
  mov	bp, num2
  dec	dword [term]
  jz	.done

  mov	di,num2+digits-1
  mov	si,num1+digits-1
  mov	cx,digits
  call  AddNumber
{{< /codeWide >}}

Befehle wie `mov`, `jz` oder `call` werden vom Prozessor verarbeitet.

#### Performance optimieren 
Hochsprache -> Algorithmen optimieren -> Compiler-Optimierungen -> Assembler anpassen

### 2. GCC Assembler 
Unterscheidet in verschiedene Assembler Arten/Syntaxe unter x86 z.B.: AT&T und Intel Asm

#### C Code Beispiel:
{{< codeWide >}}
#include <stdio.h>
#define MSG "Hello World"

int main(void)
{
  //Hello world 
  printf(MSG);
  printf(" and bye\n");
  return 0;
}
{{< /codeWide >}}

[C Quellcode Datei](file/2.GCC_assembler/example.c)

#### Kompilieren
Normales kompilieren mit gcc: `gcc -Wall example.c -o example`

Anzeige der Temporären Dateien: `gcc -Wall -save-temps example.c -o example`

Die .i Datei zeigt die Schritte des Preprozessing. [Preprozessing Datei](file/2.GCC_assembler/example.i)

Also ersetzt Macros und entfernt Kommentare. Einfügen von Libarys.

Die .s Datei zeigt den generierten Assembler Code an. [Assembler Datei](file/2.GCC_assembler/example.s)

Die .o Datei zeigt Binäre Maschinensprache an. Danach muss dieser noch gelinkt werden.
[Maschinensprache Datei](file/2.GCC_assembler/example.o)

Es entsteht ein fertiges Programm. [Programm](file/2.GCC_assembler/example)

Nur Assembler Output: `gcc -S example.c -o example.s `

Objekt File erstellen: `gcc -S -c example.s -o example.o`

Programm linken: `gcc example.o -o example`



### 3. Der Von Neuman Rechner
{{< codeWide >}}
+--------------------------------------------------------------------+
|                                                                    |
|  +------------------------------------------------------------+    |
|  |                     Control Unit                           |    |
|  +----+--------------------------------------------------+----+    |
|       ^              +---------+ +----------+            |         |
|       |              |         | |  Clock   |            |         |
|       |              |   ALU   | +----------+            |         |
|       |              |         |                         |         |
|       |              +-----+---+                         |         |
|       |                    ^                             |         |
|       |                    v                             |         |
|       |            +-------+------+                      |         |
|       |            |              |                      |         |
|       |            |   Register   |                      |         |
|       |            |              |                      |         |
|       |            +-------+------+                      |         |
|       |                    ^                             |         |
|       |                    |                             |         |
|       |                    v                             v         |
|  +----+-------+     +------+--------+             +------+----+    |
|  |            |     |               |             |           |    |
|  |   Input    +---->+    Speicher   +------------>+  Output   |    |
|  |            |     |               |             |           |    |
|  +------------+     +---------------+             +-----------+    |
|                                                                    |
+--------------------------------------------------------------------+
{{< /codeWide >}}

- ALU, Clock, Register = CPU
- Speicher = RAM
- Input = Tastatur, Festplatte
- Output = Festplatte, Grafikkarte, Monitor 
- Control Unit = Vereinfacht Mainboard

#### Programm exit
Ein Programm, was sich selbst beendet:

{{< codeWide >}}
movl	$0, %ebx
movl	$1, %eax
int 	0x80
{{< /codeWide >}}

`ebx` und `eax` sind Register. Dort werden Variabeln reingepackt. 


Das `int  $0x80` sagt dem Linux Kernel, es soll den Syscall der in `%eax` steht ausführen. In diesem Fall der erste, welcher für Schließen steht.

### 4. Abstrahierter Speicher
{{< codeWide >}}
        +---------------+
0x00    |               |
        +---------------+
...     |               |
        +---------------+
0x10    |               |
        +-------+-------+
0x11    | Dword | Dword |
        +-------+-------+
        |     LWord     |
        +---------------+
        |               |
        +---------------+
{{< /codeWide >}}

`mov	(%ebx), %eax`

1 Zeile: lädt Inhalt aus der Adresse (`%ebx`) in Register `%eax`.

`esi` = für String Operationen

### 5. Verschieben von Dateien
`movb $0, %eax`

`movb`  -> move  8 bit

`movvw` -> move 16 bit

`movl`  -> move 32 bit

`movq`  -> move 64 bit

### 6. Der Stack 
Speicher in der CPU, dient als Zwischenspeicher. Ist zwischen Ram und Registern zu sehen.

`esp` -> Stak Pointer

#### Push 
Verschiebt `eax` auf den Stack:
{{< codeWide >}}
movq $0, %eax
pushq %eax
{{< /codeWide >}}

Stack Pointer wächst, zeigt auf die letzte Zahl im Stack.

#### Pop
Lesen vom Stack und in `%eax` reinschreiben:
{{< codeWide >}}
popq %eax
{{< /codeWide >}}
Stack Pointer zeigt wieder nach unten.

### 7. Prozeduren und Funktionen

Main Prozedur:

{{< codeWide >}}
main:
    ...
    call myporc

implicit:
    ...

myporc:
    ...
    ret
{{< /codeWide >}}

`eip` -> Instruktion Pointer

{{< codeWide >}}
            +---------------+
 eip  +---->+ ....          |
            +---------------+
            | call myproc   |
            +---------------+
            | ...           |
            +---------------+
            | myproc        |
            +---------------+
            | ret           |
            +---------------+
            |               |
            +---------------+
            |               |
            +---------------+
 esp  +---->+               |
            +---------------+
{{< /codeWide >}}

Instrution Pointer geht nach unten. Der Stack Pointer geht nach oben. Der Instruktion Pointer soll die Funktion myproc aufrufen. Bevor sie das tut, wird die Adresse+1 in den Stack geschrieben (implicit). Um nachher wieder, zurück zu kehren.


{{< codeWide >}}
            +---------------+
            | ....          |
            +---------------+
            | call myproc   |
            +---------------+
            | ...           |
            +---------------+
 eip  +---->+ myproc        |
            +---------------+
            | ret           |
            +---------------+
            |               |
            +---------------+
            |               |
            +---------------+
 esp  +---->+ implicit      |
            +---------------+
{{< /codeWide >}}

Am Ende der Prozedur trifft der Instruktion Pointer (`eip`) auf `ret`, das heißt, er soll da weiter machen, wo er zuvor aufgehört hat. Wert `implicit` wird in vom Stack gepopt. Und in `eip` geschrieben.
Damit geht er wieder nach oben.

{{< codeWide >}}
            +---------------+
            | ....          |
            +---------------+
            | call myproc   |
            +---------------+
 eip  +---->+ ...           |
            +---------------+
            | myproc        |
            +---------------+
            | ret           |
            +---------------+
            |               |
            +---------------+
            |               |
            +---------------+
 esp  +---->+               |
            +---------------+
{{< /codeWide >}}

Wichtig ist, dass hier jetzt richtig terminiert wird.

### 8. Einstiegspunkte und Ausgaben
{{< codeWide >}}
.text
.data
.global main

main:
  movl	$4, %eax
  movl	$1, %ebx
  movl	$msg, %ecx
  movl	$len, %edx
  int 	$0x80

  movl 	$0, %ebx
  movl 	$1, %eax
  int 	$0x80

msg:
    .ascii    "Hello World."
    len = . - msg
{{< /codeWide >}}

[Assembler Quellcode Datei](file/8.Hello/hello.s)

[Maschienen Sprache Datei](file/8.Hello/hello.o)

[Programm](file/8.Hello/hello)

`.text`, `.data` und `.global main` sind Sections.
Wichtig erstmal ist `.global main` dieses sagt, das wir ab `main` starten wollen.
Mit `int $0x80` wird ein Syscall aufgerufen, die Parameter für diesen sind in den Registern:

`eax` -> Syscall (4 für write)

`ebx` -> Output (1 für stout also Commandline)

`ecx` -> Text (msg)

`edx` -> Länge der Nachricht (len)

Um eine Ausgabe zu erzeugen, brauchen wir den vierten Syscall, darum wird die 4 in `eax` gepackt.


Kompilieren:
{{< codeWide >}}
gcc -c hello.s -o hello.o
gcc -no-pie hello.o -o hello
{{< /codeWide >}}


### 9. Integer ausgeben
{{< codeWide >}}
.text
.data
.global main

main:
  movl  $4, %eax
  movl  $1, %ebx
  movl  $one, %ecx
  movl  $onelen, %edx
  int   $0x80

  movl  $0, %ebx
  movl  $1, %eax
  int   $0x80

one:
  .ascii  "1"
  onelen = . - one
{{< /codeWide >}}

### 10. Bedingte Ausgabe
{{< codeWide >}}
cmp $3, %esi # vergleich 3 mit esi
jne notequal # Spring zu notequal wenn ungleich
{{< /codeWide >}}

[Kompletter Assembler Quellcode Datei](file/10.Bedigte_Ausgabe/zahl.s)

[Maschinensprache Datei](file/10.Bedigte_Ausgabe/zahl.o)

[Programm](file/10.Bedigte_Ausgabe/zahl)


Mit `cmp` also Compare lassen sich Dinge vergleichen. Mit Jumps lässt sich dann an die nächste stelle springen. 

### 11. Sprungbefehle - Jump
#### Häufig verwendet
`jmp` -> Jump

`je`  -> Equal

`jne` -> Not Equal

`jg`  -> Greater

`jge` -> Greater or Equal

`jl`  -> Less

`jle` -> Less or Equal

#### Seltener verwendet
`ja`  -> Above, ignoriert Vorzeichen

`jae` -> Above or Equal

`jb`  -> Below

`jbe` -> Below or Equal

`jo`  -> Overflow (Überlauf von Plus zu Minus)

`jno` -> No Overflow 

`jz`  -> Zero

`jnz` -> Not Zero

`js`  -> Signed

`jns` -> Not Signed


### 12. Arithmetische Befehle
#### Addition
{{< codeWide >}}
add	$3, %esi # Zahlen auf Register addieren 
add	%eax, %esi # eax auf esi addieren 
{{< /codeWide >}}

#### Subtraktion
`sub	%eax, %esi`
Die CPU kann eigentlich kein subtrahieren, darum wird ein kleiner Trick angewendet.

{{< codeWide >}}
neg	%eax
add	%eax, %esi
{{< /codeWide >}}
Es wird das Register `eax` negiert und dann auf `esi` addiert.

#### Multiplikation
Der `mul` Befehl multipliziert immer aus `eax`. Das Ergebnis wird dann wieder in `eax` hineingeschrieben. (Wenn zu groß dann noch in `edx`)

{{< codeWide >}}
movl	$1, %eax   # 1 in eax
mul 	%esi       # multipliziert eax und esi
movl	%eax, %esi # zurück moven
{{< /codeWide >}}

##### Integer multiplizieren
Ermöglicht multiplizieren mit 
`imul	$3, %esi # 3 multiplizieren mit esi`

#### Division
Wie bei der Multiplikation wird immer mit `eax` gerechnet. Das Register `edx` wird bei der Berechnung mit verwendet und muss vorher "gesäubert" werden.

`eax` -> Quotient

`edx` -> Rest

{{< codeWide >}}
movl 	$0, %edx
div	%esi          # Division %edx:%eax / %esi 
movl	%eax, %esi
{{< /codeWide >}}

### 13. Schleifen
Schleife bis 5. Vergleich mit `ecx`, bis dieser gleich Null ist. `ecx` wird dabei um ein verringert.
{{< codeWide >}}
movl 	$5, %ecx

Schleife:
	add 	$1, %esi
	loop	Schleife 
{{< /codeWide >}}

#### Weitere  Schleifen Befehle

`loop` -> Schleife, wird ausgeführt, bis `ecx` = 0, verringert `ecx` immer um 1

`loope` -> equals (ob das Zero Bit auf Null gesetzt wurde, also die letzte Aufruf Null ergeben hat.) (`ecx` muss größer Null sein.)

`loopz` -> genauso wie `loope`

### 14. Logische Operatoren
`UND` auf zwei Registern:

{{< codeWide >}}
movl	$0xFFFF, %esi
movl	$0x0, %ecx
andl	%ecx, %esx # Gespeichert in esx
{{< /codeWide >}}

`orl` -> OR

`xorl` -> XOR

### 15. Shift Befehle
Schift Links um eins:
{{< codeWide >}}
movl 	$1, %esi #000...0001 in %esi
shll	$1, %esi #000...0010 in %esi
{{< /codeWide >}}
`shrl` -> Rechts (das l für dobbel word.)

### 16. Stack Frames

Bei Prozeduren, die nicht der Reihe aufgerufen werden, werden Stack Frames gebraucht.

{{< codeWide >}}
main:
    ...
    call poc2

proc1:
    ...

proc2:
    call proc1
    ret
{{< /codeWide >}}

{{< codeWide >}}
          esp-->+---------------+
                | vars proc1    |
frame pointer-->+---------------+
                | return addr   |
                +---------------+
                | params proc1  |
                +---------------+
                | Vars proc2    |
                +---------------+
                | return addr   |
                +---------------+
                | params proc2  |
                +---------------+
{{< /codeWide >}}

`frame pointer` zeigt die Adresse auf die zurück gesprungen werden soll.

Der Frame besteht immer aus den 3 Angaben von `variabeln`, `return adresse` und `Parametern`.

### 17. GCC Output

{{< codeWide >}}
	.file	"example.c"                                 # Debugger kann nachvollziehen aus welcher Datei das kommt.
	.text                                               # Könnte Code beinhalten.
	.section	.rodata                                 # Read Only Data 
.LC0:                                                   # 
	.string	"Hello World"                               # Nur lesbar (Darf nicht verändert werden.)
.LC1:                                                   
	.string	" and bye"                                  
	.text                                               
	.globl	main                                        # .globl wird das Programm aufgerufen 
	.type	main, @function                             # Funktion main die Aufgerufen werden kann.
main:                                                   
.LFB0:                                                  # Local Function Begin (Nummer)
	.cfi_startproc                                      # Starten einer Prozedur (checken das ein Frame Pointer vorhanden ist)
	pushq	%rbp                                        
	.cfi_def_cfa_offset 16                              # Canonical Frame Address Pointer CFA (zeigt auf Frame vor dem akktuellen Frame)
	.cfi_offset 6, -16                                  # Frame Pointer
	movq	%rsp, %rbp                                  
	.cfi_def_cfa_register 6                             # CFA = Register Nummer 6
	leaq	.LC0(%rip), %rdi                            # LC0 Auslesen und in rdi verschieben
	movl	$0, %eax                                    
	call	printf@PLT                                  # printf aufrufen aus procedure linkage table (PLT)
	leaq	.LC1(%rip), %rdi                            # LC1 in rdi 
	call	puts@PLT                                    # Put aufrufen (weil Output schon offen ist, durch printf)
	movl	$0, %eax                                    
	popq	%rbp                                        
	.cfi_def_cfa 7, 8                                   
	ret                                                 
	.cfi_endproc                                        # Debbuger info
.LFE0:                                                  # Local Function End (Nummer)
	.size	main, .-main                                
	.ident	"GCC: (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0"  
	.section	.note.GNU-stack,"",@progbits            

{{< /codeWide >}}

### 18. Inline Assembler - Assembler Code in C

{{< codeWide >}}
#include <stdio.h>

int main (void)
{
  int num = 24, output;

  asm("movl %1, %%ebx;"  // Prozentzeichen doppelt um zugriff zu erhalten 
      "movl %%ebx, %0 ;"
      : "=r" (output)  // OUTPUT
      : "r" (num)     // INPUT
      :"%ebx"        // USED REGISTERS
     );

printf("%d\n", output);
return 0;

}
{{< /codeWide >}}