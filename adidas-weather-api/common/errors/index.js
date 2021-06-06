'use strict'

class ConnectionError extends Error {
    constructor(message) {
        super(message)
    }
}

class LogicError extends Error {
    constructor(message) {
        super(message)
    }
}

class ParameterError extends Error {
    constructor(message) {
        super(message)
    }
}

module.exports = {
    ConnectionError,
    ParameterError,
    LogicError
}