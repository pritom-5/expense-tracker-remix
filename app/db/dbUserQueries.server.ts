import getDb from "./getdb.server";
import { TUser } from "./model.server";

export async function isUserAlreadyExists(userInfo: Pick<TUser, "email">): Promise<boolean> {
	const db = await getDb();

	const db_query = `SELECT * FROM users WHERE email=?`
	const stmt = await db.prepare(db_query);

	try {

		const db_response = await stmt.get(userInfo.email);

		await stmt.finalize();
		await db.close();

		return !!db_response;
		
	} catch (err) {
		throw new Error("Problem varifying user from db");
	}
}





export type TRegisterFormError = {
	username?: string,
	email?: string,
	password?: string, 
}

export type TAddNewUserResponse = {
	userId: number | null,
	error: TRegisterFormError | null
}

export async function addNewUserToDb(userInfo: Pick<TUser, "username" | "email"| "password">) : Promise<TAddNewUserResponse> {
	const is_user_exists = await isUserAlreadyExists({email: userInfo.email});

	if (is_user_exists) {
		const user_exists_error: TRegisterFormError = {email: "User already exists. login."} 
		return {userId: null, error: user_exists_error}
	}


	const db = await getDb();

	const add_new_user_query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`
	const stmt = await db.prepare(add_new_user_query);

	try {
		const db_response = await stmt.run(userInfo.email, userInfo.username, userInfo.password);

		await stmt.finalize();
		await db.close();

		const response_user_id = Number(db_response.lastID)

		return {userId: response_user_id, error: null};

	} catch (err) {
		throw new Error ("Couldn't connect to db. Try again");
	}
}







export type TLoginFormError = Pick<TRegisterFormError, "email" | "password">
export type TCheckUserValidityAfterLogin = {
	userId: number | null,
	error: TLoginFormError | null
}


export async function checkUserValidityAfterLogin (userInfo: Pick<TUser, "email"| "password">) : Promise<TCheckUserValidityAfterLogin>  {
	// get user info from db using email
	const db_query_get_user_info_with_email = `SELECT * FROM users WHERE email=?`;
	const db = await getDb();


	try {
		const stmt = await db.prepare(db_query_get_user_info_with_email);
		const db_response = await stmt.get(userInfo.email);

		if (!db_response) {
			const user_not_found_error: TLoginFormError = {email: "email not valid", password: "enter valid password"}; 
			return {userId: null, error: user_not_found_error};
		}


		// check passowrd and send some error
		if (db_response.password !== userInfo.password) {
			const user_not_found_error: TLoginFormError = {password: "enter valid password"}; 
			return {userId: null, error: user_not_found_error};
		}
		

		await stmt.finalize();
		await db.close();

		return {userId: db_response.user_id, error: null}
		
	} catch (error) {
		throw new Error ("Error connecting to the db. Try again.")
		
	}

}














