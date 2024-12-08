const express = require("express")
const control = express()
const model = require("../models/users.model")

class userController {
	async createUser(req, res) {
		try {
			const info = await model.newUser(req.body)
			res.json(info)
		} catch (e) {
			res.status(400).json({
				error: e.message,
			})
		}
	}
	async logUser(req, res) {
		try {
			const allow = await model.logInUser(req.body)
			res.json({ token: allow })
		} catch (e) {
			res.status(403).json({
				error: e.message,
			})
		}
	}
	async getUser(req, res) {
		try {
			const info = await model.getUserById(req.headers.authorization)

			res.json(info)
		} catch (e) {
			res.status(404).json({
				error: e.message,
			})
		}
	}
	async getUserInOrders(req, res) {
		try {
			const info = await model.getUserByOrder(req.params.id)

			res.json(info)
		} catch (e) {
			res.status(404).json({
				error: e.message,
			})
		}
	}
	async updateUser(req, res) {
		try {
			const info = await model.userUpdate(req.headers.authorization, req.body)

			res.json(info)
		} catch (e) {
			res.status(400).json({
				error: e.message,
			})
		}
	}
	async deleteUser(req, res) {
		try {
			const info = await model.deletedUser(req.headers.authorization)
			res.json({ id: info })
		} catch (e) {
			res.status(404).json({
				error: e.message,
			})
		}
	}
}

module.exports = new userController()
