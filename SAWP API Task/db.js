// db.js
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/mydatabase'; // MongoDB connection URI

let db;

async function connect() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = {
    connect,
    getDB
};
