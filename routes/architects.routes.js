const Router = require("express")
const router = new Router()
const architectController = require("../controllers/architects.controller")
const checkToken = require("../middleware/checkToken")

router.get("/architects", architectController.getAllArchitects)

module.exports = router
