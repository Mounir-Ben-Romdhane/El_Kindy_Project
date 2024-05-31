import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Container, Paper } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: '#333',
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2, 0),
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(2, 0),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  error: {
    color: 'red',
    marginTop: theme.spacing(2),
  },
  title: {
    color: 'white',
    marginBottom: theme.spacing(2),
  },
}));

function UploadImageForm() {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Upload a File
      </Typography>
      <form onSubmit={handleSubmit}>
        <input
          accept="image/*, .pdf"
          className={classes.input}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
            className={classes.button}
          >
            Choose File
          </Button>
        </label>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
        {errorMessage && (
          <Typography variant="body2" className={classes.error}>
            {errorMessage}
          </Typography>
        )}
      </form>
    </Paper>
  );
}

function Index() {
  return (
    <div>
      <title>Eduport - LMS, Education and Course Theme</title>
      {/* Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="author" content="Webestica.com" />
      <meta name="description" content="Eduport- LMS, Education and Course Theme" />
      {/* Favicon */}
      <link rel="shortcut icon" href="assets/images/favicon.ico" />
      {/* Google Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" />
      {/* Plugins CSS */}
      <link rel="stylesheet" type="text/css" href="assets/vendor/font-awesome/css/all.min.css" />
      <link rel="stylesheet" type="text/css" href="assets/vendor/bootstrap-icons/bootstrap-icons.css" />
      {/* Theme CSS */}
      <link id="style-switch" rel="stylesheet" type="text/css" href="assets/css/style.css" />
      <header className="navbar-light navbar-sticky">
        <nav className="navbar navbar-expand-xl">
          <div className="container">
            {/* Profile and other elements here */}
          </div>
        </nav>
      </header>
      <main>
        <Container>
          <UploadImageForm />
          {/* Other page elements */}
        </Container>
      </main>
      <footer className="footer">
        {/* Footer content here */}
      </footer>
    </div>
  );
}

export default Index;
