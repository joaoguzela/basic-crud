// { "users" :[] }
import fs from 'node:fs/promises'
const databasePath = new URL('db.json', import.meta.url)
export class Database {
	#database = {}

	constructor() {
		this.#database = fs
			.readFile(databasePath, 'utf-8')
			.then((data) => (this.#database = JSON.parse(data)))
			.catch(() => this.#persist())
	}
	#persist() {
		fs.writeFile(databasePath, JSON.stringify(this.#database))
	}
	select(table, search) {
		let data = this.#database[table] ?? []
		if (search) {
			data = data.filter((row) => {
				return Object.entries(search).every(([key, value]) => {
					if (!value) {
						return true
					}
					return row[key]
						?.toLowerCase()
						.includes(value.replace('%20', ' ')?.toLowerCase())
				})
			})
		}
		return data
	}
	insert(table, data) {
		if (Array.isArray(this.#database[table])) {
			this.#database[table].push(data)
		} else {
			this.#database[table] = [data]
		}
		this.#persist()
		return data
	}
	delete(table, id) {
		const rowIndex = this.#database[table].findIndex((row) => row.id == id)
		if (rowIndex > -1) {
			const deleted = this.#database[table][rowIndex]
			this.#database[table].splice(rowIndex, 1)
			this.#persist()
			return deleted
		} else {
			throw new Error('Id informado não existe no banco')
		}
	}
	updated(table, data) {
		const rowIndex = this.#database[table].findIndex((row) => row.id == data.id)
		if (rowIndex > -1) {
			this.#database[table][rowIndex] = {
				...this.#database[table][rowIndex],
				...data,
			}
			this.#persist()
			return this.#database[table][rowIndex]
		} else {
			throw new Error('Id informado não existe no banco')
		}
	}
	patch(table, id) {
		const rowIndex = this.#database[table].findIndex((row) => row.id == id)
		if (rowIndex > -1) {
			if (this.#database[table][rowIndex].completed_at === null) {
				this.#database[table][rowIndex].completed_at = new Date()
			} else {
				this.#database[table][rowIndex].completed_at = null
			}
			this.#persist()
			return this.#database[table][rowIndex]
		} else {
			throw new Error('Id informado não existe no banco')
		}
	}
}
