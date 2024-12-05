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
    CircularProgress
} from '@mui/material';
import axios from 'axios';

const commonQuestions = [
    "Tell me about yourself",
    "What are your greatest strengths?",
    "Where do you see yourself in 5 years?",
    "Why should we hire you?",
    "Describe a challenging situation at work and how you handled it"
];

function InterviewPrep() {
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);

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

            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Select a Practice Question:
                </Typography>
                <List>
                    {commonQuestions.map((question, index) => (
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

            {selectedQuestion && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Your Answer:
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
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
                        <Typography variant="h6" gutterBottom>
                            Feedback Score: {feedback.score}/100
                        </Typography>
                        
                        <Typography variant="subtitle1" gutterBottom>
                            Positive Points:
                        </Typography>
                        <List>
                            {feedback.feedback.map((point, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={point} />
                                </ListItem>
                            ))}
                        </List>

                        {feedback.improvements.length > 0 && (
                            <>
                                <Typography variant="subtitle1" gutterBottom>
                                    Areas for Improvement:
                                </Typography>
                                <List>
                                    {feedback.improvements.map((point, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={point} />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default InterviewPrep; 