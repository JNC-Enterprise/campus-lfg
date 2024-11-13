const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const Router = express.Router();
 
// User registration route
Router.post('/register', async (req, res) => {
    const { email, user_password, username } = req.body;
    // Check if the email ends with .edu using a regular expression
    const emailRegex = /^[\w\.]+@([\w-]+\.)+edu$/;
    // Return error message if the email doesn't end in .edu
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email must be a valid .edu email address' });
    }

    // Encrypt password with a salted hash
    //const hashedPassword = await bcrypt.hash(user_password, 10);
    // Query to insert email and hashed password into the Account table
    const query = 'INSERT INTO Account (email, user_password) VALUES (?, ?)';

    // Send the query to the database
    db.query(query, [email, user_password], async(err, result) => {
        // Handle internal server error (status 500)

        if (err) return res.status(500).json(err);

        const accountId = result.insertId; // Retrieve the newly created account ID
        // Prepare to insert the username into the User table
        const userQuery = 'INSERT INTO User (account_id, username) VALUES (?, ?)';
        // Send the query and check for errors
        db.query(userQuery, [accountId, username], async(err) => {
            // Handle internal server error (status 500)
            if (err) return res.status(500).json(err);
            // Respond with status 201 for successful creation
            res.status(201).json({ message: 'User created' });
        });
    });
});

// User login route
Router.post('/login', (req, res) => {
    // Grab user input for email and password
    const { email, user_password } = req.body;
    // Query to get the account based on the provided email
    const query = 'SELECT * FROM Account WHERE email = ?';
    
    // Execute the query to check for the account
    db.query(query, [email], async (err, results) => {
        // Handle internal server error (status 500)
        if (err) return res.status(500).json(err);
        // Return 401 if no matching account is found
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        // Grab the account information from the results
        const account = results[0];
        // Check if the provided password matches the hashed password in the database
        //const match = await bcrypt.compare(user_password, account.user_password);
        if (user_password !== account.user_password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Return error code 401 if the password does not match
        //if (!match) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ message: 'Login successful', userId: account.account_id });
        // // Generate a JWT token signed with the account ID
        // const token = jwt.sign({ account_id: account.account_id }, process.env.JWT_SECRET);
        // // Respond with the generated token
        // res.json({ token });
    });
});

// Group creation Route
// Group creation route
Router.post('/groups/create', (req, res) => {
    const { game_id, group_name, user_id } = req.body;
    
    // Insert new group into Team table
    const query = 'INSERT INTO Team (game_id, group_name, num_members) VALUES (?, ?, 1)';
    
    db.query(query, [game_id, group_name], (err, result) => {
        if (err) return res.status(500).json(err);

        const groupId = result.insertId; // Get the created group's ID
        
        // Insert the creator as the first member in the Team_Members table
        const memberQuery = 'INSERT INTO Team_Members (group_id, user_id) VALUES (?, ?)';
        
        db.query(memberQuery, [groupId, user_id], (memberErr) => {
            if (memberErr) return res.status(500).json(memberErr);
            
            res.status(201).json({ message: 'Group created successfully', groupId });
        });
    });
});

// Group joining route
Router.post('/groups/join', (req, res) => {
    const { group_id, user_id } = req.body;
    
    // Check if the user is already a member
    const checkQuery = 'SELECT * FROM Team_Members WHERE group_id = ? AND user_id = ?';
    
    db.query(checkQuery, [group_id, user_id], (checkErr, checkResult) => {
        if (checkErr) return res.status(500).json(checkErr);
        
        if (checkResult.length > 0) {
            return res.status(400).json({ message: 'User is already a member of this group' });
        }
        
        // Add the user to the Team_Members table
        const joinQuery = 'INSERT INTO Team_Members (group_id, user_id) VALUES (?, ?)';
        
        db.query(joinQuery, [group_id, user_id], (joinErr) => {
            if (joinErr) return res.status(500).json(joinErr);
            
            // Increment num_members in the Team table
            const updateQuery = 'UPDATE Team SET num_members = num_members + 1 WHERE group_id = ?';
            
            db.query(updateQuery, [group_id], (updateErr) => {
                if (updateErr) return res.status(500).json(updateErr);
                
                res.status(200).json({ message: 'User joined the group successfully' });
            });
        });
    });
});




module.exports = Router;
