import { redirect } from "@remix-run/react";
import { getUserIdFromCookie } from "~/sessions/auth_sessions";

export async function expensesGuard (request: Request) {
	try {
		const userId = await getUserIdFromCookie(request);

		console.log(userId);

		return userId
	} catch (err) {
		throw new Error("something wrong with user authentication")
	}
}
