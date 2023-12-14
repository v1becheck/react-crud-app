import React from 'react';
import { usePostDetails } from '../hooks/usePostDetails';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const DetailsPage = () => {
  const {
    post,
    setPost,
    loading,
    handleUpdate,
    handleDelete,
    handleBackToHome,
  } = usePostDetails();

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ padding: '16px' }}>
      <Typography variant='h4' gutterBottom>
        Post Details
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          fullWidth
          label='Title'
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Body'
          multiline
          rows={4}
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3, mb: 2, mr: 2 }}
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          variant='contained'
          color='error'
          sx={{ mt: 3, mb: 2, mr: 2 }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          variant='outlined'
          sx={{ mt: 3, mb: 2 }}
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default DetailsPage;
