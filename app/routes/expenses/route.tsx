import { LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, Outlet, redirect, useFetcher } from "@remix-run/react";
import { expensesGuard } from "~/guards/expenses_guard";

export async function loader ({request}: LoaderFunctionArgs) {
	const userId = await expensesGuard(request)

	if (!userId) return redirect("/login")

	return null
}

export default function Component () {
	const fetcher = useFetcher()
	
	return (
		<div>
			<nav>
				<NavLink to={"/"}>LOGO</NavLink>
				<div>
					<NavLink to={"/expenses"} end>Expenses</NavLink>
					<NavLink to={"/expenses/analysis"}>Analysis</NavLink>
				</div>
				<fetcher.Form action="/logout" method="post">
					<button>Logout</button>
				</fetcher.Form>
			</nav>
			<Outlet/>
		</div>
	)

}
