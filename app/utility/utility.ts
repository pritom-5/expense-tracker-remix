export function changeDollerToPence (amount: number) : number {
	return amount * 100
}

export function changePenceToDoller (amount: number) : number {
	return Number((amount / 100).toFixed());
}
