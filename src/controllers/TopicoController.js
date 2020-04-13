const db = require('../config/db')

module.exports = {

	async all(request, response){
		const { busca, pagina = 1, limite = 1} = request.query

		let query = ``,
			filterquery = ``
		
		if (busca) {
			filterquery=`
			WHERE topicos.titulo ILIKE '%${busca}%'
			OR topicos.descricao ILIKE '%${busca}%'
			`
		}

		query = `
			SELECT topicos.*, categorias.nome AS categoria_nome
			FROM topicos
			LEFT JOIN categorias ON (topicos.categoria_id = categorias.id)
			${filterquery}
			LIMIT ${limite} OFFSET ${(pagina - 1) * 5}
		`

		const topicos = await db.query(query)

		response.header('X-Total-Count', topicos.rowCount)

		return response.json(topicos.rows)
	},

	async create(request, response) {
		const { categoria_id, titulo, descricao, exemplo, aplicacao_code, videos, data_criacao } = request.body

		const result = await db.query(`
			INSERT INTO topicos (
				categoria_id,
				titulo,
				descricao,
				exemplo,
				aplicacao_code,
				videos,
				data_criacao
			) VALUES (
				${categoria_id},
				'${titulo}',
				'${descricao}',
				'${exemplo}',
				'${aplicacao_code}',
				'${videos}',
				'${data_criacao}'
			) RETURNING id
		`)

		return response.json(result.rows[0])
	},

	async find(request, response){
		const { id } = request.params
		const topico = await db.query(`
			SELECT topicos.*, categorias.nome AS categoria_nome
			FROM topicos
			LEFT JOIN categorias ON (topicos.categoria_id = categorias.id)
			WHERE topicos.id = ${id}`
		)
		return response.json(topico.rows[0])
	},

	async edit(request, response){
		const { id } = request.params
		const { categoria_id, titulo, descricao, exemplo, aplicacao_code, videos} = request.body

		await db.query(`
			UPDATE topicos SET
			categoria_id = ${categoria_id},
			titulo = '${titulo}',
			descricao = '${descricao}',
			exemplo = '${exemplo}',
			aplicacao_code = '${aplicacao_code}',
			videos = '${videos}'
			WHERE id = ${id}
		`)

		return response.json({id})
	},

	async delete(request, response){

		const { id } = request.params

		await db.query(`DELETE FROM topicos WHERE id = ${id}`)

		// o status 204 é que deu sucesso, mas não tem resposta nenhuma para retornar
		return response.status(204).send()

	},

	async viewTopicosCategoria(request, response){

		const { id } = request.params

		const results = await db.query(`
			SELECT topicos.*, categorias.nome AS categoria_nome
			FROM topicos
			LEFT JOIN categorias ON (topicos.categoria_id = categorias.id)
			WHERE topicos.categoria_id = ${id}
		`)

		if(results.rows < 1)
			return response.json({info: "Não existe tópicos para essa categoria"})

		return response.json(results.rows)
		
	}

}