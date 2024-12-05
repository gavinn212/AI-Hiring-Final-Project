require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'makeittome1',
    database: 'skillmatch_ai'
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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

app.post('/api/interview-feedback', async (req, res) => {
    const { answer, question } = req.body;
    
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert interviewer and career coach. Provide detailed feedback on interview answers."
                },
                {
                    role: "user",
                    content: `
                        Please analyze this job interview response:
                        Question: ${question}
                        Answer: ${answer}
                        
                        Provide feedback with:
                        1. A score out of 100
                        2. Positive feedback points
                        3. Areas for improvement
                        4. A brief analysis
                        5. A sample strong answer
                    `
                }
            ],
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 1000
        });

        // Get the AI response
        const aiResponse = completion.choices[0].message.content;

        // Format the response
        const formattedResponse = {
            score: 0,
            feedback: [],
            improvements: [],
            analysis: "",
            sampleAnswer: ""
        };

        try {
            // Parse different sections from AI response
            const sections = aiResponse.split('\n\n');
            sections.forEach(section => {
                if (section.toLowerCase().includes('score')) {
                    formattedResponse.score = parseInt(section.match(/\d+/)[0]);
                } else if (section.toLowerCase().includes('positive') || section.toLowerCase().includes('strengths')) {
                    formattedResponse.feedback = section
                        .split('\n')
                        .filter(line => line.trim().startsWith('-'))
                        .map(line => line.trim().substring(1).trim());
                } else if (section.toLowerCase().includes('improve')) {
                    formattedResponse.improvements = section
                        .split('\n')
                        .filter(line => line.trim().startsWith('-'))
                        .map(line => line.trim().substring(1).trim());
                } else if (section.toLowerCase().includes('analysis')) {
                    formattedResponse.analysis = section.split(':')[1]?.trim() || section;
                } else if (section.toLowerCase().includes('sample')) {
                    formattedResponse.sampleAnswer = section.split(':')[1]?.trim() || section;
                }
            });
        } catch (parseError) {
            console.error('Error parsing AI response:', parseError);
            // Fallback to raw response if parsing fails
            formattedResponse.analysis = aiResponse;
        }

        res.json(formattedResponse);

    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ 
            error: 'Error generating feedback',
            details: error.message 
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 