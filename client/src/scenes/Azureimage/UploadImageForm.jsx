import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Paper, Box, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Input = styled('input')({
  display: 'none',
});

const StyledButton = styled(Button)({
  margin: '20px 0',
});

const UploadImageForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f7f7f7">
      <Paper elevation={2} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Upload Image
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Input accept="image/*" id="file-input" type="file" onChange={handleFileChange} />
          <label htmlFor="file-input">
            <StyledButton variant="outlined" component="span" startIcon={<CloudUploadIcon />} fullWidth>
              Choose Image
            </StyledButton>
          </label>
          {fileName && <Typography variant="subtitle1">{fileName}</Typography>}
          <StyledButton type="submit" variant="contained" color="primary" fullWidth>
            Upload
          </StyledButton>
        </form>
      </Paper>
    </Box>
  );
};

export default UploadImageForm;
