import getDb from "./getdb.server"


async function createUsersTable() {
	const db = await getDb();
	const create_users_table_raw = 
		`
				CREATE TABLE IF NOT EXISTS "users" (
					"user_id"	INTEGER NOT NULL UNIQUE,
					"username"	TEXT NOT NULL,
					"email"	TEXT NOT NULL UNIQUE,
					"password"	TEXT NOT NULL,
					"created_at"	TEXT DEFAULT current_timestamp,
					"updated_at"	TEXT DEFAULT current_timestamp,
					PRIMARY KEY("user_id" AUTOINCREMENT)
				);
	`


	const users_table_update_at_trigger = 
		`
			CREATE TRIGGER IF NOT EXISTS update_updated_at AFTER UPDATE ON users
			FOR EACH ROW
			BEGIN
				UPDATE users
				SET updated_at = CURRENT_TIMESTAMP
				WHERE user_id = OLD.user_id;
			END;
		`


	try {
		await db.exec(create_users_table_raw);
		await db.exec(users_table_update_at_trigger);
	} catch (error) {
		console.log(error);
	}

	await db.close();
}

createUsersTable();





async function createExpensesTable() {
	const db = await getDb();
	const create_expenses_table_raw = 
		`
			CREATE TABLE IF NOT EXISTS expenses (
				expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				amount_in_pence INTEGER NOT NULL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				user_id INTEGER NOT NULL,
				FOREIGN KEY (user_id) REFERENCES users(user_id)
			);
	`


	const expenses_table_update_at_trigger = 
		`
			CREATE TRIGGER IF NOT EXISTS update_expense_updated_at AFTER UPDATE ON expenses
			FOR EACH ROW
			BEGIN
				UPDATE expenses
				SET updated_at = CURRENT_TIMESTAMP
				WHERE expense_id = OLD.expense_id;
			END;
		`


	try {
		await db.exec(create_expenses_table_raw);
		await db.exec(expenses_table_update_at_trigger);
	} catch (error) {
		console.log(error);
	}

	await db.close();
}

createExpensesTable();
