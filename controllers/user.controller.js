const express = require("express")
const control = express()
const model = require("../models/users.model")

class userController {
	async createUser(req, res) {
		try {
			const info = await model.newUser(req.body)
			res.json({ info: info })
		} catch (e) {
			res.sendStatus(400)
		}
	}
	async logUser(req, res) {
		try {
			const allow = await model.logInUser(req.body)
			res.json({ allow: allow })
		} catch (e) {
			res.sendStatus(403)
		}
	}
}

module.exports = new userController()
