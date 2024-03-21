//setup empty JS object to act as an endpoint for all routes
projectData = {}

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Middleware
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 1000;

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});

// GET route that returns projectData
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route that adds data to projectData
app.post('/add', (req, res) => {
    const newData = req.body;
    projectData = { ...newData };
    console.log(projectData);
    res.send(projectData);
});