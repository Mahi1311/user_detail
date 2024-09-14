const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// SQL Server configuration
const dbConfig = {
    user: 'your_sql_server_username',
    password: 'your_sql_server_password',
    server: 'your_sql_server_host',
    database: 'your_database_name'
};

// Save user to database
app.post('/saveUser', async (req, res) => {
    const { username, email, phone } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('phone', sql.VarChar, phone)
            .query('INSERT INTO Users (Username, Email, Phone) VALUES (@username, @email, @phone)');
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

// Delete users from database
app.post('/deleteUsers', async (req, res) => {
    const { ids } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        const query = `DELETE FROM Users WHERE Username IN (${ids.map(id => '${id}').join(',')})`;
        await pool.request().query(query);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
