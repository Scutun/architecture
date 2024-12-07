const Router = require("express")
const router = new Router()
const userController = require("../controllers/user.controller")
const checkToken = require("../middleware/checkToken")

router.post("/logIn", userController.logUser)

router.post("/create", userController.createUser)

module.exports = router
