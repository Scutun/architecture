const express = require("express")
const control = express()
const path = require("path")
const fs = require("fs")

class PhotoController {
	async getProjectPhotoUrl(req, res) {
		try {
			const photoPath = path.join(__dirname, "..", "project-photo", req.params.photo)

			if (!fs.existsSync(photoPath)) {
				return res.status(404).json({
					error: "No project photo with such path",
				})
			}

			const photoUrl = `${req.protocol}://${req.get("host")}/api/projects/static/photo/${req.params.photo}`
			res.json({ photoUrl: photoUrl })
		} catch (e) {
			res.status(500).json({
				error: "Server error while generating file link",
			})
		}
	}

	async getArchitectPhotoUrl(req, res) {
		try {
			const photoPath = path.join(__dirname, "..", "architect-photo", req.params.photo)

			if (!fs.existsSync(photoPath)) {
				return res.status(404).json({
					error: "No project photo with such path",
				})
			}

			const photoUrl = `${req.protocol}://${req.get("host")}/api/architects/static/photo/${req.params.photo}`
			res.json({ photoUrl: photoUrl })
		} catch (e) {
			res.status(500).json({
				error: "Server error while generating file link",
			})
		}
	}
}

module.exports = new PhotoController()
