import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button,
  Grid,
  Chip
} from '@mui/material';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhos~t:5000/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map(job => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {job.description}
                </Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  {job.required_skills.split(',').map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill.trim()} 
                      sx={{ mr: 1, mb: 1 }} 
                    />
                  ))}
                </Box>
                <Button variant="contained" color="primary">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default JobList; 