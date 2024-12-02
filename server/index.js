const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router'); // Import your router file

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use('/', router); // Register the router

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});