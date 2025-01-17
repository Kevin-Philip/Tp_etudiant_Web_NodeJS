const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users-v1')
const usersModel = require('./model/users')

const app = express()
app.use(helmet())

app.use(bodyParser.json())

// On injecte le model dans le router. Ceci permet de supprimer la dépendance
// directe entre le router et le modele
app.use('/v1/users', usersRouter(usersModel))

/**
 * Listen on provided port, on all network interfaces.
 */
exports.app = app