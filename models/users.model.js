require("dotenv").config()
const express = require("express")
const control = express()
const db = require("../db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class modelUsers {
	async newUser(info) {
		try {
			const check = await db.query(`select * from users where email = $1`, [info.email])

			if (check.rows.length !== 0) {
				throw new Error("User with this email already exists.")
			}

			const hash = bcrypt.hashSync(info.password, bcrypt.genSaltSync(10))

			const user = await db.query(
				`insert into users (email, password, surname, firstName) 
				values ($1, $2, $3, $4) 
				returning email, surname, firstName as name`,
				[info.email, hash, info.surname, info.name]
			)

			return user.rows[0]
		} catch (e) {
			throw new Error(`Failed to create a new user: ${e.message}`)
		}
	}

	async logInUser(info) {
		try {
			const data = await db.query(`select * from users where email = $1`, [info.email])

			if (data.rows.length === 0) {
				throw new Error("No such user found.")
			}
			if (!bcrypt.compareSync(info.password, data.rows[0].password)) {
				throw new Error("Invalid password.")
			}

			const token = jwt.sign({ id: data.rows[0].id }, process.env.ACCESS_TOKEN_SECRET)
			return token
		} catch (e) {
			throw new Error(`Login failed: ${e.message}`)
		}
	}

	async getUserById(token) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)

			const id = decodedToken.id
			const user = await db.query(`select email, surname, firstName as name from users where id = '${id}'`)

			if (user.rows.length === 0) {
				throw new Error("User not found.")
			}

			return user.rows[0]
		} catch (e) {
			throw new Error(`Failed to retrieve user by ID: ${e.message}`)
		}
	}

	async getShortUserById(token) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)

			const id = decodedToken.id
			const user = await db.query(`SELECT email, surname, firstName FROM users WHERE id = '${id}'`)

			if (user.rows.length === 0) {
				throw new Error("User not found.")
			}

			const { email } = user.rows[0]
			const shortenName = `${user.rows[0].surname} ${user.rows[0].firstname[0]}.`

			return { email, name: shortenName }
		} catch (e) {
			throw new Error(`Failed to retrieve user by ID: ${e.message}`)
		}
	}

	async getUserByOrder(id) {
		try {
			const info = await db.query(`select users_id from orders where id = $1`, [id])

			if (info.rows.length === 0) {
				throw new Error("Order not found.")
			}

			const user = await db.query(`select email, surname, firstName as name from users where id = '${info.rows[0].users_id}'`)

			return user.rows[0]
		} catch (e) {
			throw new Error(`Failed to retrieve user by order: ${e.message}`)
		}
	}

	async userUpdate(token, info) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)
			const id = decodedToken.id

			const oldInfo = await db.query(`select * from users where id = $1`, [id])

			if (oldInfo.rows.length === 0) {
				throw new Error("User not found.")
			}

			const newInfo = await db.query(
				`update users set surname = $1, firstName = $2 
				where id = $3 returning surname, firstName as name`,
				[info.surname, info.name, id]
			)

			return newInfo.rows[0]
		} catch (e) {
			throw new Error(`Failed to update user information: ${e.message}`)
		}
	}

	async deletedUser(token) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)
			const id = decodedToken.id

			const allow = await db.query(`SELECT * FROM users WHERE id = '${id}'`)

			if (allow.rows.length === 0) {
				throw new Error("User not found.")
			}

			await db.query(`update orders set status_id = 5`)
			await db.query(`update orders set users_id = NULL`)
			await db.query(`delete from users where id = ${id}`)
			return id
		} catch (e) {
			throw new Error(`Failed to delete user: ${e.message}`)
		}
	}
}

module.exports = new modelUsers()
