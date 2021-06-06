const { Schema } = require('mongoose')

const forecast = new Schema({
    time: { type: Date, default: Date.now },
    temperature: { type: String, required: true },
    weather: { type: String, required: true },
    wind: { type: String, required: true },
})

const location = new Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
})

const weather = new Schema({
    date: { type: Date, default: Date.now },
    avg_temp: { type: String, required: true },
    avg_weather: { type: String, required: true },
    avg_wind: { type: String, required: true },
    location,
    hourly_forecast: [forecast],
})


module.exports = { weather, location }