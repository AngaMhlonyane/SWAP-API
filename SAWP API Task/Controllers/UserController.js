// controllers/UserController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../Config'); // Import your configuration file
const db = require('../db'); // Import your database connection

const UserController = {
    signup: async (req, res) => {
        const { firstName, surname, email, password } = req.body;
        
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Insert user into the database
            await db.query('INSERT INTO users (first_name, surname, email, password) VALUES ($1, $2, $3, $4)', [firstName, surname, email, hashedPassword]);
            
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    login: async (req, res) => {
        const { email, password } = req.body;
        
        try {
            // Fetch user from the database
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];
            
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            
            // Compare passwords
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            
            // Generate JWT token
            const token = jwt.sign({ email: user.email }, config.jwt_secret, { expiresIn: '1h' });
            
            res.json({ token });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = UserController;
