const express = require('express');
const cacheMiddleware = require('../middleware/cache');
const { getForecast } = require('../controllers/weather');

const router = express.Router();

router.get('/', cacheMiddleware(60 * 60), getForecast);

module.exports = router;