const Router = require("express")
const router = new Router()
const photoController = require("../controllers/photos.contoller")

router.get("/projects/photos/:photo", photoController.getProjectPhoto)

router.get("/architects/photos/:photo", photoController.getArchitectPhoto)

module.exports = router
