import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSingleExpenseFromDb, updateExpenseInfoToDb } from "~/db/dbExpensesQueries.server";
import { TExpense } from "~/db/model.server";
import { getUserIdFromCookie } from "~/sessions/authSessions.server";

export default function Component () {
	const loader_data = useLoaderData<typeof loader>();
	
	return (
		<div>

			here you get one single expense

			expense: 

			{loader_data && loader_data.expense && JSON.stringify(loader_data.expense)}
			
		</div>
	)
}

export async function loader ({request, params}: LoaderFunctionArgs) {
	const expense_id = Number(params.expense_id);
	const user_id = await getUserIdFromCookie(request);
	const expense_from_db = await getSingleExpenseFromDb({expense_id, user_id});


	// get updatedExpense
	const updated_expense: Pick<TExpense,"title" | "amount">= {title: "title_1", amount: 20};
	updateExpenseInfoToDb(updated_expense);



	return json({expense: expense_from_db});
}
