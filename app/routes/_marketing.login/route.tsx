import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { getCookieHeaderWithUserInfo } from "~/sessions/auth_sessions";

export default function Component () {
	return (
		<div>
			<Form method="post">
				<input type="submit"  value="Login"/>
			</Form>
		</div>
	)
}

export async function action ({request}: ActionFunctionArgs) {
	const cookie_header = await getCookieHeaderWithUserInfo("1")

	console.log(cookie_header);
	

	return redirect("/expenses", {
		headers: {
			"Set-Cookie": cookie_header
		}
	})

}
