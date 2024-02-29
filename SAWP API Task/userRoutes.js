// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const db = require('../db');



router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/users', async (req, res) => {
    try {
        const usersCollection = db.getDB().collection('users');
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
