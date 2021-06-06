## Adidas weather app 
[![react version](https://img.shields.io/badge/react-17.0.2-blue.svg)](https://www.npmjs.com/package/react/v/17.0.2) 
[![express version](https://img.shields.io/badge/express-4.17.1-green.svg)](https://www.npmjs.com/package/4.17.1/v/4.17.1) 
[![mongoose version](https://img.shields.io/badge/mongoose-5.12.13-orange.svg)](https://www.npmjs.com/package/5.12.13/v/5.12.13) 
[![mocha version](https://img.shields.io/badge/mocha-6.1.4-orange.svg)](https://www.npmjs.com/package/6.1.4/v/6.1.4) 


<p align="center">

<img src="https://media.giphy.com/media/HmTLatwLWpTQk/giphy.gif" >

## Introduction

This client aplication was made with React, and the backend aplication was made with Express using Mongoose for DB, the main objective is to display the weather forecasts data given by the backend application


## Functional Description
Users can:

* Visualize weather from each day of the week from the cities

* Search the city using the search bar, which has the autocomplete functionality giving you hits of what you want to find

* Display the hourly forecasts from a selected day

## Aplication Description
The aplication initializes (and is the only page atm, the ideal case was to have the queries for the weather via react router) in a landing where is already fetching the data for a default localization (in this case Zaragoza)

![Landing](/docs/images/landing.png)

You can search for Cities using the autocomplete search bar, and display the selected city, and the predictions we have stored in database

![search](/docs/images/search.png)

you can select an hour to display it on the main indicator

![hourly](/docs/images/hourly.png)

### Backend Description

The project in the backend side was made performing TDD to make the functionalities, was being tested using Mocha with Chai assertion library, 


```
/weather
/weather/forecast
/weather/Cities
```
## Instalation Description
### Backend side

For the backend side you have to go to the api folder
```
cd adidas-weather-back
npm install
npm run start
```
in the backend side you can do
### `npm test`
to perfom run the test made in the backend side

### Front side

For the client side you have to go to the front folder
```
cd adidas-weather-front
npm install
npm run start
```

## Considerations(TODO LIST)

My main objective is to perform TDD also in the frontend side, the aplication is prepared to do that

Deploy the aplication in cloud services, such like Heroku for the api and Surge.sh

Redux was not considered but may be a good option to manage indicators data

Styled components or tailwind was not considered due i wanted to make the css styles by my own