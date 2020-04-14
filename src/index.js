const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()

app.use(cors()) // dessa forma qualquer um pode acessar a aplicação, mas quando para for para o ar eu posso configurar o domínio que poderá acessar sem problemas
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333)
// o heroku cria essa variável de ambiente automaticamente.
//Se eu estiver no ambiente local, vai utilizar a porta 3333