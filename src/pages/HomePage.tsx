import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fetchPosts } from '../api/postsApi';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress,
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
    <Container>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography variant='h4'>Posts</Typography>
        <Button
          variant='contained'
          color='primary'
          component={RouterLink}
          to='/create'
        >
          Create Post
        </Button>
      </Box>
      <List>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            button
            component={RouterLink}
            to={`/details/${post.id}`}
          >
            <ListItemText primary={post.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default HomePage;
