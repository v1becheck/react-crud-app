import React from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const CreatePage = () => {
  const {
    title,
    setTitle,
    body,
    setBody,
    loading,
    handleSubmit,
    handleBackToHome,
  } = useCreatePost();

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Create Post
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          label='Title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Body'
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
        <Button variant='outlined' sx={{ mt: 2 }} onClick={handleBackToHome}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePage;
