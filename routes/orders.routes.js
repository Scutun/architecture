const Router = require("express")
const router = new Router()
const orderController = require("../controllers/user.controller")
const checkToken = require("../middleware/checkToken")

module.exports = router
