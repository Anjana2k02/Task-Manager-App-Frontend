import React, { useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Paper } from '@mui/material';

const mentalStatusOptions = [
  'Happy', 'Stressed', 'Anxious', 'Calm', 'Depressed', 'Motivated'
];

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mentalStatus: '',
    email: '',
    recommendation: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = 'Name is required';
    if (!formData.mentalStatus.trim()) validationErrors.mentalStatus = 'Mental status is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) validationErrors.email = 'Invalid email format';
    if (!formData.recommendation.trim()) validationErrors.recommendation = 'Recommendation is required';

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Request submitted successfully!');
      setFormData({ name: '', mentalStatus: '', email: '', recommendation: '' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" gutterBottom>Request Form</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField 
            select 
            fullWidth 
            label="Mental Status" 
            name="mentalStatus" 
            value={formData.mentalStatus} 
            onChange={handleChange} 
            error={!!errors.mentalStatus}
            helperText={errors.mentalStatus}
            margin="normal"
          >
            {mentalStatusOptions.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>
          <TextField 
            fullWidth 
            label="Email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <TextField 
            fullWidth 
            label="Recommendation" 
            name="recommendation" 
            value={formData.recommendation} 
            onChange={handleChange} 
            error={!!errors.recommendation}
            helperText={errors.recommendation}
            multiline 
            rows={4} 
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RequestForm;
