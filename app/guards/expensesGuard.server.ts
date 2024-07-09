import { getUserIdFromCookie } from "~/sessions/authSessions.server";

export async function expensesGuard (request: Request) {
	try {
		const userId = await getUserIdFromCookie(request);

		return userId

	} catch (err) {
		throw new Error("something wrong with user authentication")
	}
}
