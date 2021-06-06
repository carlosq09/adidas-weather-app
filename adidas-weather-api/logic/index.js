const { models: { Weather, Location } } = require('../database')
const utils = require('../common/utils')
const { LogicError, ParameterError } = require('../common/errors')
const validate = require('../common/validate')

const logic = {

    registerWeather(date = Date.now(), city, country, avg_temp, avg_weather, avg_wind, hourlyForecast) {
        validate.arguments([
            { name: 'city', value: city, type: 'string', notEmpty: true },
            { name: 'country', value: country, type: 'string', notEmpty: true },
            { name: 'avg_temp', value: avg_temp, type: 'number', notEmpty: true },
            { name: 'avg_weather', value: avg_weather, type: 'string', notEmpty: true },
            { name: 'avg_wind', value: avg_wind, type: 'number', notEmpty: true },
            { name: 'hourlyForecast', value: hourlyForecast, type: 'object', notEmpty: true },
        ])

        const parsedDate = new Date(date).getTime()
        if (isNaN(parsedDate)) throw new ParameterError('Date is not in valid format')

        return (async () => {
            const alreadyRegistered = await Weather.findOne({ city, country, date: parsedDate })
            const isLocationRegistered = await Location.findOne({ city, country })

            if (!isLocationRegistered) {
                await Location.create({ city, country })
            }

            if (alreadyRegistered) throw new LogicError('Weather Already registered')

            await Weather.create({ date: parsedDate, avg_temp, avg_weather, avg_wind, location: { city, country }, hourly_forecast: hourlyForecast })
        })()
    },

    retrieveWeeklyWeather(date = Date.now(), city, country) {
        validate.arguments([
            { name: 'country', value: country, type: 'string', notEmpty: true },
            { name: 'city', value: city, type: 'string', notEmpty: true }
        ])

        const parsedDate = new Date(date).getTime()
        if (isNaN(parsedDate)) throw new ParameterError('Date is not in valid format')
        return (async () => Weather.find(
            {
                'location.city': city,
                'location.country': country,
                date: { $gte: utils.getPlainDay(parsedDate), $lte: utils.getAWeekfromDate(parsedDate) }
            }
        ).limit(7))() || {}
    },

    retrieveDailyWeatherByDate(date = Date.now(), city, country) {
        validate.arguments([
            { name: 'city', value: city, type: 'string', notEmpty: true },
            { name: 'country', value: country, type: 'string', notEmpty: true },
        ])

        const parsedDate = new Date(date).getTime()
        if (isNaN(parsedDate)) throw new ParameterError('Date is not in valid format')

        return (async () => Weather.findOne(
            {
                'location.city': city,
                'location.country': country,
                date
            }))() || {}
    },

    async retrieveCityList() {
        return await Location.find()
    },

    retrieveCityListByQuery(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const citiesList = await Location.find()
            let searchArray = query.trim().split(" ");

            let re = new RegExp(searchArray.join("|"), "i");

            return citiesList.filter(location =>
                re.test(location.city) ||
                re.test(location.country)
            );
        })()
    }
}
module.exports = logic