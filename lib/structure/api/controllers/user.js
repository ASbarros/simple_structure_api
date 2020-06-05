const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(14)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            const userFromDBEmail = await app.db('users')
                .where({
                    email: user.email
                }).first()
            if (!user.id)
                notExistsOrError(userFromDBEmail, 'Email já cadastrado')

        } catch (msg) {
            return res.status(400).send(msg)
        }
        user.pswd = encryptPassword(user.pswd)
        if (user.id) {
            app.db('users')
                .update(user)
                .where({
                    id: user.id
                })
                .then(_ => res.json({ msg: "Atualizado com sucesso" }))
                .catch(err => console.warn(err))
        } else {
            await app.db('users')
                .insert(user)
                .then(_ => res.json({ msg: "Cadastrado com sucesso" }))
                .catch(err => console.warn(err))
            res.json({ msg: "Cadastrado com sucesso" })
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('*')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        const user = await app.db('users')
            .select('*')
            .where({
                id: req.params.id
            })
            .first()
            .catch(err => res.status(500).send(err))
        res.json(user)
    }

    const remove = async (req, res) => {
        const user = await app.db('users')
            .select('*')
            .where({
                id: req.params.id
            })
            .del()
            .catch(err => res.status(500).send(err))
        res.json(user)
    }
    return { save, get, getById, remove }
}