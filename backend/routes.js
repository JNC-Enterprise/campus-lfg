const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const Router = express.Router();
 
// User registration route
Router.post('/register', async (req, res) => {
    const { email, user_password, username } = req.body;

    // First, check if the email is already registered
    const checkEmailQuery = 'SELECT * FROM Account WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        if (results.length > 0) {
            // Email already exists
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Encrypt password with a salted hash if the email is unique
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Insert the email and hashed password into the Account table
        const insertAccountQuery = 'INSERT INTO Account (email, user_password) VALUES (?, ?)';
        db.query(insertAccountQuery, [email, hashedPassword], async (err, result) => {
            if (err) return res.status(500).json(err);

            const accountId = result.insertId; // Retrieve the newly created account ID
            
            // Insert the username into the User table with the account ID
            const insertUserQuery = 'INSERT INTO User (account_id, username) VALUES (?, ?)';
            db.query(insertUserQuery, [accountId, username], (err) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ message: 'User created' });
            });
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
        if (results.length === 0) return res.status(401).json({ message: 'No Email Found' });
        // Grab the account information from the results
        const account = results[0];
        // Check if the provided password matches the hashed password in the database
        const match = await bcrypt.compare(user_password, account.user_password);
        // Return error code 401 if the password does not match
        if (!match) return res.status(401).json({ message: 'Incorrect Password' });
        // Generate a JWT token signed with the account ID
        const token = jwt.sign({ account_id: account.account_id }, process.env.JWT_SECRET);

        // Respond with the generated token and userId in a single response
        res.json({ message: 'Login successful', token, userId: account.account_id });
    });
});

// Group creation route
Router.post('/groups/create', (req, res) => {
    const { game_id, group_name, account_id } = req.body;

    // Step 1: Retrieve the user_id based on account_id
    const getUserIdQuery = 'SELECT user_id FROM User WHERE account_id = ?';
    
    db.query(getUserIdQuery, [account_id], (getUserIdErr, getUserIdResult) => {
        if (getUserIdErr) return res.status(500).json(getUserIdErr);
        
        if (getUserIdResult.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const userId = getUserIdResult[0].user_id;

        // Step 2: Insert the new group into the Team table
        const query = 'INSERT INTO Team (game_id, group_name, num_members) VALUES (?, ?, 1)';
        
        db.query(query, [game_id, group_name], (err, result) => {
            if (err) return res.status(500).json(err);

            const groupId = result.insertId; // Get the created group's ID
            
            // Step 3: Insert the user as the first member in the Team_Members table
            const memberQuery = 'INSERT INTO Team_Members (group_id, user_id) VALUES (?, ?)';
            
            db.query(memberQuery, [groupId, userId], (memberErr) => {
                if (memberErr) return res.status(500).json(memberErr);
                
                res.status(201).json({ message: 'Group created successfully', groupId });
            });
        });
    });
});


Router.post('/groups/join', (req, res) => {
    const { group_id, account_id } = req.body;

    // Step 1: Retrieve the user_id based on account_id
    const getUserIdQuery = 'SELECT user_id FROM User WHERE account_id = ?';
    
    db.query(getUserIdQuery, [account_id], (getUserIdErr, getUserIdResult) => {
        if (getUserIdErr) return res.status(500).json(getUserIdErr);
        
        if (getUserIdResult.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const userId = getUserIdResult[0].user_id;

        // Step 2: Check if the user is already a member of the group
        const checkQuery = 'SELECT * FROM Team_Members WHERE group_id = ? AND user_id = ?';
        
        db.query(checkQuery, [group_id, userId], (checkErr, checkResult) => {
            if (checkErr) return res.status(500).json(checkErr);
            
            if (checkResult.length > 0) {
                return res.status(400).json({ message: 'User is already a member of this group' });
            }
            
            // Step 3: Add the user to the Team_Members table
            const joinQuery = 'INSERT INTO Team_Members (group_id, user_id) VALUES (?, ?)';
            
            db.query(joinQuery, [group_id, userId], (joinErr) => {
                if (joinErr) return res.status(500).json(joinErr);
                
                // Step 4: Increment num_members in the Team table
                const updateQuery = 'UPDATE Team SET num_members = num_members + 1 WHERE group_id = ?';
                
                db.query(updateQuery, [group_id], (updateErr) => {
                    if (updateErr) return res.status(500).json(updateErr);
                    
                    res.status(200).json({ message: 'User joined the group successfully' });
                });
            });
        });
    });
});


// Fetch the game ID based on game name
Router.get('/games/:gameName', (req, res) => {
    const { gameName } = req.params;

    // Query to fetch the game ID based on game name
    const query = 'SELECT game_id FROM Game WHERE title = ?';

    db.query(query, [gameName], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch game', details: err });

        if (results.length > 0) {
          res.status(200).json(results[0]); // Return the game data (game_id)
        } else {
          res.status(404).json({ error: 'Game not found' });
        }
    });
});

// Fetch groups for a specific game
Router.get('/groups/:gameId', (req, res) => {
    const { gameId } = req.params;

    // Query to fetch groups for the specified game
    const query = `
        SELECT Team.group_id, Team.group_name, Team.num_members, Game.title AS game_title
        FROM Team
        JOIN Game ON Team.game_id = Game.game_id
        WHERE Team.game_id = ?
    `;

    db.query(query, [gameId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch groups', details: err });
        
        res.status(200).json(results);
    });
});

Router.get('/groups/user/:userId', (req, res) => {
    const { userId } = req.params; // Use `userId` from params

    const getUserIdQuery = 'SELECT user_id FROM User WHERE account_id = ?';
    
    db.query(getUserIdQuery, [userId], (getUserIdErr, getUserIdResult) => {
        if (getUserIdErr) return res.status(500).json(getUserIdErr);
        
        if (getUserIdResult.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userIdFromDb = getUserIdResult[0].user_id;

        const query = `
            SELECT t.group_id, t.group_name, t.num_members
            FROM Team t
            JOIN Team_Members tm ON t.group_id = tm.group_id
            JOIN Game g ON t.game_id = g.game_id
            WHERE tm.user_id = ?
        `;

        db.query(query, [userIdFromDb], (err, results) => {
            if (err) return res.status(500).json({ error: 'Failed to fetch groups', details: err });
            res.status(200).json(results);
        });
    });
});


Router.get('/messages/:groupId', (req, res) => {
    const { groupId } = req.params;
    const query = `
        SELECT m.message_id, m.content, m.sender_id, m.created_at, u.username AS sender_username
        FROM Message m
        JOIN User u ON m.sender_id = u.user_id
        WHERE m.group_id = ?
        ORDER BY m.created_at ASC
    `;

    db.query(query, [groupId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch messages', details: err });
        res.status(200).json(results);
    });
});

Router.post('/messages/send', (req, res) => {
    const { groupId, senderId, content } = req.body;
    const query = `
        INSERT INTO Message (group_id, sender_id, content, created_at)
        VALUES (?, ?, ?, NOW())
    `;

    db.query(query, [groupId, senderId, content], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to send message', details: err });
        res.status(201).json({ message: 'Message sent successfully', messageId: result.insertId });
    });
});



module.exports = Router;
