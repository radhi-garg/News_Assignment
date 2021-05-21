const cache = require("memory-cache");

const cacheMiddleware = duration => {
  let memCache = new cache.Cache();

  return (req, res, next) => {
    let key = process.env.CACHE_KEY + req.originalUrl || req.url;

    let cacheContent = memCache.get(key);

    if (cacheContent) {
      res.send(JSON.parse(cacheContent));
      return;
    }
    else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cacheMiddleware;
