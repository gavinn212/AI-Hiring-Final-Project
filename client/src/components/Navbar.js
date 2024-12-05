import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3f6bc1 100%)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ 
          flexGrow: 1, 
          textDecoration: 'none', 
          color: 'white' 
        }}>
          SkillMatch AI
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/job-seeker">
            Job Seekers
          </Button>
          <Button color="inherit" component={Link} to="/employer">
            Employers
          </Button>
          <Button color="inherit" component={Link} to="/jobs">
            Browse Jobs
          </Button>
          <Button color="inherit" component={Link} to="/interview-prep">
            Interview Prep
          </Button>
          <Button color="inherit" component={Link} to="/skill-assessment">
            Skill Assessment
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 