import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchPosts } from '../api/postsApi';
import {
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='80vh'
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ padding: '16px' }}>
      <Typography variant='h4' gutterBottom>
        Post Listing
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Container
              sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant='h6' gutterBottom>
                {post.title}
              </Typography>
              <Typography>{post.body}</Typography>
              <Button
                component={RouterLink}
                to={`/details/${post.id}`}
                variant='outlined'
                color='primary'
                sx={{ marginTop: 'auto' }}
              >
                View Details
              </Button>
            </Container>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
