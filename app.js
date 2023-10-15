// app.js
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dj25082001',
    database: 'deepakdb'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Save player data to the database
app.post('/players', (req, res) => {
    const playerData = req.body;
    console.log(playerData); 
    // Define the SQL query
    const sql = 'INSERT INTO players (name, dob, photo, birthplace, career_description, matches, scores, fifties, centuries, wickets, average) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Log SQL query and player data for debugging
    console.log('SQL Query:', sql);
    console.log('Player Data:', [playerData.name, playerData.dob, playerData.photo, playerData.birthplace, playerData.career_description, playerData.matches, playerData.scores, playerData.fifties, playerData.centuries, playerData.wickets, playerData.average]);

    db.query(sql, [
        playerData.name,
        playerData.dob,
        playerData.photo,
        playerData.birthplace,
        playerData.career_description,
        playerData.matches,
        playerData.scores,
        playerData.fifties,
        playerData.centuries,
        playerData.wickets,
        playerData.average
    ], (err, result) => {
        if (err) {
            console.error('Error saving player data: ' + err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        console.log('Player data saved.');
        res.json({ success: true });
    });
});

// Search for players by name
app.get('/search', (req, res) => {
    const { name } = req.query;
    const sql = 'SELECT * FROM players WHERE name LIKE ?';
    const searchName = `%${name}%`;

    db.query(sql, [searchName], (err, results) => {
        if (err) {
            console.error('Error searching for players: ' + err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, data: results });
    });
});

app.put('/players/:id', (req, res) => {
    const playerId = req.params.id;
    const playerData = req.body;
    // Define the SQL query for updating an existing player
    const sql = `UPDATE players SET name = ?, dob = ?, photo = ?, birthplace = ?, career_description = ?, matches = ?, scores = ?, fifties = ?, centuries = ?, wickets = ?, average = ? WHERE id = ?`;

    // Log SQL query and player data for debugging
    console.log('SQL Query:', sql);
    console.log('Player Data:', [playerData.name, playerData.dob, playerData.photo, playerData.birthplace, playerData.career_description, playerData.matches, playerData.scores, playerData.fifties, playerData.centuries, playerData.wickets, playerData.average, playerId]);

    db.query(sql, [
        playerData.name,
        playerData.dob,
        playerData.photo,
        playerData.birthplace,
        playerData.career_description,
        playerData.matches,
        playerData.scores,
        playerData.fifties,
        playerData.centuries,
        playerData.wickets,
        playerData.average,
        playerId
    ], (err, result) => {
        if (err) {
            console.error('Error updating player data: ' + err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        console.log('Player data updated.');
        res.json({ success: true });
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
