import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button,
  Grid,
  Chip,
  Container,
  CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1e3c72', fontWeight: 700 }}>
          Available Jobs
        </Typography>
        <Grid container spacing={3}>
          {jobs.map(job => (
            <Grid item xs={12} md={6} key={job.id}>
              <Card sx={{ 
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 3
                }
              }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ color: '#1e3c72' }}>
                    {job.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography color="text.secondary">
                      {job.company_name}
                    </Typography>
                  </Box>

                  <Typography color="text.secondary" paragraph>
                    {job.description}
                  </Typography>

                  {job.required_skills && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                      {job.required_skills.split(',').map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill.trim()} 
                          sx={{ 
                            mr: 1, 
                            mb: 1,
                            bgcolor: '#e3f2fd'
                          }} 
                        />
                      ))}
                    </Box>
                  )}

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                  }}>
                    {job.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon sx={{ mr: 0.5, color: 'text.secondary' }} />
                        <Typography color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                    )}
                    <Button 
                      variant="contained" 
                      sx={{
                        bgcolor: '#1e3c72',
                        '&:hover': {
                          bgcolor: '#2a5298'
                        }
                      }}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default JobList; 