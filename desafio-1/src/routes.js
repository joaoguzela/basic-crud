import { buildRoutePath } from './build-route-path.js'
import { Services } from './services.js'
const services = new Services()

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			try {
				const users = services.listTask(req)
				return res
					.setHeader('Content-type', 'application/json')
					.end(JSON.stringify(users))
			} catch (error) {
				return res.writeHead(404).end(error.message)
			}
		},
	},
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			try {
				const insert = services.CreateTask(req)
				return res.writeHead(201).end(JSON.stringify(insert))
			} catch (error) {
				return res.writeHead(404).end(error.message)
			}
		},
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			try {
				const deleted = services.deleteTask(req)
				res.writeHead(200).end(JSON.stringify(deleted))
			} catch (error) {
				return res.writeHead(404).end(error.message)
			}
		},
	},
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			try {
				const updated = services.atTask(req)
				res.writeHead(200).end(JSON.stringify(updated))
			} catch (error) {
				return res.writeHead(404).end(error.message)
			}
		},
	},
	{
		method: 'PATCH',
		path: buildRoutePath('/tasks/:id/complete'),
		handler: (req, res) => {
			try {
				const updated = services.patchTask(req)
				res.writeHead(200).end(JSON.stringify(updated))
			} catch (error) {
				return res.writeHead(404).end(error.message)
			}
		},
	},
]
