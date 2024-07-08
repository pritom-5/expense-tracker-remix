import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { addNewUserToDb } from "~/db/dbQueries.server";
import { getCookieHeaderWithUserInfo } from "~/sessions/authSessions.server";


export async function action ({request}: ActionFunctionArgs) {
	// TODO: remove dummy data from here
	const response = await addNewUserToDb({email: "user_2", password: "user_2_pass", username: "user_2"});

	if (response && !!response.error) {
		return json({error: response.error});
	}

	const cookie_header = await getCookieHeaderWithUserInfo("1")

	return redirect("/expenses", {
		headers: {
			"Set-Cookie": cookie_header	
		}
	})

}

export default function Component () {
	const action_data = useActionData<typeof action>();

	console.log("action_data from register: ", action_data);
	

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
