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
    LinearProgress
} from '@mui/material';
import axios from 'axios';

function SkillAssessment() {
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/assess-skills', {
                skills,
                experience
            });
            setAssessment(response.data);
        } catch (error) {
            console.error('Error getting assessment:', error);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                AI Skill Assessment
            </Typography>

            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label="Your Skills"
                    margin="normal"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Enter your skills (comma separated)"
                    helperText="Example: JavaScript, Python, React, SQL"
                />

                <TextField
                    fullWidth
                    label="Experience"
                    margin="normal"
                    multiline
                    rows={4}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Describe your relevant work experience"
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading || !skills || !experience}
                    sx={{ mt: 2 }}
                >
                    Analyze Skills
                </Button>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {assessment && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Market Demand Analysis
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="textSecondary">
                                Market Demand Score
                            </Typography>
                            <LinearProgress 
                                variant="determinate" 
                                value={assessment.marketDemand} 
                                sx={{ mt: 1, mb: 1 }}
                            />
                            <Typography variant="body2">
                                {Math.round(assessment.marketDemand)}%
                            </Typography>
                        </Box>

                        <Typography variant="subtitle1" gutterBottom>
                            In-Demand Skills You Have:
                        </Typography>
                        <List>
                            {assessment.matchedSkills.map((skill, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={skill.toUpperCase()} />
                                </ListItem>
                            ))}
                        </List>

                        <Typography variant="subtitle1" gutterBottom>
                            Recommendations:
                        </Typography>
                        <List>
                            {assessment.recommendations.map((rec, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={rec} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default SkillAssessment; 