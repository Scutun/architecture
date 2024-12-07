const Router = require("express")
const router = new Router()
const userController = require("../controllers/user.controller")
const checkToken = require("../middleware/checkToken")

router.use("/user", checkToken)

router.post("/logIn", userController.logUser)

router.post("/create", userController.createUser)
router.put("/user/update", userController.updateUser)

router.get("/user", userController.getUser)

router.delete("/user/delete", userController.deleteUser)
router.get("/user/find/:id", userController.getUserInOrders)

module.exports = router
