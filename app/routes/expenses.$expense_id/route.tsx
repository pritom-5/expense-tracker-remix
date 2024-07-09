import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { deleteExpenseFromDb, getSingleExpenseFromDb, updateExpenseInfoToDb } from "~/db/dbExpensesQueries.server";
import { TExpense } from "~/db/model.server";
import { getUserIdFromCookie } from "~/sessions/authSessions.server";

export default function Component () {
	const fetcher = useFetcher();
	const loader_data = useLoaderData<typeof loader>();
	
	return (
		<div>

			here you get one single expense

			expense: 

			{loader_data && loader_data.expense && JSON.stringify(loader_data.expense)}


			<fetcher.Form method="POST">
				<button type="submit">Save Updated Expense</button>
			</fetcher.Form>

			
		</div>
	)
}

export async function loader ({request, params}: LoaderFunctionArgs) {
	const expense_id = Number(params.expense_id);
	const user_id = await getUserIdFromCookie(request);

	const expense_from_db = await getSingleExpenseFromDb({expense_id, user_id});

	return json({expense: expense_from_db});
}




export async function action ({request, params}: ActionFunctionArgs) {
	const expense_id = Number(params.expense_id);
	const user_id = await getUserIdFromCookie(request);


	// TODO: get updatedExpense. remove dummy data
	const updated_expense: Pick<TExpense,"title" | "amount" | "user_id" | "expense_id">= {title: "edited title_1", amount: 20, user_id, expense_id};

	switch (request.method) {
		case "POST":
			updateExpenseInfoToDb(updated_expense);
			return redirect("/expenses");

		case "DELETE":
			deleteExpenseFromDb({user_id, expense_id});
			return redirect("/expenses");

		default:
			break;
	}


	return null;

}
