const Router = require("express")
const router = new Router()
const commentController = require("../controllers/comments.controller")
const checkToken = require("../middleware/checkToken")

router.use("/comments", checkToken)

router.post("/comments/create", commentController.createComment)

router.get("/comments", commentController.getAllComments)

module.exports = router
