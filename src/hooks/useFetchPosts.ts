import { useState, useEffect } from 'react';
import { fetchPosts as fetchPostsAPI } from '../api/postsApi';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostsAPI().then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  return { posts, loading };
};
