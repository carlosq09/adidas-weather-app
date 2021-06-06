import React, { useState, useEffect } from 'react'
import { IconContext } from "react-icons";
//Components
import SearchBar from './Components/SearchBar'
import Navbar from './Components/Navbar'
import MainIndicator from './Components/MainIndicator'
import WheaterList from './Components/WeatherList'
//API
import weatherApi from './Api'
//styles
import './App.scss'

function App() {
  const [listData, setListData] = useState()
  const [citiesList, setCitiesList] = useState()
  const [currentLocation, setCurrentLocation] = useState()
  const [currentForecast, setCurrentForecast] = useState()

  const displayWeeklyWeather = (city = currentLocation.city, country = currentLocation.country) => {
    weatherApi.retrieveWeeklyWeatherByCity(city, country).then(list => {
      const [firstPrediction] = list

      setCurrentForecast(firstPrediction)
      setCurrentLocation(firstPrediction.location)
      setListData(list)
    })
  }

  const handleAutocompleteSearch = (query) => {
    weatherApi.retrieveCityListByQuery(query).then(list => {
      setCitiesList(list)
    })
  }

  const displayInMainIndicator = (selected) => {
    setCurrentForecast(selected)
  }

  const displayHourlyForecast = () => {
    setListData(currentForecast.hourly_forecast)
  }

  useEffect(() => {
    displayWeeklyWeather('Zaragoza', 'ES')
  }, [])

  return (
    <div className="App">
      <IconContext.Provider value={{ color: "lightgray", className: "weatherApp-icons" }}>
        <div className="weatherApp-layout">
          <div className="weatherApp-selected">
            {currentForecast && <>
              <Navbar forecast={currentForecast} displayTodayWeather={displayWeeklyWeather} />
              <MainIndicator forecast={currentForecast} location={currentLocation} />
              <SearchBar autocomplete={handleAutocompleteSearch} searchCity={displayWeeklyWeather} itemList={citiesList} />
            </>}
          </div>
          <WheaterList forecastList={listData} location={currentLocation} displayInMainIndicator={displayInMainIndicator} displayHourlyForecast={displayHourlyForecast} />
        </div>
      </IconContext.Provider>
    </div>
  );
}

export default App;
