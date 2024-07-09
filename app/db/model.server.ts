export type TUser = {
	user_id: number, 
	username: string,
	email: string,
	password: string,
	created_at: string,
	updated_at: string
}

export type TExpense = {
	expense_id: number,
	title: string,
	amount: number,
	created_at: string,
	updated_at: string
	user_id: number
}
