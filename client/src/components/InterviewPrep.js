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
      const prompt = `You are an expert interview coach. Please evaluate this interview answer.
Question: "${selectedQuestion}"
Answer: "${answer}"

Please provide your evaluation in the following format:

Score: [0-100]

Key Strengths:
• [First strength point]
• [Second strength point]
• [Third strength point]

Areas for Improvement:
• [First improvement point]
• [Second improvement point]
• [Third improvement point]

Detailed Analysis:
[Provide a thorough analysis of the answer, explaining the reasoning behind the score and suggestions for improvement.]

Please ensure you always include at least 2 points for both Strengths and Improvements, even for very good or very poor answers.`;

      const response = await axios.post('http://localhost:5000/api/chat', {
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      });

      // Parse the response text
      const responseText = response.data.content;
      
      // Extract score
      const scoreMatch = responseText.match(/Score:\s*(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;

      // Extract strengths (ensure at least one point)
      const strengthsMatch = responseText.match(/Key Strengths:([^]*?)(?=Areas for Improvement:|$)/i);
      const strengths = strengthsMatch 
        ? strengthsMatch[1].split(/•|-|\n/).filter(s => s.trim())
        : ["Shows willingness to engage with the question"];

      // Extract improvements (ensure at least one point)
      const improvementsMatch = responseText.match(/Areas for Improvement:([^]*?)(?=Detailed Analysis:|$)/i);
      const improvements = improvementsMatch
        ? improvementsMatch[1].split(/•|-|\n/).filter(s => s.trim())
        : ["Could provide more specific examples"];

      // Extract analysis
      const analysisMatch = responseText.match(/Detailed Analysis:([^]*?)$/i);
      const analysis = analysisMatch 
        ? analysisMatch[1].trim()
        : responseText;

      setFeedback({
        score,
        feedback: strengths.length > 0 ? strengths : ["Shows basic understanding"],
        improvements: improvements.length > 0 ? improvements : ["Could add more detail"],
        analysis: analysis || "Consider expanding your answer with specific examples and more detail."
      });

    } catch (error) {
      console.error('Error getting feedback:', error);
      // Provide default feedback if parsing fails
      setFeedback({
        score: 50,
        feedback: [
          "Attempted to answer the question",
          "Shows basic understanding of the topic"
        ],
        improvements: [
          "Add more specific examples",
          "Provide more detail in your response"
        ],
        analysis: "Please try to provide a more detailed response with specific examples from your experience."
      });
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
              <Card sx={{ 
                mt: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderRadius: '16px',
              }}>
                <CardContent sx={{ p: 4 }}>
                  {/* Score Section */}
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                    pb: 3,
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      border: '4px solid #1e3c72',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3
                    }}>
                      <Typography variant="h4" sx={{ color: '#1e3c72', fontWeight: 'bold' }}>
                        {feedback.score}
                      </Typography>
                    </Box>
                    <Typography variant="h5" sx={{ color: '#1e3c72' }}>
                      Overall Score
                    </Typography>
                  </Box>

                  {/* Strengths Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2,
                        color: '#2e7d32',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <span>💪</span> Key Strengths
                    </Typography>
                    <List sx={{ bgcolor: '#f8faf8', borderRadius: 2, p: 2 }}>
                      {feedback.feedback.map((point, index) => (
                        <ListItem 
                          key={index}
                          sx={{
                            py: 1,
                            px: 2,
                            mb: 1,
                            bgcolor: 'white',
                            borderRadius: 1,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                          }}
                        >
                          <ListItemText 
                            primary={point}
                            sx={{ '& .MuiTypography-root': { color: '#2e7d32' } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Improvements Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2,
                        color: '#d32f2f',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <span>🎯</span> Areas for Improvement
                    </Typography>
                    <List sx={{ bgcolor: '#fff8f8', borderRadius: 2, p: 2 }}>
                      {feedback.improvements.map((point, index) => (
                        <ListItem 
                          key={index}
                          sx={{
                            py: 1,
                            px: 2,
                            mb: 1,
                            bgcolor: 'white',
                            borderRadius: 1,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                          }}
                        >
                          <ListItemText 
                            primary={point}
                            sx={{ '& .MuiTypography-root': { color: '#d32f2f' } }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Detailed Analysis Section */}
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2,
                        color: '#1e3c72',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <span>📝</span> Detailed Analysis
                    </Typography>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        p: 3,
                        bgcolor: '#f8f9fa',
                        borderRadius: 2
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          lineHeight: 1.8,
                          color: '#37474f',
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {feedback.analysis}
                      </Typography>
                    </Card>
                  </Box>
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