const Router = require('express')
const router = new Router()
const projectController = require('../controllers/projects.controller')

router.get('/projects/all', projectController.getAllProjects)

router.get('/projects/find/:id', projectController.getOneProject)

module.exports = router
