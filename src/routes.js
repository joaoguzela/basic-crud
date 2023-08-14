import { buildRoutePath } from './build-route-path.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/users'),
		handler: (req, res) => {
			return res
				.setHeader('Content-type', 'application/json')
				.end(JSON.stringify(database.select('users')))
		},
	},
	{
		method: 'POST',
		path: buildRoutePath('/users'),
		handler: (req, res) => {
			const { name, email } = req.body
			const insert = database.insert('users', {
				id: randomUUID(),
				name: name,
				email: email,
			})

			return res.writeHead(201).end(JSON.stringify(insert))
		},
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/users/:id'),
		handler: (req, res) => {
			res.end()
		},
	},
]
