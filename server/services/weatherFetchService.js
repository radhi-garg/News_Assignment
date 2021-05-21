const request = require('request');

module.exports = {
  fetchWeatherForecast: async () => {
    return new Promise((resolve, reject) => {
      try {
          const options = {
            method: 'GET',
            url: `${process.env.API_URL_WEATHER}${process.env.WEATHER_API_KEY}`
          };
  
          request(options, (error, response, body) => {
            if (error) {
              return reject(error);
            }
  
            return resolve(body);
          });
        } catch (err) {
          return reject(err);
        }
    }) 
}
};
