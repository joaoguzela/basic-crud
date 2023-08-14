import { buildRoutePath } from './build-route-path.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/users'),
		handler: (req, res) => {
			const { search } = req.query
			const users = database.select(
				'users',
				search
					? {
							name: search,
							email: search,
					  }
					: null
			)
			return res
				.setHeader('Content-type', 'application/json')
				.end(JSON.stringify(users))
		},
	},
	{
		method: 'POST',
		path: buildRoutePath('/users'),
		handler: (req, res) => {
			const { name, email } = req.body
			const insert = database.insert('users', {
				id: randomUUID(),
				name,
				email,
			})

			return res.writeHead(201).end(JSON.stringify(insert))
		},
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/users/:id'),
		handler: (req, res) => {
			const { id } = req.params
			const deleted = database.delete('users', id)
			res.writeHead(200).end(JSON.stringify(deleted))
		},
	},
	{
		method: 'PUT',
		path: buildRoutePath('/users/:id'),
		handler: (req, res) => {
			const { id } = req.params
			const { name, email } = req.body
			const insert = database.updated('users', id, {
				name,
				email,
			})

			res.writeHead(200).end(JSON.stringify(insert))
		},
	},
]
