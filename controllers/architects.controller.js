const express = require("express")
const control = express()
const model = require("../models/architects.models")

class architectController {
	async getAllArchitects(req, res) {
		try {
			const architects = await model.allArchitects()

			res.json(architects)
		} catch (e) {
			res.status(404).json({
				error: e.message,
			})
		}
	}
}

module.exports = new architectController()
