// @ts-nocheck
import http from 'node:http'
import { json } from './src/middleware/json.js'
import { csv } from './src/middleware/readCsv.js'
import { routes } from './src/routes.js'
import { extractQueryParams } from './src/extract-query-params.js'
const server = http.createServer(async (req, res) => {
	const { method, url, headers } = req

	const route = routes.find((route) => {
		return route.method === method && route.path.test(url)
	})
	if (route.method == 'POST' && headers['content-type'] === 'text/csv') {
		return await csv(req, res, route)
	} else {
		if (route) {
			await json(req, res)
			const routeParams = req.url?.match(route.path)
			const { query, ...params } = routeParams?.groups
			req.params = params
			req.query = query ? extractQueryParams(query) : {}
			return route?.handler(req, res)
		}
	}

	return res.writeHead(404).end('Not found')
})

server.listen(3003)
