const dotenv = require('dotenv')
const { models: { Weather }, mongoose } = require('../database')
const { expect } = require('chai')
const logic = require('.')
const utils = require('../common/utils')

dotenv.config()

const { env: { MONGO_URL_TEST: url } } = process

describe('logic', () => {
    let type, date, country, city, forecast
    before(async () => {
        mongoose.connect(url, { useNewUrlParser: true })
        await Weather.deleteMany()
    })
    describe('weather', () => {

        beforeEach(async () => {
            date = Date.now(),
                city = `barcelona-${Math.random()}`,
                country = `spain-${Math.random()}`,
                forecast = [{
                    time: Date.now(),
                    temperature: `25-${Math.random()}`,
                    weather: `sunny-${Math.random()}`
                }]

        })

        describe('register weather', () => {
            it('should succeed on correct data', async () => {
                const response = await logic.registerWeather(date, city, country, forecast)

                expect(response).to.be.undefined

                const weatherData = await Weather.find()

                expect(weatherData).to.exist
                expect(weatherData).to.have.lengthOf(1)

                const [weather] = weatherData
                expect(weather.city).to.equal(city)
                expect(weather.country).to.equal(country)

            })

            it('should fail on existing data', async () => {
                await Weather.deleteMany()
                const registerResponse = await logic.registerWeather(date, city, country, forecast)
                expect(registerResponse).to.be.undefined
                try {
                    await logic.registerWeather(date, city, country, forecast)
                    throw Error('should not reach this point')
                }
                catch (error) {
                    expect(error.message).to.be.equal('Weather Already registered')
                }
            })
            it('should fail on missing data', async () => {
                await Weather.deleteMany()
                try {
                    await logic.registerWeather(undefined, city, country, forecast)
                    throw Error('should not reach this point')
                }
                catch (error) {
                    expect(error.message).to.be.equal('date is not optional')
                }
            })
        })

        describe('retrieve weekly weather', () => {
            let mainDate = Date.now()
            beforeEach(async () => {
                for (let i = 0; i < 7; i++) {
                    date = utils.getaDayAgo(mainDate, i),
                        city = 'barcelona',
                        country = `spain-${Math.random()}`,
                        forecast = [{
                            time: utils.getaDayAgo(mainDate, i),
                            temperature: `25-${Math.random()}`,
                            weather: `sunny-${Math.random()}`
                        }]
                    await logic.registerWeather(date, city, country, forecast)
                }
            })

            it('should retrieve on matching city', async () => {
                const response = await logic.retrieveWeeklyWeather(mainDate, city)

                expect(response).to.have.lengthOf(7)

            })
            it('should return an empty array on not found city', async () => {
                const response = await logic.retrieveWeeklyWeather(mainDate, 'noExisting-city')

                expect(response).to.have.lengthOf(0)

            })

            afterEach(async () => await Weather.deleteMany())
        })

        describe('retrieve daily weather', () => {
            it('should retrieve on matching city', async () => {
                const weatherData = await logic.retrieveDailyWeatherByDate(date, city)

                expect(weatherData).to.exist
                expect(weatherData).to.have.lengthOf(1)

                const [weather] = weatherData
                expect(weather.city).to.equal(city)
                expect(weather.country).to.equal(country)
            })
            it('should return an empty object on not found city', async () => {
                const response = await logic.retrieveDailyWeatherByDate(mainDate, 'noExisting-city')

                expect(response).to.be.equal({})

            })

            afterEach(async () => await Weather.deleteMany())
        })
    })

    after(async () => mongoose.disconnect(true))
})