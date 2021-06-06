const { ValueError, ParameterError, FormatError } = require('../errors')

const validate = {
    arguments(args) {
        args.forEach(({ name, value, type, notEmpty, optional }) => {
            if (value != undefined) {
                if (typeof value !== type) throw TypeError(`${name} ${value} is not a ${type}`)

                if (notEmpty)
                    if (type === 'string') {
                        if (!value.trim().length) throw new ValueError(`${name} is empty`)
                    } else if (type === 'object')
                        if (!Object.keys(value).length) throw new ValueError(`${name} is empty`)
            } else if (!optional) throw new ParameterError(`${name} is not optional`)
        })
    }
}

module.exports = validate