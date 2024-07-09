import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { addNewUserToDb } from "~/db/dbUserQueries.server";
import { getCookieHeaderWithUserInfo } from "~/sessions/authSessions.server";


export async function action ({request}: ActionFunctionArgs) {
	// TODO: remove dummy data from here
	const response = await addNewUserToDb({email: "user_2", password: "user_2_pass", username: "user_2"});

	if (response && !!response.error || response.userId === null) {
		return json({error: response.error});
	}

	const cookie_header = await getCookieHeaderWithUserInfo(response.userId)

	return redirect("/expenses", {
		headers: {
			"Set-Cookie": cookie_header	
		}
	})

}

export default function Component () {
	const action_data = useActionData<typeof action>();


	return (
		<div>
			register

			<Form method="post">

				<input type="submit" value={"Register"}/>

				{action_data && action_data?.error && <p>{JSON.stringify(action_data.error)}</p>}

			</Form>
		</div>
	)
}
