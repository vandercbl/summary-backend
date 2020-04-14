require('dotenv').config()
const { Pool } = require('pg')

module.exports = new Pool({
	user: process.env.DB_USER, //nome do user configurado no postgree
	password: process.env.DB_PASSWORD, // nome configurada no postgree
	host: process.env.DB_HOST, // nome do site/host
	port: process.env.DB_PORT, // porta que foi configurada no postgree
	database: process.env.DB_DATABASE // nome do banco de dados
})