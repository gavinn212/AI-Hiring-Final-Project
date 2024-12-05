import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert,
  Snackbar 
} from '@mui/material';
import axios from 'axios';

function JobSeekerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobseekers', formData);
      setSnackbarMessage('Profile created successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setFormData({ name: '', email: '', skills: '', experience: '' });
    } catch (error) {
      setSnackbarMessage('Error creating profile');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h4" gutterBottom>
        Create Job Seeker Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <TextField
          fullWidth
          label="Skills"
          margin="normal"
          multiline
          rows={3}
          placeholder="Enter skills (comma separated)"
          value={formData.skills}
          onChange={(e) => setFormData({...formData, skills: e.target.value})}
        />
        <TextField
          fullWidth
          label="Experience"
          margin="normal"
          multiline
          rows={4}
          value={formData.experience}
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          fullWidth
        >
          Create Profile
        </Button>
      </form>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default JobSeekerForm; 