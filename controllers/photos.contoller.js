const express = require("express")
const control = express()
const path = require("path")

class PhotoController {
	async getProjectPhoto(req, res) {
		try {
			const imagePath = path.join(__dirname, "..", "project-photo", req.params.photo)

			res.sendFile(imagePath)
		} catch (e) {
			res.status(404).json({
				error: "No project photo with such path",
			})
		}
	}

	async getArchitectPhoto(req, res) {
		try {
			const imagePath = path.join(__dirname, "..", "architect-photo", req.params.photo)

			res.sendFile(imagePath)
		} catch (e) {
			res.status(404).json({
				error: "No photo with such path",
			})
		}
	}
}

module.exports = new PhotoController()
