const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Database connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'bblbehavior',
    database: 'trip_planner',
    port: 3306
});
// Route to fetch all suggestions
router.get('/suggestions', (req, res) => {
    connection.query('SELECT * FROM suggestions', (err, results) => {
        if (err) {
            console.error('Error fetching suggestions:', err);
            return res.status(500).json({ error: 'Failed to fetch suggestions' });
        }
        res.json(results);
    });
});

module.exports = router;
