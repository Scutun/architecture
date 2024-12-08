const express = require("express")
const control = express()
const model = require("../models/orders.model")

class userController {
	async createOrder(req, res) {
		try {
			const info = await model.newOrder(req.headers.authorisation, req.body)
			res.json(info)
		} catch (e) {
			res.status(400).json({
				error: e.message,
			})
		}
	}
	async getOneOrder(req, res) {
		try {
			const order = await model.getCurrentOrder(req.headers.authorisation)
			res.json(order)
		} catch (e) {
			res.status(404).json({
				error: e.message,
			})
		}
	}
	async getOrder(req, res) {
		try {
			const orders = await model.getAllOrders(req.headers.authorisation)
			res.json(orders)
		} catch (e) {
			res.status(404).json({
				error: e.message,
			})
		}
	}
	async updateStatusCancel(req, res) {
		try {
			const order = await model.updateStatusCanceled(req.body)
			res.json(order)
		} catch (e) {
			res.status(400).json({
				error: e.message,
			})
		}
	}
	async updateOrder(req, res) {
		try {
			const order = await model.updatedOrder(req.body)
			res.json(order)
		} catch (e) {
			res.status(400).json({
				error: e.message,
			})
		}
	}
}

module.exports = new userController()
