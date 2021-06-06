const { models: { Weather } } = require('../database')
const utils = require('../common/utils')
const { LogicError } = require('../common/errors')
const validate = require('../common/validate')

const logic = {

    registerWeather(date, city, country, hourly) {
        validate.arguments([
            { name: 'date', value: date, type: 'number', notEmpty: true },
            { name: 'city', value: city, type: 'string', notEmpty: true },
            { name: 'country', value: country, type: 'string', notEmpty: true },
            { name: 'hourly', value: hourly, type: 'object', notEmpty: true },
        ])

        return (async () => {
            const alreadyRegistered = await Weather.findOne({ date })

            if (alreadyRegistered) throw new LogicError('Weather Already registered')

            await Weather.create({ date, city, country, hourly_forecast: hourly })
        })()
    },

    retrieveWeeklyWeather(date, city) {
        validate.arguments([
            { name: 'date', value: date, type: 'number', notEmpty: true },
            { name: 'city', value: city, type: 'string', notEmpty: true }
        ])

        return (async () => {
            return Weather.find(
                {
                    city,
                    date: { $gte: utils.getAWeekAgofromDate(date), $lte: utils.getPlainDay(date) }
                },
            ).limit(7);
        })()
    },

    retrieveDailyWeatherByDate(city, date) {

    }
}
module.exports = logic