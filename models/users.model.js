require("dotenv").config()
const express = require("express")
const control = express()
const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class modelUsers {
	async newUser(info) {
		try {
			const hash = bcrypt.hashSync(info.password, bcrypt.genSaltSync(10))

			const user = await db.query(`insert into users (email, password, surname, firstName) 
                values ('${info.email}', '${hash}', '${info.surname}', '${info.name}') returning email, surname, firstName`)

			return user.rows[0]
		} catch (e) {
			throw new Error()
		}
	}
	async logInUser(info) {
		try {
			const data = await db.query(`select * from users where email = '${info.email}'`)

			if (data.rows[0].longth === 0) {
				throw new Error()
			}
			if (!bcrypt.compareSync(info.password, data.rows[0].password)) {
				throw new Error()
			}
			const token = jwt.sign({ id: data.rows[0].id }, process.env.ACCESS_TOKEN_SECRET)
			return token
		} catch (e) {
			throw new Error()
		}
	}
}

module.exports = new modelUsers()
