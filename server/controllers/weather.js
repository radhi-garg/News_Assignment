const { fetchWeatherForecast } = require('../services/weatherFetchService');
const { METRIC, LOCATION } = require('../constants/constants');

const getForecast = async (req, res) => {
  try {
    let forecast = await fetchWeatherForecast();

    forecast = JSON.parse(forecast);

    const data = forecast.daily.slice(0, 5).map((item) => {
      let { dt: date, temp, weather } = item;

      date = new Date(date * 1000).toDateString();
      weather = weather[0].main;

      return { date, main: weather, temp };
    });

    res.status(200).json({ count: 5, unit: METRIC, location: LOCATION, data });
  } catch (e) {
    res.status(500).json({ message: e.toString() });
  }
};

module.exports = { getForecast };
