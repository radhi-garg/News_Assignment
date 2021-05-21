const app = require('../index');
const request = require('supertest');
const userRoutes = require('../routes/user');
const newsRoutes = require('../routes/news');
const weatherRoutes = require('../routes/weather');
const { TEST, REQUIRE_AUTH, LOG_IN, GET_TOKEN, FETCH_NEWS, FETCH_TOP_HEADLINES,
    FETCH_BY_KEYWORD, FETCH_WEATHER, GET_FORECAST } = require('../constants/constants.js');

app.use('/user', userRoutes);
app.use('/news', newsRoutes);
app.use('/weather', weatherRoutes);

let token;

beforeAll(async done => {
  process.env.NODE_ENV = TEST;

  done();
});

describe(LOG_IN, () => {
  test(GET_TOKEN, done => {
    request(app)
      .post('/user/login')
      .send({
        email: 'test@gmail.com',
        password: 'test123',
      })
      .end((err, response) => {
        token = response.body.token; // save the token!

        expect(response.status).toBe(200);
        done();
      });
  });
});

describe(FETCH_NEWS, () => {
  test(REQUIRE_AUTH, done => {
    request(app)
      .get('/news')
      .end((err, response) => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });

  test(FETCH_TOP_HEADLINES, done => {
    request(app)
      .get('/news')
      .set('Authorization', `Bearer ${token}`)
      .end((err, response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      });
  });

  test(FETCH_BY_KEYWORD, done => {
    request(app)
      .get('/news?search=cricket')
      .set('Authorization', `Bearer ${token}`)
      .end((err, response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      });
  });
});

describe(FETCH_WEATHER, () => {
  test(GET_FORECAST, done => {
    request(app)
      .get('/weather')
      .end((err, response) => {
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
        done();
      });
  });
});
