require("dotenv").config()
const express = require("express")
const control = express()
const db = require("../db")

class modelArchitects {
	async allArchitects() {
		try {
			const architects = await db.query(`select id, surname, name, information, photo from architects`)

			if (architects.rows.length === 0) {
				throw new Error("No architects found.")
			}

			return architects.rows
		} catch (e) {
			throw new Error(`Failed to retrieve architects: ${e.message}`)
		}
	}
}

module.exports = new modelArchitects()
