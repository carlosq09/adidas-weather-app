const dotenv = require('dotenv')
const { models: { Weather, Location }, mongoose } = require('../database')
const { expect } = require('chai')
const logic = require('.')
const utils = require('../common/utils')

dotenv.config()

const { env: { MONGO_URL_TEST: url } } = process

describe('logic', () => {
    let date, country, city, forecast, avg_temp, avg_weather, avg_wind
    before(async () => {
        mongoose.connect(url, { useNewUrlParser: true })
        await Weather.deleteMany()
        await Location.deleteMany()
    })
    describe('weather', () => {

        beforeEach(async () => {
            date = Date.now()
            city = `barcelona-${Math.random()}`
            country = `spain-${Math.random()}`
            forecast = [{
                time: Date.now(),
                temperature: `25-${Math.random()}`,
                weather: `sunny-${Math.random()}`,
                wind: Math.random()
            }]
            avg_temp = Math.random()
            avg_weather = `windy-${Math.random()}`
            avg_wind = Math.random()
        })

        describe('register weather', () => {
            it('should succeed on correct data', async () => {
                const response = await logic.registerWeather(date, city, country, avg_temp, avg_weather, avg_wind, forecast)

                expect(response).to.be.undefined

                const weatherData = await Weather.find()

                expect(weatherData).to.exist
                expect(weatherData).to.have.lengthOf(1)

                const [weather] = weatherData
                expect(weather.location.city).to.equal(city)
                expect(weather.location.country).to.equal(country)


            })
            it('on correct data should register city if not exists', async () => {
                const response = await logic.registerWeather(date, city, country, avg_temp, avg_weather, avg_wind, forecast)
                expect(response).to.be.undefined

                const locationRegistered = await Location.findOne({ city, country })

                expect(locationRegistered).to.exist
                expect(locationRegistered.city).to.equal(city)
                expect(locationRegistered.country).to.equal(country)

            })

            it('should fail on existing data', async () => {
                await Weather.deleteMany()
                const sameDate = Date.now()
                const registerResponse = await logic.registerWeather(sameDate, city, country, avg_temp, avg_weather, avg_wind, forecast)
                expect(registerResponse).to.be.undefined
                try {
                    await logic.registerWeather(sameDate, city, country, avg_temp, avg_weather, avg_wind, forecast)
                    throw Error('should not reach this point')
                }
                catch (error) {
                    expect(error.message).to.be.equal('Weather Already registered')
                }
            })
            it('should fail on missing data', async () => {
                await Weather.deleteMany()
                try {
                    await logic.registerWeather(date, undefined, country, forecast)
                    throw Error('should not reach this point')
                }
                catch (error) {
                    expect(error.message).to.be.equal('city is not optional')
                }
            })
        })

        describe('retrieve weekly weather', () => {
            let mainDate = Date.now()
            beforeEach(async () => {
                for (let i = 0; i < 7; i++) {
                    date = utils.getNextDayFrom(mainDate, i)
                    city = `barcelona`
                    country = `spain`
                    forecast = [{
                        time: Date.now(),
                        temperature: `25-${Math.random()}`,
                        weather: `sunny-${Math.random()}`,
                        wind: Math.random()
                    }]
                    avg_temp = Math.random()
                    avg_weather = `windy-${Math.random()}`
                    avg_wind = Math.random()

                    await logic.registerWeather(date, city, country, avg_temp, avg_weather, avg_wind, forecast)
                }
            })

            it('should retrieve on matching city', async () => {
                const response = await logic.retrieveWeeklyWeather(mainDate, city, country)

                expect(response).to.have.lengthOf(7)

            })
            it('should return an empty array on not found city', async () => {
                const response = await logic.retrieveWeeklyWeather(mainDate, 'noExisting-city', country)

                expect(response).to.be.empty

            })

            afterEach(async () => await Weather.deleteMany())
        })

        describe('retrieve daily weather', () => {
            beforeEach(async () => {
                await logic.registerWeather(date, city, country, avg_temp, avg_weather, avg_wind, forecast)
            })

            it('should retrieve on matching city', async () => {
                const { location: { city: responseCity, country: responseCountry } } = await logic.retrieveDailyWeatherByDate(date, city, country)

                expect(responseCity).to.equal(city)
                expect(responseCountry).to.equal(country)
            })
            it('should return an empty object on not found city', async () => {
                const response = await logic.retrieveDailyWeatherByDate(date, 'noExisting-city', country)

                expect(response).to.be.null

            })

            afterEach(async () => await Weather.deleteMany())
        })
    })
    describe('cities', () => {
        let city, country
        beforeEach(async () => {
            await Location.deleteMany()
            for (let i = 0; i < 7; i++) {
                city = `barcelona-${Math.random()}}`
                country = `spain-${Math.random()}`

                await Location.create({ city, country })
            }
        })
        it('should retrieve a locations list', async () => {
            const citiesList = await logic.retrieveCityList()

            expect(citiesList).to.have.lengthOf(7)

        })

        it('should retrieve a locations list by matching with query with city', async () => {
            const citiesList = await logic.retrieveCityListByQuery('bar')

            expect(citiesList).to.have.lengthOf(7)

        })

        it('should retrieve a locations list by matching with query with country', async () => {
            const citiesList = await logic.retrieveCityListByQuery('spa')

            expect(citiesList).to.have.lengthOf(7)

        })

        it('should return empty with nonExisting match', async () => {
            const citiesList = await logic.retrieveCityListByQuery('nonExistingPlace')

            expect(citiesList).to.be.empty

        })

    })
    after(async () => mongoose.disconnect(true))
})