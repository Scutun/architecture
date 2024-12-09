const Router = require('express')
const router = new Router()
const userController = require('../controllers/users.controller')
const checkToken = require('../middleware/checkToken')

router.post('/users/auth', userController.logUser)

router.post('/users/create', userController.createUser)
router.put('/users/update', checkToken, userController.updateUser)

router.get('/users', checkToken, userController.getUser)

router.delete('/users/delete', checkToken, userController.deleteUser)
router.get('/users/find/:id', checkToken, userController.getUserInOrders)

module.exports = router
