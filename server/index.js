require('dotenv').config();
const express = require('express');
const cors = require('cors');
const suggestionsRouter = require('./routes/router'); // Import the router

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the router for API endpoints
app.use('/api', suggestionsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
