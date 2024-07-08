import { open } from "sqlite";
import sqlite3 from 'sqlite3'


export default async function getDb () {
	console.log("getting sqlite3 database...");
	
	const db = await open({
		filename: String(process.env.DB_SQLITE),
		driver: sqlite3.Database
	})

	console.log(process.env.DB_SQLITE);
	

	return db
}

