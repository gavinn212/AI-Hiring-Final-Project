import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
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