// searchRoute.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('./config');
const cache = require('./cache');
const SearchController = require('../controllers/SearchController');




// Middleware
const cacheMiddleware = require('./cacheMiddleware');
// OtherFile.js



console.log(config.cached_time); // Output: 900000 (15 minutes in milliseconds)

router.get('/search', cacheMiddleware, async (req, res) => {
    const searchTerm = req.query.searchTerm; // Assuming search term is passed in the query parameter
    try {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
        const data = response.data;
        cache.set(searchTerm, data); // Cache the result
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', SearchController.search);
module.exports = router;
