import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { addNewExpenseToDb } from "~/db/dbExpensesQueries.server";
import { getUserIdFromCookie } from "~/sessions/authSessions.server";

export default function Component () {

	return (
		<div>
			add new expenses

			<Form method="POST">
				<input type="submit" name="create_new_expense" value="Create New Expense"/>
			</Form>

		</div>
	)
}


export async function action ({request}: ActionFunctionArgs) {
	// get data from user form submit
	// TODO: remove dummy date
	const user_id = await getUserIdFromCookie(request);
	const dummy_user_expense = {title: "title_1", amount: 12.10, user_id};

	addNewExpenseToDb(dummy_user_expense);
	
	return redirect("/expenses");
}
