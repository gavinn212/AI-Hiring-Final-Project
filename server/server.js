require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'skillmatch_ai'
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to database successfully!');
});

// Test endpoint to check if jobs table exists and has data
app.get('/api/jobs', (req, res) => {
  const query = 'SELECT j.*, e.company_name FROM jobs j JOIN employers e ON j.employer_id = e.id';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching jobs:', err);
      return res.status(500).json({ 
        error: 'Database error',
        details: err.message 
      });
    }
    
    console.log('Query results:', results); // Debug log
    
    if (results.length === 0) {
      console.log('No jobs found in database'); // Debug log
      return res.status(404).json({ message: 'No jobs found' });
    }
    
    res.json(results);
  });
});

// Existing OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Existing chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: req.body.messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    res.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 