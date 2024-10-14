const mysql = require('mysql2');
const dotenv = require('dotenv');

//Load in environment variables
dotenv.config();

//Set up connection to sql database using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//error if not able to connect
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

module.exports = db;