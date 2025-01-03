const express = require("express")
const control = express()
const db = require("../db")

class modelProject {
	async getProject(id) {
		try {
			const info = await db.query(
				`select projects.id, projects.name, projects.description, projectPhotos.photoPath as photo from projects
        left join projectPhotos on projects.id = projectPhotos.projects_id
        where projects.id = $1`,
				[id]
			)

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
			const info = await db.query(`select id, name, description from projects`)

			if (info.rows.length === 0) {
				throw new Error("No projects found.")
			}

			const newArray = await Promise.all(
				info.rows.map(async (el) => {
					const photo = (await db.query(`select photoPath as photo from projectPhotos where projects_id = '${el.id}'`)).rows.map((el) => el.photo)
					el.photo = photo
					return el
				})
			)

			return newArray
		} catch (e) {
			throw new Error(`Failed to retrieve projects: ${e.message}`)
		}
	}
}

module.exports = new modelProject()
