//mock
import daily from './mock_daily.json'
import helpers from '../helpers'

const api = {
    __url__: 'http://localhost:8080/api/weather',
    retrieveCityListByQuery(query) {
        return fetch(`${this.__url__}/cities?q=${query}`)
            .then(res => res.json())
    },

    retrieveWeeklyWeatherByCity(city, country) {
        return fetch(`${this.__url__}/forecast?city=${city}&country=${country}`)
            .then(res => res.json())
            .then(weeklyWeatherResponse =>
                weeklyWeatherResponse.map(weatherData => {
                    weatherData.date = helpers.formatDays(weatherData.date)

                    weatherData.hourly_forecast = weatherData.hourly_forecast.map(hourlyForecast => {
                        hourlyForecast.time = helpers.formatHours(hourlyForecast.time)

                        return hourlyForecast
                    })

                    return weatherData
                })
            )
    },

}

export default api