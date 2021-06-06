const logic = require('../logic')
const handleErrors = require('./handle-errors')
const express = require('express')

const router = express.Router()

router.post('/users', (req, res) => {
    const { body: { name, surname, username, email, password } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, username, email, password)
        return res.status(201).json({ message: 'Ok, user registered.' })
    },
        res)
})

module.exports = router