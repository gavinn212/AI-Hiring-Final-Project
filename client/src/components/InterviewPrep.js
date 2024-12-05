import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Tabs,
    Tab,
    Divider,
    Paper,
    Rating
} from '@mui/material';
import axios from 'axios';

const commonQuestions = [
    {
        category: "Background",
        questions: [
            "Tell me about yourself",
            "What are your greatest strengths?",
            "What are your greatest weaknesses?",
            "Why do you want to work here?"
        ]
    },
    {
        category: "Experience",
        questions: [
            "Describe a challenging situation at work and how you handled it",
            "Tell me about a project you're most proud of",
            "How do you handle conflict with coworkers?",
            "What's your biggest professional achievement?"
        ]
    },
    {
        category: "Technical",
        questions: [
            "How do you stay updated with industry trends?",
            "Describe your problem-solving approach",
            "How do you handle technical disagreements in a team?",
            "What's your experience with [relevant technology]?"
        ]
    }
];

function InterviewPrep() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
        setSelectedQuestion('');
        setFeedback(null);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/interview-feedback', {
                question: selectedQuestion,
                answer
            });
            setFeedback(response.data);
        } catch (error) {
            console.error('Error getting feedback:', error);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                AI Interview Preparation
            </Typography>

            <Paper sx={{ mb: 4 }}>
                <Tabs
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    variant="fullWidth"
                >
                    {commonQuestions.map((category, index) => (
                        <Tab key={index} label={category.category} />
                    ))}
                </Tabs>
            </Paper>

            <Box sx={{ display: 'flex', gap: 4 }}>
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" gutterBottom>
                        Select a Question:
                    </Typography>
                    <List>
                        {commonQuestions[selectedCategory].questions.map((question, index) => (
                            <ListItem 
                                button 
                                key={index}
                                selected={selectedQuestion === question}
                                onClick={() => setSelectedQuestion(question)}
                            >
                                <ListItemText primary={question} />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ width: '70%' }}>
                    {selectedQuestion && (
                        <Box sx={{ mb: 4 }}>
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
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={loading || !answer}
                                sx={{ mt: 2 }}
                            >
                                Get AI Feedback
                            </Button>
                        </Box>
                    )}

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    )}

                    {feedback && (
                        <Card sx={{ mt: 4 }}>
                            <CardContent>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Overall Score
                                    </Typography>
                                    <Rating 
                                        value={feedback.score / 20} 
                                        readOnly 
                                        precision={0.5}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        {feedback.score}/100
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="h6" gutterBottom>
                                    Strengths
                                </Typography>
                                <List>
                                    {feedback.feedback.map((point, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={point} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="h6" gutterBottom>
                                    Areas for Improvement
                                </Typography>
                                <List>
                                    {feedback.improvements.map((point, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={point} />
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="h6" gutterBottom>
                                    Detailed Analysis
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {feedback.analysis}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="h6" gutterBottom>
                                    Sample Strong Answer
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {feedback.sampleAnswer}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default InterviewPrep; 