.text
.data
.global main

main:
	movl	$3, %esi # 4 in esi
	movl	$4, %eax # 4 für Syscall also write
	movl	$1, %ebx # 1 für Output
	cmp		$3, %esi # vergleich 3 mit esi
	jne		notequal # Spring zu notequal wenn ungleich
	movl	$three, %ecx # Text wenn 3, also three
	movl	$1, %edx # länge der Nachricht
	jmp		equal

notequal:
	movl	$unkownnumber, %ecx # Unbekannte Nummer in ecx
	movl	$lenunknown, %edx # Laenge des Testes
	int		$0x80

equal:
	int		$0x80 # Aufruf des Iterrupts
	movl	$0, %ebx 
	movl	$1, %eax # Syscall fürs beenden 
	int		$0x80

one:
	.ascii		"1"
two:
	.ascii		"2"
three:
	.ascii		"3"
four:
	.ascii		"4"
five:
	.ascii		"5"
six:
	.ascii		"6"
seven:
	.ascii		"7"
eight:
	.ascii		"8"
nine:
	.ascii		"9"

unkownnumber:
	.ascii		"Nummer ist nicht 3."
	lenunknown = . - unkownnumber
