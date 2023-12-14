import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost, deletePost } from '../api/postsApi';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const DetailsPage = () => {
  const [post, setPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id)).then((response) => {
        setPost(response.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    if (id) {
      await updatePost(parseInt(id), post);
      setLoading(false);
      navigate('/');
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (id) {
      await deletePost(parseInt(id));
      setLoading(false);
      navigate('/');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

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
    <Container>
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
