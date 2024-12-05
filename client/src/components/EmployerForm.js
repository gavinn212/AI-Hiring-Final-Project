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

function EmployerForm() {
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    industry: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employers', formData);
      setSnackbarMessage('Employer profile created successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setFormData({ company_name: '', email: '', industry: '' });
    } catch (error) {
      setSnackbarMessage('Error creating profile');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h4" gutterBottom>
        Create Employer Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Company Name"
          margin="normal"
          value={formData.company_name}
          onChange={(e) => setFormData({...formData, company_name: e.target.value})}
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
          label="Industry"
          margin="normal"
          value={formData.industry}
          onChange={(e) => setFormData({...formData, industry: e.target.value})}
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

export default EmployerForm; 