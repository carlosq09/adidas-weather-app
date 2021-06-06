const mongoose = require('mongoose')
const schemas = require('./schemas')

const { weather } = schemas

module.exports = {
    Weather: mongoose.model('Weather', weather),
}