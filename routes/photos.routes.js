const Router = require("express")
const router = new Router()
const photoController = require("../controllers/photos.contoller")

router.get("/projects/photos/url/:photo", photoController.getProjectPhotoUrl)

router.get("/architects/photos/url/:photo", photoController.getArchitectPhotoUrl)

module.exports = router
