const db = require('../config/db')

module.exports = {

	async index(request, response) {
		const { busca, pagina = 1, limite = 5 } = request.query
		
		let query = ``,
		filterQuery = ``

		if (busca) {
			filterQuery = `
			WHERE categorias.nome ILIKE '%${busca}%'
			OR categorias.descricao ILIKE '%${busca}%'
			`
		}

		query = `
			SELECT categorias.*
			FROM categorias
			${filterQuery}
			LIMIT ${limite} OFFSET ${(pagina -1) * 5}
		`

		const categorias = await db.query(query)

		response.header('X-Total-Count', categorias.rowCount)

		return response.json(categorias.rows)
	},

	async create(request, response){
		const { nome, descricao } = request.body

		try {
			const result = await db.query(`
			INSERT INTO 
			categorias(nome, descricao)
			VALUES('${nome}', '${descricao}')
			RETURNING id`)
			
			return response.json(result.rows[0])

		} catch (err) {
			console.log(err)
		}
	},

	async delete(request, response){
		const { id } = request.params

		try{
			await db.query(`DELETE FROM categorias WHERE id = ${id}`)
			// o status 204 é que deu sucesso, mas não tem resposta nenhuma para retornar
			return response.status(204).send()
		}catch(err){
			return response.status(500).json({error: `Mensagem de erro ${err}`})
		}


	},

	async find(request, response){
		const { id } = request.params
		const categoria = await db.query(`SELECT * FROM categorias WHERE id = ${id}`)
		return response.json(categoria.rows[0])
	},

	async edit(request, response){
		const { id } = request.params
		const { nome, descricao } = request.body

		const result = await db.query(`
			UPDATE categorias SET
			nome = '${nome}',
			descricao = '${descricao}'
			WHERE id = ${id}
		`)

		if(result.rowCount == 0)
			return response.json({error: `A categoria com o id ${id} não existe`})


		return response.json(id)
	}

}