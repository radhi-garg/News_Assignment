const request = require('request');

module.exports = {
  fetchTopHeadlines: async () => {
      return new Promise((resolve, reject) => {
        try {
            const options = {
              method: 'GET',
              url: process.env.API_URL_TH,
              headers:
              {
                'Authorization': `Bearer ${process.env.NEWS_API_KEY}`
              }
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
  },

  fetchWithKeyword: async query => {
    return new Promise((resolve, reject) => {
      try {
          const options = {
            method: 'GET',
            url: `${process.env.API_URL_KEYWORD}?q=${query.search}&pageSize=100`,
            headers:
            {
              'Authorization': `Bearer ${process.env.NEWS_API_KEY}`
            }
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
