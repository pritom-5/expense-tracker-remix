import { open } from "sqlite";
import sqlite3 from 'sqlite3'
import dotenv from "dotenv"


export default async function getDb () {
	console.log("getting sqlite3 database...");

	dotenv.config()
	
	const db = await open({
		filename: String(process.env.DB_SQLITE),
		driver: sqlite3.Database
	})

	return db
}

