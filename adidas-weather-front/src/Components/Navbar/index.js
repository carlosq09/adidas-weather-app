import React from 'react'
import { TiWeatherWindy } from 'react-icons/ti'
import AdidasLetters from '../../assets/adidasLogo.png'
//Styles
import './index.scss'

const Navbar = ({ forecast, displayTodayWeather }) =>
    <nav className="navbar">
        <ul className="navbar__list">
            <li className="navbar-item">
                <TiWeatherWindy color='black' size={30} />{forecast.avg_wind || forecast.wind} m/s
                    </li>
            <li className="navbar-mainLogo" onClick={() => displayTodayWeather()}>
                <img className="navbar-image" src={AdidasLetters} />
                <p>| weather</p>
            </li>
            <li className="navbar-item" onClick={() => displayTodayWeather()}>CURRENT</li>
        </ul>

    </nav>


export default Navbar