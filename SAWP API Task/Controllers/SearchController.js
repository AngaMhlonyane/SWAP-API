// controllers/SearchController.js
const axios = require('axios');
const config = require('../config'); // Import your configuration file
const db = require('../db'); // Import your database connection

const SearchController = {
    search: async (req, res) => {
        const searchTerm = req.query.searchTerm; // Assuming search term is passed in the query parameter
        
        try {
            // Check if cached result exists and is not expired
            const cachedResult = await db.query('SELECT * FROM cached_results WHERE search_term = $1', [searchTerm]);
            
            if (cachedResult.rows.length > 0 && Date.now() - new Date(cachedResult.rows[0].created_at).getTime() < config.cached_time) {
                res.json(cachedResult.rows[0].result);
            } else {
                // Fetch data from the Star Wars API
                const response = await axios.get(`https://swapi.dev/api/people/?search=${searchTerm}`);
                const data = response.data;
                
                // Cache the result in the database
                await db.query('INSERT INTO cached_results (search_term, result) VALUES ($1, $2)', [searchTerm, data]);
                
                res.json(data);
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = SearchController;
