const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');

//set environment variables
dotenv.config();

//Use express framework for website
const app = express();
app.use(cors());

//Use parser to handle requests that way it can translate the contents into a javascript object 
app.use(bodyParser.json());

//Set the app to use the routes file to process requests and prefixes them using /api
app.use('/api', routes);

//Establish port the server is hosted on, default port for react applications
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});