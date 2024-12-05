import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';

function InterviewPrep() {
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(0);

  const interviewQuestions = {
    0: { // Behavioral
      title: "Behavioral Questions",
      questions: [
        "Tell me about yourself",
        "What are your greatest strengths?",
        "What are your greatest weaknesses?",
        "Tell me about a time you showed leadership",
        "How do you handle conflict at work?",
        "Describe a challenging situation and how you overcame it"
      ]
    },
    1: { // Technical
      title: "Technical Questions",
      questions: [
        "Explain the concept of Object-Oriented Programming",
        "What is the difference between REST and SOAP?",
        "How would you optimize a website's performance?",
        "Explain the concept of database indexing",
        "What is the difference between HTTP and HTTPS?",
        "Explain the concept of middleware"
      ]
    },
    2: { // Situational
      title: "Situational Questions",
      questions: [
        "How would you handle a disagreement with your manager?",
        "What would you do if you caught a colleague stealing?",
        "How would you handle multiple urgent deadlines?",
        "What would you do if you made a mistake that no one noticed?",
        "How would you handle an angry customer?",
        "What would you do if you disagreed with a team decision?"
      ]
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const prompt = `Act as an interview expert. Evaluate this answer for the question: "${selectedQuestion}"\n\nCandidate's answer: "${answer}"\n\nProvide feedback in the following JSON format:\n{\n"score": (number between 0-100),\n"feedback": [list of 2-3 positive points],\n"improvements": [list of 2-3 areas for improvement],\n"analysis": "detailed paragraph of analysis"\n}`;

      const response = await axios.post('http://localhost:5000/api/chat', {
        messages: [
          {
            role: "system",
            content: "You are an expert interview coach with years of experience helping candidates prepare for job interviews."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      // Parse the response from ChatGPT
      const feedbackData = JSON.parse(response.data.content);
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Error getting feedback:', error);
      // You might want to show an error message to the user here
    }
    setLoading(false);
  };

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
    setSelectedQuestion('');
    setFeedback(null);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f7', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#1e3c72'
            }}
          >
            Interview Practice
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: 'text.secondary'
            }}
          >
            Practice with AI-powered feedback
          </Typography>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Questions Panel */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Tabs
                  value={category}
                  onChange={handleCategoryChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ mb: 3 }}
                >
                  <Tab label="Behavioral" />
                  <Tab label="Technical" />
                  <Tab label="Situational" />
                </Tabs>
                <Typography variant="h6" gutterBottom>
                  {interviewQuestions[category].title}:
                </Typography>
                <List>
                  {interviewQuestions[category].questions.map((question, index) => (
                    <ListItem
                      button
                      key={index}
                      selected={selectedQuestion === question}
                      onClick={() => setSelectedQuestion(question)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        '&.Mui-selected': {
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                        }
                      }}
                    >
                      <ListItemText primary={question} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Answer and Feedback Panel */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Answer:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading || !selectedQuestion || !answer}
                  sx={{
                    bgcolor: '#1e3c72',
                    '&:hover': {
                      bgcolor: '#2a5298'
                    }
                  }}
                >
                  Get AI Feedback
                </Button>
              </CardContent>
            </Card>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            )}

            {feedback && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Feedback Score: {feedback.score}/100
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Strengths:
                  </Typography>
                  <List>
                    {feedback.feedback.map((point, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Areas for Improvement:
                  </Typography>
                  <List>
                    {feedback.improvements.map((point, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Detailed Analysis:
                  </Typography>
                  <Typography paragraph>
                    {feedback.analysis}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default InterviewPrep;