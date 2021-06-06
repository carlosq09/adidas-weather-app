import React from 'react'
import { TiWeatherCloudy, TiWeatherSunny, TiWeatherDownpour, TiWeatherPartlySunny, TiWeatherWindy } from 'react-icons/ti'
//Styles
import './index.scss'

const MainIndicator = ({ forecast, location }) => {
    return <div>
        {
            forecast && location && <div className="mainIndicator">
                <div className="mainIndicator-temperature">{forecast.avg_temp || forecast.temperature}°</div>
                <div className="mainIndicator__weatherType">
                    {(() => {
                        switch (forecast.avg_weather) {
                            case 'sunny':
                                return <TiWeatherSunny size={200} color="lightgray" />
                            case 'windy':
                                return <TiWeatherWindy />
                            case 'partly-cloudy':
                                return <TiWeatherPartlySunny />
                            case 'rainy':
                                return <TiWeatherDownpour />
                            default: return <TiWeatherSunny />
                        }
                    })()}
                </div>
                <div className="mainIndicator__data">
                    <div className="mainIndicator-time">{forecast.date || forecast.time}</div>
                    <div className="mainIndicator-location">
                        <div className="mainIndicator-city">{location.city}</div>
                        <div className="mainIndicator-country">{location.country}</div>
                    </div>
                </div>
            </div>
        }
    </div >
}

export default MainIndicator