const { Pool } = require('pg')

module.exports = new Pool({
	user: 'postgres', //nome do user configurado no postgree
	password: "220888", // nome configurada no postgree
	host: "localhost", // nome do site/host
	port: 5432, // porta que foi configurada no postgree
	database: "summary" // nome do banco de dados
})