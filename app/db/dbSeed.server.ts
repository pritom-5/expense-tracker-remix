import getDb from "./getdb.server";

async function createUsersTable() {
	const db = await getDb();

	const create_users_table_raw = 
		`
				CREATE TABLE  "users" (
					"user_id"	INTEGER NOT NULL UNIQUE,
					"username"	TEXT NOT NULL,
					"email"	TEXT NOT NULL UNIQUE,
					"password"	TEXT NOT NULL,
					"created_at"	TEXT DEFAULT current_timestamp,
					"updated_at"	TEXT DEFAULT current_timestamp,
					PRIMARY KEY("user_id" AUTOINCREMENT)
				);
	`

	console.log("trigger - 2");

	try {
		await db.exec(create_users_table_raw);
	} catch (error) {
		console.log(error);
	}

	await db.close();
}
createUsersTable();

async function createUpdateAtTriggerForUsersTable() {
	const db = await getDb();

	const users_table_update_at_trigger = 
		`
			CREATE TRIGGER IF NOT EXISTS update_updated_at AFTER UPDATE ON users
			FOR EACH ROW
			BEGIN
				UPDATE users
				SET updated_at = CURRENT_TIMESTAMP
				WHERE id = OLD.id;
			END;
		`

	console.log("trigger - 1");

	try {
				await db.exec(users_table_update_at_trigger);

	} catch (err) {
		console.log(err);
		
	}
	
	db.close();
}
createUpdateAtTriggerForUsersTable();
