import { changeDollerToPence } from "~/utility/utility";
import getDb from "./getdb.server";
import { TExpense } from "./model.server";

export async function addNewExpenseToDb(expense_info: Pick<TExpense, "title"| "amount" | "user_id">) {
	const db = await getDb();

	const amount_in_pence = changeDollerToPence(expense_info.amount);

	const add_new_expense_query = `
		INSERT INTO expenses (title, amount_in_pence, user_id) VALUES (?, ?, ?)
	`

	const stmt = await db.prepare(add_new_expense_query);

	try {
		await stmt.run(expense_info.title, amount_in_pence, expense_info.user_id);

		await stmt.finalize();
		await db.close();

	} catch (err) {
		throw new Error ("Couldn't connect to db. Try again");
	}
}




export async function getAllExpensesFromDb(expense_info: Pick<TExpense, "user_id">) : Promise<TExpense[]> {
	const db = await getDb();

	const get_all_expenses_query = `
		SELECT * FROM expenses WHERE user_id=?
	`

	const stmt = await db.prepare(get_all_expenses_query);

	try {
		const all_expenses = await stmt.all(expense_info.user_id);


		console.log("all_expenses query page: ", all_expenses);
		

		await stmt.finalize();
		await db.close();


		return all_expenses

	} catch (err) {
		throw new Error ("Couldn't connect to db. Try again");
	}

}




export async function getSingleExpenseFromDb(expense_info: Pick<TExpense, "expense_id" | "user_id">) : Promise<TExpense>  {
	const db = await getDb();

	const get_single_expense_query = `
		SELECT * FROM expenses WHERE user_id=? AND expense_id=?
	`

	const stmt = await db.prepare(get_single_expense_query);

	try {
		const single_expense = await stmt.get(expense_info.user_id, expense_info.expense_id);


		console.log("single_expense query page: ", single_expense);
		

		await stmt.finalize();
		await db.close();


		return single_expense

	} catch (err) {
		throw new Error ("Couldn't connect to db. Try again");
	}
}



type TUpdateExpenseResponse = {
	error: string,
}

export async function updateExpenseInfoToDb (updated_expense_info: Pick<TExpense, "title" | "amount">) {
	const db = await getDb();

	const update_single_expense_query = `
				UPDATE expenses SET title=?, amount_in_pence=? WHERE expense_id=? AND user_id=?;
		`

	const stmt = await db.prepare(update_single_expense_query);

	const amount_in_pence =  changeDollerToPence(updated_expense_info.amount)

	try {
		// TODO: check if expense exists
		const response_from_db = await stmt.run(updated_expense_info.title, amount_in_pence);


		console.log("response_from_db query page: ", response_from_db);
		

		await stmt.finalize();
		await db.close();

	} catch (err) {
		throw new Error ("Couldn't connect to db. Try again");
	}
	
}














