const Router = require("express")
const router = new Router()
const orderController = require("../controllers/orders.controller")
const checkToken = require("../middleware/checkToken")

router.use("/orders", checkToken)

router.post("/orders/create", orderController.createOrder)

router.get("/orders", orderController.getOneOrder)
router.get("/orders/all", orderController.getOrders)

router.put("/orders/update", orderController.updateOrder)
router.put("/orders/cancel", orderController.updateStatusCancel)

module.exports = router
