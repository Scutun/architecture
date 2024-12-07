const Router = require("express")
const router = new Router()
const userController = require("../controllers/user.controller")
const checkToken = require("../middleware/checkToken")

module.exports = router
