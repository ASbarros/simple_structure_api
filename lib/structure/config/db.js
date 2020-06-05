const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate
    .latest([config])
    .catch(err => console.log('erro ao conectar ao banco de dados:', err))

module.exports = knex