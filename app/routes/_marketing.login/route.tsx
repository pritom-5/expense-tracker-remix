import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { checkUserValidityAfterLogin } from "~/db/dbUserQueries.server";
import { getCookieHeaderWithUserInfo } from "~/sessions/authSessions.server";

export default function Component () {
	const action_data = useActionData<typeof action>();


	return (
		<div>
			<Form method="post">
				<input type="submit"  value="Login"/>
				{
					action_data && action_data.error &&
					<p>{JSON.stringify(action_data.error)}</p>
				}
			</Form>
		</div>
	)
}







export async function action ({request}: ActionFunctionArgs) {
	// TODO: remove dummy data
	const login_response = await checkUserValidityAfterLogin({email: "user_2", password: "user_2_pass"});

	if (login_response && !!login_response.error || !login_response.userId) {
		return json({error: login_response.error});
	}

	const cookie_header = await getCookieHeaderWithUserInfo(login_response.userId);

	return redirect("/expenses", {
		headers: {
			"Set-Cookie": cookie_header
		}
	})

}
