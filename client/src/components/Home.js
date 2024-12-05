import React from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Welcome to SkillMatch AI
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Connecting Talent with Opportunity through AI Innovation
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/job-seeker')}
          >
            Get Started as Job Seeker
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => navigate('/employer')}
          >
            Get Started as Employer
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home; 