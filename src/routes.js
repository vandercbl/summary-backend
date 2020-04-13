const express = require('express')

const CategoriaController = require('./controllers/CategoriaController')
const TopicoController = require('./controllers/TopicoController')

const routes = express.Router()

routes.get('/categorias', CategoriaController.index)
routes.post('/categorias', CategoriaController.create)
routes.get('/categorias/:id', CategoriaController.find)
routes.put('/categorias/:id/update', CategoriaController.edit)
routes.delete('/categorias/:id', CategoriaController.delete)

routes.get('/topicos', TopicoController.all)
routes.post('/topicos', TopicoController.create)
routes.get('/topicos/:id', TopicoController.find)
routes.put('/topicos/:id/update', TopicoController.edit)
routes.delete('/topicos/:id', TopicoController.delete)

routes.get('/categoria/:id/topicos', TopicoController.viewTopicosCategoria)



module.exports = routes