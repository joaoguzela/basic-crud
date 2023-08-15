import { parse } from 'csv-parse/sync'
import { Services } from '../services.js'
const file = []
const response = []
const services = new Services()
export async function csv(req, res) {
	for await (const chunk of req) {
		file.push(
			...(await parse(chunk, {
				columns: true,
				skip_empty_lines: true,
			}))
		)
	}

	for await (const colum of file) {
		req.body = colum
		response.push(await services.CreateTask(req))
	}
	res
		.setHeader('Content-type', 'application/json')
		.end(JSON.stringify(response))
}
