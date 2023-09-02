.text
.data
.global main

main:
	movl		$4, %eax
	movl		$1, %ebx
	movl		$msg, %ecx
	movl		$len, %edx
	int 		$0x80

	movl 		$0, %ebx
	movl 		$1, %eax
	int 		$0x80

msg:
	.ascii	"Hello World."
	len = . - msg
