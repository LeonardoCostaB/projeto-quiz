//Arquivos por onde passa todas as minhas rotas

const express = require('express')
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')

const route = express.Router()

route.get('/', (req, res) => {
  res.render('index', {page: 'enter-room'})
})

route.get('/create-pass', (req, res) => {
  res.render('index', {page: 'create-pass'})
})

//Rota quando eu criar uma sala
route.post('/create-room/', roomController.create)
//Rota de inicialização da página
route.get('/room/:room', roomController.open)

//Caminho através do número da minha sala 
route.post('/enterroom', roomController.enter)

//Caminho das perguntas feitas
route.post('/question/create/:room', questionController.create)
//caminho para quando salvar ou excluir na modal
route.post('/question/:room/:question/:action/', questionController.index)


//Exportação para o meu servidor *server.js*
module.exports = route