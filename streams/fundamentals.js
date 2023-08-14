//Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
//POST /upload import.csv
// 10mb/s 100s

//100s -> 10s inserir no banco de dados

//10mb/s -> 200

// Readable streams -> leitura
// Writable streams -> escrita

//pipe encanamento
import { Readable, Writable, Transform } from 'node:stream'

class oneToHundredStream extends Readable {
	index = 1
	_read() {
		const i = this.index++
		if (i > 100) {
			this.push(null)
		} else {
			setTimeout(() => {
				const buf = Buffer.from(String(i))
				this.push(buf)
			}, 2000)
		}
	}
}

// new oneToHundredStream().pipe(process.stdout)

class MultiplyByTenStream extends Writable {
	_write(chunck, encoding, callback) {
		console.log(Number(chunck.toString()) * 10)
		callback()
	}
}

class ConvertToNumberNegative extends Transform {
	_transform(chunck, encoding, callback) {
		const transformed = Number(chunck.toString()) * -1
		callback(null, Buffer.from(String(transformed)))
	}
}

new oneToHundredStream()
	.pipe(new ConvertToNumberNegative())
	.pipe(new MultiplyByTenStream())
