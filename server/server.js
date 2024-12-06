require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { GoogleGenerativeAI } = require('@google/generative-ai');

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

// Update Gemini configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Updated chat endpoint to use Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat();
    
    const prompt = req.body.messages[0].content;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    res.json({
      content: response.text()
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error processing your request',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 