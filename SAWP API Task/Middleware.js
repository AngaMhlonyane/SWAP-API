// cacheMiddleware.js
const config = require('./Config');
const cache = require('./cache'); // Implement cache functionality

module.exports = function cacheMiddleware(req, res, next) {
    const searchTerm = req.query.searchTerm; // Assuming search term is passed in the query parameter
    const cachedResult = cache.get(searchTerm);

    if (cachedResult && (Date.now() - cachedResult.timestamp) < config.cached_time) {
        res.json(cachedResult.data);
    } else {
        next();
    }
};
