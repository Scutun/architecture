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
                values ('${info.email}', '${hash}', '${info.surname}', '${info.name}') returning email, surname, firstName as name`)

			return user.rows[0]
		} catch (e) {
			throw new Error()
		}
	}
	async logInUser(info) {
		try {
			const data = await db.query(`select * from users where email = '${info.email}'`)

			if (data.rows[0].length === 0) {
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
	async getUserById(token) {
		try {
			const authHeaders = token && token.split(" ")[1]

			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)

			const id = decodedToken.id

			const user = await db.query(`select email, surname, firstName from users where id = '${id}'`)

			if (user.rows[0].length === 0) {
				throw new Error()
			}
			return user.rows[0]
		} catch (e) {
			throw new Error()
		}
	}
	async getuserByOrder(id) {
		try {
			const info = await db.query(`select users_id from orders where id = '${id}'`)

			if (info.rows[0].length === 0) {
				throw new Error()
			}

			const user = await db.query(`select email, surname, firstName from users where id = '${info}'`)

			return user.rows[0]
		} catch (e) {
			throw new Error()
		}
	}
	async userUpdate(token, info) {
		try {
			const authHeaders = token && token.split(" ")[1]

			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)
			const id = decodedToken.id

			const oldInfo = await db.query(`select * from users where id = '${id}'`)

			if (oldInfo.rows[0].length === 0) {
				throw new Error()
			}

			const newInfo = await db.query(
				`update users set surname = '${info.surname}', firstName = '${info.name}' where id = '${id}' returning surname, firstName as name`
			)

			return newInfo.rows[0]
		} catch (e) {
			throw new Error()
		}
	}
	async deletedUser(token) {
		try {
			const authHeaders = token && token.split(" ")[1]

			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)
			const id = decodedToken.id

			const allow = await db.query(`SELECT * FROM users WHERE id = '${id}'`)

			if (allow.rows[0].length === 0) {
				throw new Error()
			}

			await db.query(`delete from users where id = ${id}`)

			return id
		} catch (e) {
			throw new Error()
		}
	}
}

module.exports = new modelUsers()
