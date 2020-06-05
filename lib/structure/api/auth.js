const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const signin = async (req, res) => {
        if (!req.body.email || !req.body.pswd) {
            return res.status(400).send({ msg: 'Informe usuario e senha!' })
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()
            .catch(err => console.log(err))

        if (!user) return res.status(400).send({ msg: 'Usuario nao encontrado' })

        const isMatch = bcrypt.compareSync(req.body.pswd, user.pswd)
        if (!isMatch) return res.status(401).send({ msg: 'Email/Senha invalidos!' })


        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            managerAcademy: user.managerAcademy,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24)
        }

        res.status(200).send({
            ...payload,
            token: jwt.encode(payload, authSecret),
            msg: "Logado com sucesso."
        })

    }
    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // problema no token...
        }
        res.send(false)
    }
    return { signin, validateToken }
}