const express = require("express")
const control = express()
const model = require("../models/users.model")

class userController {
	async createUser(req, res) {
		try {
			const info = await model.newUser(req.body)
			res.json(info)
		} catch (e) {
			res.sendStatus(400)
		}
	}
	async logUser(req, res) {
		try {
			const allow = await model.logInUser(req.body)
			res.json({ token: allow })
		} catch (e) {
			res.sendStatus(403)
		}
	}
	async getUser(req, res) {
		try {
			const info = await model.getUserById(req.headers.authorization)

			res.json(info)
		} catch (e) {
			res.sendStatus(404)
		}
	}
	async getUserInOrders(req, res) {
		try {
			const info = await model.getuserByOrder(req.params.id)

			res.json(info)
		} catch (e) {
			res.sendStatus(404)
		}
	}
	async updateUser(req, res) {
		try {
			const info = await model.userUpdate(req.headers.authorization, req.body)

			res.json(info)
		} catch (e) {
			res.sendStatus(400)
		}
	}
	async deleteUser(req, res) {
		try {
			const info = await model.deletedUser(req.headers.authorization)
			res.json({ id: info })
		} catch (e) {
			res.sendStatus(404)
		}
	}
}

module.exports = new userController()
