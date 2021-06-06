import React from 'react'
import { TiWeatherCloudy, TiWeatherSunny, TiWeatherDownpour, TiWeatherPartlySunny, TiWeatherWindy } from 'react-icons/ti'
//Styles
import './index.scss'

const WeatherList = ({ forecastList, displayHourlyForecast, displayInMainIndicator, iconSise = 60 }) => {
    return (
        <ul className="weatherApp-list">
            {forecastList && forecastList.map((forecast) => {
                return (
                    <li className="weatherApp-list__item" onClick={() => {
                        if (forecast.hourly_forecast) {
                            displayHourlyForecast(forecast)
                        }
                        displayInMainIndicator(forecast)
                    }} >
                        <header className="weatherApp-list__head">
                            <div className="weatherApp-list__item-time">{forecast.date || forecast.time}</div>
                        </header>
                        <div className="weatherApp-list__main">
                            <div className="weatherApp-list__item-weather">
                                {(() => {
                                    switch (forecast.avg_weather || forecast.weather) {
                                        case 'sunny':
                                            return <TiWeatherSunny size={iconSise} />
                                        case 'windy':
                                            return <TiWeatherWindy size={iconSise} />
                                        case 'partly-cloudy':
                                            return <TiWeatherPartlySunny size={iconSise} />
                                        case 'rainy':
                                            return <TiWeatherDownpour size={iconSise} />
                                        default: return <TiWeatherSunny size={iconSise} />
                                    }
                                })()}
                            </div>
                            <div className="weatherApp-list__item-temperature">{forecast.avg_temp || forecast.temperature}°</div>
                            <TiWeatherWindy size={iconSise} />
                            <div className="weatherApp-list__item-wind">{forecast.avg_wind || forecast.wind}m/s</div>
                        </div>
                    </li>)
            })}
        </ul>
    );
}

export default WeatherList