const bodyParser = require('body-parser')
const cors = require('cors')
const { limitBodyParse } = require('../.env')

module.exports = app => {
    app.use(bodyParser.json({ limit: limitBodyParse }))
    app.use(cors())
}