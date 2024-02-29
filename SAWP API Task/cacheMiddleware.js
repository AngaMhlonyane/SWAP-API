// cacheMiddleware.js
const config = require('./config'); // Assuming your configuration file is named config.js
const cache = require('./cache'); // Assuming you have implemented cache functionality in cache.js

module.exports = function cacheMiddleware(req, res, next) {
    const searchTerm = req.query.searchTerm; // Assuming search term is passed in the query parameter
    const cachedResult = cache.get(searchTerm);
    console.log(config.cached_time); // Output: 900000 (15 minutes in milliseconds)
    if (cachedResult && (Date.now() - cachedResult.timestamp) < config.cached_time) {
        res.json(cachedResult.data);
    } else {
        next();
    }
};
