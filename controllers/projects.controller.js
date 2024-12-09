const express = require('express')
const control = express()
const model = require('../models/projects.model')

class projectController {
  async getOneProject(req, res) {
    try {
      const project = await model.getProject(req.params.id)

      res.json(project)
    } catch (e) {
      res.status(404).json({
        error: e.message,
      })
    }
  }
  async getAllProjects(req, res) {
    try {
      const project = await model.getEveryProject()

      res.json({ info: project })
    } catch (e) {
      console.log(e)
      res.status(404).json({
        error: e.message,
      })
    }
  }
}

module.exports = new projectController()
