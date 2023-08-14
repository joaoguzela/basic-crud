// @ts-nocheck
import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './extract-query-params.js'

//stateful - stateless
//Tudo que é declarado durante o run do codigo, dados ficam salvos em memoria local - Aplicação salva informações em serviços internos
//Cabeçalhos (req/res) => metadados
//http espaço code

//Query parameters: URL Stateful Enviar informações não sensíveis que ajudam a modificar a resposta do backend
//Route Parameters: URL Identificação de recurso, não deve conter informações sensíveis
//Request Body: Envio de informações de um formulario por exemplo

//http://localhost:3333/users?userId=1 Query
//http://localhost:3333/users/1
const server = http.createServer(async (req, res) => {
	const { method, url } = req

	await json(req, res)

	const route = routes.find((route) => {
		return route.method === method && route.path.test(url)
	})
	if (route) {
		const routeParams = req.url?.match(route.path)
		const { query, ...params } = routeParams?.groups

		req.params = params
		req.query = query ? extractQueryParams(query) : {}
		return route?.handler(req, res)
	}

	return res.writeHead(404).end('Not found')
})

server.listen(3333)
