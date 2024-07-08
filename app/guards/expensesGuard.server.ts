import { getUserIdFromCookie } from "~/sessions/authSessions.server";

export async function expensesGuard (request: Request) {
	try {
		const userId = await getUserIdFromCookie(request);

		console.log("userId from guard: ", userId );
		

		return userId

	} catch (err) {
		throw new Error("something wrong with user authentication")
	}
}
