// app.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// Define routes
const searchRoute = require('./searchRoute');
app.use('/', searchRoute);
pp.use('/user', userRoutes);
app.use('/search', authenticateJWT, searchRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
