require("dotenv").config()
const express = require("express")
const db = require("../db")
const control = express()
const jwt = require("jsonwebtoken")

class modelOrders {
	async newOrder(token, info) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)

			const id = decodedToken.id

			const allow = await db.query(`select count(id) as counter from orders where status_id < 4 and users_id = '${id}'`)

			if (Number(allow.rows[0].counter) !== 0) {
				throw new Error("User has an unfinished order.")
			}

			const newOrder = await db.query(`insert into orders (description, projectType, users_id)
                values ('${info.description}', '${info.project}', '${id}') returning id`)

			return newOrder.rows[0]
		} catch (e) {
			throw new Error(`Failed to create a new order: ${e.message}`)
		}
	}
	async getCurrentOrder(token) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)

			const id = decodedToken.id

			const order = await db.query(
				`select orders.id, projects.name as projectType, orders.description, users.surname,  users.firstName as name, users.email, status.name as status from orders 
                left join projects on orders.projectType = projects.id
                left join users on orders.users_id = users.id
                left join status on orders.status_id = status.id
                where orders.users_id = '${id}' and orders.status_id < 4`
			)

			if (order.rows.length === 0) {
				throw new Error("No active orders.")
			}

			return order.rows[0]
		} catch (e) {
			throw new Error(`Failed to retrieve order by ID: ${e.message}`)
		}
	}
	async getAllOrders(token) {
		try {
			const authHeaders = token && token.split(" ")[1]
			const decodedToken = jwt.verify(authHeaders, process.env.ACCESS_TOKEN_SECRET)

			const id = decodedToken.id

			const order = await db.query(
				`select orders.id, projects.name as projectType, orders.description, users.surname,  users.firstName as name, users.email, status.name as status                from orders 
                left join projects on orders.projectType = projects.id
                left join users on orders.users_id = users.id
                left join status on orders.status_id = status.id
                where orders.users_id = '${id}' and orders.status_id > 3`
			)

			if (order.rows.length === 0) {
				throw new Error("No orders history yet.")
			}

			return order.rows
		} catch (e) {
			throw new Error(`Failed to retrieve orders history: ${e.message}`)
		}
	}
	async updateStatusCanceled(info) {
		try {
			const data = await db.query(`select status_id from orders where id = '${info.id}'`)

			if (data.rows.length === 0 || data.rows[0].status_id > 3) {
				throw new Error("No active orders with such ID.")
			}

			await db.query(`update orders set status_id = 5 where id = '${info.id}'`)

			return info
		} catch (e) {
			throw new Error(`Failed to cancel order: ${e.message}`)
		}
	}
	async updatedOrder(info) {
		try {
			const data = await db.query(`select status_id from orders where id = '${info.id}'`)

			if (data.rows.length === 0 || data.rows[0].status_id > 3) {
				throw new Error("No active orders with such ID.")
			}

			await db.query(`update orders set description = '${info.description}', projectType = '${info.project}' 
                where id = '${info.id}'`)

			const order = await db.query(
				`select orders.id, projects.name as projectType, orders.description, users.surname,  users.firstName as name, users.email, status.name as status                from orders 
                    left join projects on orders.projectType = projects.id
                    left join users on orders.users_id = users.id
                    left join status on orders.status_id = status.id
                    where orders.id = '${info.id}'`
			)

			return order.rows[0]
		} catch (e) {
			throw new Error(`Failed to update order: ${e.message}`)
		}
	}
}

module.exports = new modelOrders()
