const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'makeittome1',
    database: 'skillmatch_ai'
});

// Job Seeker Routes
app.post('/api/jobseekers', (req, res) => {
    const { name, email, skills, experience } = req.body;
    db.query(
        'INSERT INTO job_seekers (name, email, skills, experience) VALUES (?, ?, ?, ?)',
        [name, email, skills, experience],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: result.insertId });
        }
    );
});

app.get('/api/jobs', (req, res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Employer Routes
app.post('/api/employers', (req, res) => {
    const { company_name, email, industry } = req.body;
    db.query(
        'INSERT INTO employers (company_name, email, industry) VALUES (?, ?, ?)',
        [company_name, email, industry],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: result.insertId });
        }
    );
});

app.post('/api/jobs', (req, res) => {
    const { employer_id, title, description, required_skills } = req.body;
    db.query(
        'INSERT INTO jobs (employer_id, title, description, required_skills) VALUES (?, ?, ?, ?)',
        [employer_id, title, description, required_skills],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: result.insertId });
        }
    );
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 