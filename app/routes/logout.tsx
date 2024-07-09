import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getCookieHeaderAfterDestroyingAuthSession } from "~/sessions/authSessions.server";

export async function action ({request}: ActionFunctionArgs) {
	const cookie_header = await getCookieHeaderAfterDestroyingAuthSession(request)

	return redirect("/", {
		headers: {
			"Set-Cookie": cookie_header
		}
	})
}
