import React, { useEffect, useState, useMemo } from 'react';
import { useFetchPosts } from '../hooks/useFetchPosts';
import { Link as RouterLink } from 'react-router-dom';

import {
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';

const HomePage = () => {
  const { posts, loading } = useFetchPosts();

  const limitedPosts = useMemo(() => posts.slice(0, 15), [posts]);

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
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography variant='h4'>Posts</Typography>
        <Button
          component={RouterLink}
          to='/create'
          variant='contained'
          color='primary'
        >
          Create Post
        </Button>
      </Box>

      <Grid container spacing={3}>
        {limitedPosts.map((post) => (
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
