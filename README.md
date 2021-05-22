# News_Assignment
A small application which provides news and weather information to user

## Clone

 git clone https://github.com/radhi-garg/News_Assignment.git

## Installation

1. cd News_Assignment

2. In .env file, place a string in Secret Key for token generation, example - 'FCizrHEhpC'

3. Generate API key for using news api from https://newsapi.org/, place under NEWS_API_KEY in .env file

4. Generate API key for using weather api from https://openweathermap.org/api, place under WEATHER_API_KEY in .env file

5. Place a string in CACHE_KEY Key, example - 'FCizrHEhpC'

6. Use Mongo DB as a service at local machine and fill in the mongo details in .env file

7. cd server

8. npm install

## Usage

1. npm start

2. npm run dev to run in development mode

3. Insert a test user, {email: 'test@gmail.com', password: 'test123', name: 'test'}, in test collection to run  tests successfully as it creates token using login API.

4. npm run test for test

5. Follow API documentation to use API endpoints.
