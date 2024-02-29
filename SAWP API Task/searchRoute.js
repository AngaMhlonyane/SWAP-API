// searchRoute.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('./Config');
const cache = require('./cache');
const SearchController = require('../controllers/SearchController');




// Middleware
const cacheMiddleware = require('./cacheMiddleware');

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
