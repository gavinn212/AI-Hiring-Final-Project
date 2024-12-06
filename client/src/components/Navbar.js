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
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ width: '200px', textAlign: 'left', color: 'white' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            MG 9781
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
            Final Project Prototype
          </Typography>
        </Box>
        <Typography variant="h6" component={Link} to="/" sx={{ 
          textDecoration: 'none', 
          color: 'white',
          textAlign: 'center'
        }}>
          SkillMatch AI
        </Typography>
        <Box sx={{ width: '200px', textAlign: 'right', color: 'white' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Tinghao Zhang (Gavin)
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
            @NYU Tandon
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 