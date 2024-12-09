const express = require("express")
const control = express()
const model = require("../models/comments.models")

class commentController {
	async createComment(req, res) {
		try {
			const info = await model.newComment(req.headers.authorization, req.body)

			res.json(info)
		} catch (e) {
			res.status(400).json({
				error: e.message,
			})
		}
	}
	async getAllComments(req, res) {
		try {
			const info = await model.allComments()
			res.json(info)
		} catch (e) {
			res.status(404).json({
				error: e.message,
			})
		}
	}
}

module.exports = new commentController()
