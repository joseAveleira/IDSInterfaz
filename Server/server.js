/* jshint node: true */
'use strict'
var express = require('express')
var cors = require('cors')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var authCtrl = require('./auth/auth')
var budgets = require('./controllers/budgets')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(cors())
// configurado para obtener datos en formato JSON
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

io.on('connection', function (socket) {
  socket.on('chatmessage', function (msg) {
    io.emit('chatmessage', msg)
  })
})

app.use(bodyParser.json())

var port = 80
var database = 'mongodb://localhost/Gelo'

mongoose.connect(database, function (err) {
  if (err) {
    console.log(' -' + err)
  } else {
    console.log(' -Conecectado a la base de datos: ' + database + '\n')
  }
})

app.route('/AG/presupuestos')
  .get(budgets.list_all_budgets)
/*  .post(budgets.create_a_budget)

app.route('/AG/presupuestos/:presupuestoId')
  .get(budgets.read_a_budget)
  .put(budgets.update_a_budget)
  .delete(budgets.delete_a_budget) */

app.post('/AG/auth/login', authCtrl.aliasLogin)

app.listen(port, function () {
  console.log('servidor node.js funcionando en el puerto: ' + port)
})
