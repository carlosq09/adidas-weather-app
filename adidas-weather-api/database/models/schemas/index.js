const { Schema } = require('mongoose')

const forecast = new Schema({
    time: { type: Date, default: Date.now },
    temperature: { type: String, required: true },
    weather: { type: String, required: true },
})

const weather = new Schema({
    date: { type: Date, default: Date.now },
    city: { type: String, required: true },
    country: { type: String, required: true },
    hourly_forecast: [forecast],
})


module.exports = { weather }