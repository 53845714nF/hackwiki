---
title: "Assembler ⚙️"
date: 2022-02-19T12:40:27+01:00
draft: false
hideLastModified: true
summaryImage: "img/assembler.png"
keepImageRatio: true
summary: "Notes from The Morpheus Assembler Tutorial. Describes the basic structure of an assembler program."
showInMenu: false
tags: ["Programming"]
---

## Notes from Assembler Tutorial by The Morpheus Tutorials
[Link to playlist](https://www.youtube.com/watch?v=UiqAq-iWHPI&list=PLNmsVeXQZj7rhjy2t320NvKKGwP6Rxnpg)

### 1. Introduction
- Very close to the machine
- Understands how the CPU interprets code

#### Why?
#### Advantages
- Machine-dependent code
- I/O Control
- Necessary for hardware
- Reverse Engineering
- Malware Analysis
- Optimized code
- Understanding of CPU

#### Disadvantages
- Exhausting
- Many bugs
- Unreadable
- Not portable
- Gets lost in details

#### Code Excerpt Example:
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

Instructions like `mov`, `jz`, or `call` are processed by the processor.

#### Performance Optimization
High-level language -> Optimize algorithms -> Compiler optimizations -> Adapt assembler

### 2. GCC Assembler
Distinguishes between different assembler types/syntaxes under x86, e.g., AT&T and Intel Asm

#### C Code Example:
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
{{< codeWide >}}

[C Source File](file/2.GCC_assembler/example.c)

#### Compiling
Normal compiling with gcc: `gcc -Wall example.c -o example`

Display temporary files: `gcc -Wall -save-temps example.c -o example`

The .i file shows the preprocessing steps. [Preprocessing File](file/2.GCC_assembler/example.i)

This replaces macros and removes comments. Inserts libraries.

The .s file shows the generated assembler code. [Assembler File](file/2.GCC_assembler/example.s)

The .o file shows binary machine language. It still needs to be linked.
[Machine Language File](file/2.GCC_assembler/example.o)

A finished program results. [Program](file/2.GCC_assembler/example)

Assembler output only: `gcc -S example.c -o example.s`

Create object file: `gcc -S -c example.s -o example.o`

Link the program: `gcc example.o -o example`

### 3. The Von Neumann Computer
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
- Input = Keyboard, Hard Drive
- Output = Hard Drive, Graphics Card, Monitor
- Control Unit = Simplified Mainboard

#### Program Exit
A program that ends itself:

{{< codeWide >}}
movl	$0, %ebx
movl	$1, %eax
int 	0x80
{{< /codeWide >}}

`ebx` and `eax` are registers. Variables are placed in them.

The `int  $0x80` tells the Linux kernel to execute the syscall that is in `%eax`. In this case the first one, which stands for close.

### 4. Abstracted Memory
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

Line 1: loads content from address (`%ebx`) into register `%eax`.

`esi` = for string operations

### 5. Moving Files
`movb $0, %eax`

`movb` -> move 8 bit

`movvw` -> move 16 bit

`movl` -> move 32 bit

`movq` -> move 64 bit

### 6. The Stack
Memory in the CPU, serves as temporary storage. It is between RAM and Registers.

`esp` -> Stack Pointer

#### Push
Moves `eax` onto the stack:
{{< codeWide >}}
movq $0, %eax
pushq %eax
{{< /codeWide >}}

The stack pointer grows, points to the last number in the stack.

#### Pop
Read from the stack and write into `%eax`:
{{< codeWide >}}
popq %eax
{{< /codeWide >}}

The stack pointer points back down.

### 7. Procedures and Functions

Main Procedure:

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

`eip` -> Instruction Pointer

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
  esp  +---->+               |
            +---------------+
{{< codeWide >}}

The Instruction Pointer goes down. The Stack Pointer goes up. The Instruction Pointer is supposed to call the function myproc. Before it does so, the address+1 is written onto the stack (implicit). To come back later.

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
  esp  +---->+ implicit      |
            +---------------+
{{< codeWide >}}

At the end of the procedure, the Instruction Pointer (`eip`) hits `ret`, meaning it should continue where it stopped before. The value `implicit` is popped from the stack and written into `eip`.
So it goes back up.

Important that this is properly terminated here.

### 8. Entry Points and Outputs
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

[Assembler Source File](file/8.Hello/hello.s)

[Machine Language File](file/8.Hello/hello.o)

[Program](file/8.Hello/hello)

`.text`, `.data` and `.global main` are Sections.
The important one first is `.global main`, which says we want to start at `main`.
With `int $0x80` a Syscall is called, the parameters for this are in the registers:

`eax` -> Syscall (4 for write)

`ebx` -> Output (1 for stout, i.e., Commandline)

`ecx` -> Text (msg)

`edx` -> Length of the message (len)

To produce an output, we need the fourth syscall, so 4 is put in `eax`.

Compiling:
{{< codeWide >}}
gcc -c hello.s -o hello.o
gcc -no-pie hello.o -o hello
{{< /codeWide >}}

### 9. Integer Output
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

### 10. Conditional Output
{{< codeWide >}}
cmp $3, %esi # compare 3 with esi
jne notequal # Jump to notequal if not equal
{{< /codeWide >}}

[Complete Assembler Source File](file/10.Bedigte_Ausgabe/zahl.s)

[Machine Language File](file/10.Bedigte_Ausgabe/zahl.o)

[Program](file/10.Bedigte_Ausgabe/zahl)

With `cmp` (Compare), things can be compared. With Jumps, one can then jump to the next position.

### 11. Jump Instructions
#### Frequently Used
`jmp` -> Jump

`je`  -> Equal

`jne` -> Not Equal

`jg`  -> Greater

`jge` -> Greater or Equal

`jl`  -> Less

`jle` -> Less or Equal

#### Less Frequently Used
`ja`  -> Above, ignores sign

`jae` -> Above or Equal

`jb`  -> Below

`jbe` -> Below or Equal

`jo`  -> Overflow (overflow from plus to minus)

`jno` -> No Overflow

`jz`  -> Zero

`jnz` -> Not Zero

`js`  -> Signed

`jns` -> Not Signed

### 12. Arithmetic Commands
#### Addition
{{< codeWide >}}
add	$3, %esi # add numbers to register
add	%eax, %esi # add eax to esi
{{< /codeWide >}}

#### Subtraction
`sub	%eax, %esi`
The CPU can't actually subtract, so a small trick is applied.

{{< codeWide >}}
neg	%eax
add	%eax, %esi
{{< /codeWide >}}
The `eax` register is negated and then added to `esi`.

#### Multiplication
The `mul` instruction always multiplies from `eax`. The result is then written back into `eax`. (If too large, also into `edx`)

{{< codeWide >}}
movl	$1, %eax   # 1 in eax
mul 	%esi       # multiplies eax and esi
movl	%eax, %esi # move back
{{< /codeWide >}}

##### Integer Multiplication
Allows multiplying with
`imul	$3, %esi # 3 multiplied by esi`

#### Division
Like multiplication, always calculated with `eax`. The `edx` register is used in the calculation and must be "cleaned" beforehand.

`eax` -> Quotient

`edx` -> Remainder

{{< codeWide >}}
movl 	$0, %edx
div	%esi          # Division %edx:%eax / %esi
movl	%eax, %esi
{{< /codeWide >}}

### 13. Loops
Loop until 5. Compare with `ecx`, until it equals Zero. `ecx` is decreased by one each time.
{{< codeWide >}}
movl 	$5, %ecx

Loop:
	add 	$1, %esi
	loop	Loop
{{< codeWide >}}

#### Further Loop Commands

`loop` -> Loop, is executed until `ecx` = 0, decreases `ecx` by 1

`loope` -> equals (if the Zero Bit was set to Null, meaning the last call resulted in Zero.) (`ecx` must be greater than Zero.)

`loopz` -> same as `loope`

### 14. Logical Operators
`AND` on two registers:

{{< codeWide >}}
movl	$0xFFFF, %esi
movl	$0x0, %ecx
andl	%ecx, %esx # Stored in esx
{{< /codeWide >}}

`orl` -> OR

`xorl` -> XOR

### 15. Shift Commands
Shift left by one:
{{< codeWide >}}
movl 	$1, %esi #000...0001 in %esi
shll	$1, %esi #000...0010 in %esi
{{< /codeWide >}}

`shrl` -> Right (the l for double word.)

### 16. Stack Frames
For procedures that are not called in sequence, stack frames are needed.

{{< codeWide >}}
main:
    ...
    call poc2

proc1:
    ...

proc2:
    call proc1
    ret
{{< codeWide >}}

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

`frame pointer` points to the address to jump back to.

The frame always consists of the 3 items of `variables`, `return address`, and `parameters`.

### 17. GCC Output

{{< codeWide >}}
	.file	"example.c"                                 # Debugger can trace which file it comes from.
	.text                                               # Could contain code.
	.section	.rodata                                 # Read Only Data
.LC0:                                                   #
	.string	"Hello World"                               # Read-only (Must not be modified.)
.LC1:
	.string	" and bye"
	.text
	.globl	main                                        # .globl means the program is called
	.type	main, @function                             # Function main that can be called
main:
.LFB0:                                                  # Local Function Begin (Number)
	.cfi_startproc                                      # Start of a procedure (check that a Frame Pointer exists)
	pushq	%rbp
	.cfi_def_cfa_offset 16                              # Canonical Frame Address Pointer CFA (points to frame before current frame)
	.cfi_offset 6, -16                                  # Frame Pointer
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6                            # CFA = Register Number 6
	leaq	.LC0(%rip), %rdi                            # LC0 loaded and moved to rdi
	movl	$0, %eax
	call	printf@PLT                                  # printf called from procedure linkage table (PLT)
	leaq	.LC1(%rip), %rdi                            # LC1 in rdi
	call	puts@PLT                                    # Put called (because output is already open, from printf)
	movl	$0, %eax
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc                                        # Debugger info
.LFE0:                                                  # Local Function End (Number)
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

  asm("movl %1, %%ebx;"  // Double percent signs to obtain access
      "movl %%ebx, %0 ;"
      : "=r" (output)  // OUTPUT
      : "r" (num)     // INPUT
      :"%ebx"        // USED REGISTERS
     );

  printf("%d\n", output);
  return 0;
}
{{< /codeWide >}}