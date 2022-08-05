const { response } = require('express');
const express = require('express'); // require Express
const https = require('https');

const app = express(); // set app to Express function

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1a418d7b3e1171b58566cd6a7ec43fe6&units=metric'; //sets the openWeatherMap API URL

app.get('/', (req, ourResponse) => {
  const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=1a418d7b3e1171b58566cd6a7ec43fe6&units=metric'; //sets the openWeatherMap API URL
  
  https.get(weatherURL, (openWeatherResponse) => {

    openWeatherResponse.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = (weatherData.main.temp);
      const description = (weatherData.weather[0].description);
      ourResponse.write('<h1>The current weather in London</h1>');
      ourResponse.send(`The current weather is ${description} with a temperature of ${temp} degrees C.`);
    });
  });
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
})

