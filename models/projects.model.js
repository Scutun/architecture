const express = require("express")
const control = express()
const db = require("../db")

class modelProject {
	async getProject(id) {
		try {
			const info = await db.query(`select projects.id, projects.name, projects.description, projectPhotos.photoPath as photo from projects
        left join projectPhotos on projects.id = projectPhotos.projects_id
        where projects.id = '${id}'`)

			if (info.rows.length === 0) {
				throw new Error("No such project found.")
			}

			return info.rows[0]
		} catch (e) {
			throw new Error(`Failed to retrieve project by ID: ${e.message}`)
		}
	}
	async getEveryProject() {
		try {
			const info = await db.query(`select projects.id, projects.name, projects.description, projectPhotos.photoPath as photo from projects
        left join projectPhotos on projects.id = projectPhotos.projects_id`)

			if (info.rows.length === 0) {
				throw new Error("No projects found.")
			}

			return info.rows
		} catch (e) {
			throw new Error(`Failed to retrieve projects: ${e.message}`)
		}
	}
}

module.exports = new modelProject()
