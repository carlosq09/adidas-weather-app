const mongoose = require('mongoose')
const schemas = require('./schemas')

const { weather, location } = schemas

module.exports = {
    Weather: mongoose.model('Weather', weather),
    Location: mongoose.model('Location', location),
}