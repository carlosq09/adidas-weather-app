const logic = require('../logic')
const handleErrors = require('./handle-errors')
const express = require('express')

const router = express.Router()

router.post('/weather', (req, res) => {
    const { body: { date, city, country, avg_temp, avg_weather, avg_wind, forecast } } = req

    handleErrors(async () => {
        await logic.registerWeather(date, city, country, avg_temp, avg_weather, avg_wind, forecast)
        return res.status(201).json({ message: `Added a Weather register for ${city},${country} at ${date}` })
    }, res)
})

router.get('/weather/forecast', (req, res) => {
    const { query: { city, country, date } } = req
    
    handleErrors(async () => {
        const weeklyWeather = await logic.retrieveWeeklyWeather(date, city, country)
        return res.status(200).json(weeklyWeather)
    }, res)
})

router.get('/weather/cities', (req, res) => {
    const { query: { q: query } } = req
    handleErrors(async () => {
        const citiesByQuery = query ? await logic.retrieveCityListByQuery(query) : await logic.retrieveCityList()
        return res.status(200).json(citiesByQuery)
    }, res)
})

module.exports = router