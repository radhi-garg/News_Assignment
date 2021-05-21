const express = require('express');
const auth = require('../middleware/auth');
const cacheMiddleware = require('../middleware/cache');
const { getNews } = require('../controllers/news');

const router = express.Router();

router.get('/', [auth, cacheMiddleware(60 * 60)], getNews);

module.exports = router;