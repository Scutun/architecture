const Router = require("express")
const router = new Router()
const commentController = require("../controllers/comments.controller")
const checkToken = require("../middleware/checkToken")

router.post("/comments/create", checkToken, commentController.createComment)

router.get("/comments", commentController.getAllComments)

module.exports = router
