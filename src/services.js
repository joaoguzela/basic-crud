import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
const database = new Database()

const createdTask = {
	id: '',
	title: '',
	description: '',
	completed_at: null,
	created_at: new Date(),
	updated_at: new Date(),
}
const updatedTask = {
	id: '',
	title: '',
	description: '',
	updated_at: new Date(),
}

export class Services {
	listTask(req) {
		const users = database.select('task', { ...req.query })
		return users
	}
	CreateTask(req) {
		const { title, description } = req.body
		const task = Object.assign(createdTask, {})

		const insert = database.insert('task', {
			...task,
			id: randomUUID(),
			title,
			description,
		})
		return insert
	}
	atTask(req) {
		const { title, description } = req.body
		const { id } = req.params
		const task = Object.assign(updatedTask, {})
		if (title && description) {
			const insert = database.updated('task', {
				...task,
				id,
				title,
				description,
			})
			return insert
		} else {
			throw new Error('Titulo ou descrição não foram informadas')
		}
	}
	deleteTask(req) {
		const { id } = req.params
		const deleted = database.delete('task', id)
		return deleted
	}
	patchTask(req) {
		const { id } = req.params
		const insert = database.patch('task', id)
		return insert
	}
}
