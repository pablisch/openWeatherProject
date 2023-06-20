
const appID = require('./apiKey');
const { response } = require('express');
const express = require('express'); // require Express
const https = require('https');
const bodyParser = require('body-parser');

const app = express(); // set app to Express function

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
  console.log(appID)
});

app.post('/weather', (req, res) => {
  const city = req.body.cityName;
  const units = req.body.units;

  const unit = units === 'metric' ? 'C'
    : units === 'imperial' ? 'F'
    : '';

  const weatherURL = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${appID}&units=${units}`; //sets the openWeatherMap API URL
  
  https.get(weatherURL, (openWeatherResponse) => {
  // 👆🏼 send request to OpenWeatherMap API
    
    // 👇🏼 The ON function collects the data requested
    openWeatherResponse.on('data', (data) => {
      const weatherData = JSON.parse(data); // parses data as JSON rather than the default hexadecimal
      const temp = (weatherData.main.temp); // extracting target data
      const description = (weatherData.weather[0].description);
      const icon = (weatherData.weather[0].icon);
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
      // 👇🏼 res.writes to browser
      res.write('<body style="background-color: #bbccee"</body>');
      res.write(`<h1>The current weather in ${city}</h1>`);
      res.write(`<p>The current weather is ${description} with a temperature of ${temp} degrees ${unit}.</p>`);
      res.write(`<img src="${iconURL}" alt="weather icon">`);
      res.send();
      console.log(appID)
    });
  });
})

app.listen(4000, () => {
  console.log('Server running on port 4000');
})

