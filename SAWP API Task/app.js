// app.js
const express = require('express');
const app = express();
const mongoose = require("mongoose");

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// Define routes
const authenticateJWT = require('./middleware/authenticateJWT');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');
mongoose.connect("mongodb://localhost:27017/dogsDB");
app.use('/search', authenticateJWT, searchRoutes);
app.use('/user', userRoutes);

// Start the server
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //  console.log(`Server is running on port ${PORT}`);
//});
db.connect().then(() => {
    // Start the server after successfully connecting to the database
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to database:', err);
    // Handle database connection error
});