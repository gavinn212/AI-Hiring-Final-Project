require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'jobportal'
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
  const query = 'SELECT * FROM jobs';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching jobs:', err);
      return res.status(500).json({ 
        error: 'Database error',
        details: err.message 
      });
    }
    
    if (results.length === 0) {
      // If no jobs found, return sample data
      const sampleJobs = [
        {
          id: 1,
          title: "Senior Software Engineer",
          company_name: "Tech Corp",
          description: "We are looking for an experienced software engineer to join our team...",
          required_skills: "React, Node.js, AWS, TypeScript",
          location: "New York, NY"
        },
        {
          id: 2,
          title: "Frontend Developer",
          company_name: "Web Solutions Inc",
          description: "Seeking a talented frontend developer with strong React experience...",
          required_skills: "JavaScript, React, CSS, HTML",
          location: "Remote"
        }
      ];
      return res.json(sampleJobs);
    }
    
    res.json(results);
  });
});

// Existing OpenAI configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Existing chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: req.body.messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    res.json({
      content: completion.data.choices[0].message.content
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