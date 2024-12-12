require("dotenv").config()
const express = require("express")
const control = express()
const db = require("../db")
const jwt = require("jsonwebtoken")

class modelComments {
	async newComment(token, info) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)

			const id = decodedToken.id

			const commentId = await db.query(`insert into comments (description, users_id) 
				values ('${info.description}', '${id}') returning id`)

			const comment = await db.query(`select comments.id, comments.description, users.surname, users.firstName as name from comments
				left join users on comments.users_id = users.id
				where comments.id = '${commentId.rows[0].id}'`)

			return comment.rows[0]
		} catch (e) {
			throw new Error(`Failed to create a comment.`)
		}
	}
	async allComments() {
		try {
			const comments = await db.query(`select comments.id, comments.description, users.surname, users.firstName as name from comments
				left join users on comments.users_id = users.id`)

			if (comments.rows.length === 0) {
				throw new Error("No comments found.")
			}

			return comments.rows
		} catch (e) {
			throw new Error(`Failed to retrieve comments: ${e.message}`)
		}
	}
}

module.exports = new modelComments()
