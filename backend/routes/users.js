// backend/routes/users.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'localhost', // e.g., 'localhost'
    user: 'root', // e.g., 'root'
    password: '',
    database: 'gestion_commerciale',
});

router.get('/users', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM user');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ error: 'Error fetching user data' });
    }
});

module.exports = router;
