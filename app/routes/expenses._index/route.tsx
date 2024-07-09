import { json, LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { getAllExpensesFromDb } from "~/db/dbExpensesQueries.server";
import { getUserIdFromCookie } from "~/sessions/authSessions.server";

export default function Component () {
	const loader_data = useLoaderData<typeof loader>();


	return (
		<div>
			<NavLink to={"/expenses/add"}>Create new expense</NavLink>
			list of all the expenses:

			{loader_data && loader_data.expenses &&

				<ul>
					{loader_data.expenses.map(expense => (
						<li key={expense.expense_id}>{JSON.stringify(expense)}</li>					
						))
					}
				
				</ul>

			}
		</div>
	)
}

export async function loader ({request}: LoaderFunctionArgs) {
	// get user_id from cookie
	const user_id = await getUserIdFromCookie(request);
	// get all the items from the db
	const expenses = await getAllExpensesFromDb({user_id});
	return json({expenses});
}
