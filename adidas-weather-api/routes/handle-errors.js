const { LogicError, ParameterError } = require('../common/errors')

async function handleErrors(callback, res) {
    try {
        await callback()

    } catch (error) {
        let { status = 400, message } = error

        if (error instanceof LogicError) status = 409
        if (error instanceof ParameterError) status = 406

        res.status(status).json({ error: message })

    }
}

module.exports = handleErrors