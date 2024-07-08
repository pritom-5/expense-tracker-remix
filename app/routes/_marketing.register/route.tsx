import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { getCookieHeaderWithUserInfo } from "~/sessions/auth_sessions";


export async function action ({request}: ActionFunctionArgs) {
	const cookie_header = await getCookieHeaderWithUserInfo("1")

	return redirect("/expenses", {
		headers: {
			"Set-Cookie": cookie_header	
		}
	})

}

export default function Component () {
	return (
		<div>
			register

			<Form method="post">

				<input type="submit" value={"Register"}/>

			</Form>
		</div>
	)
}
