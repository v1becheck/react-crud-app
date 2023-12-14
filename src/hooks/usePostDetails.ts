import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost, deletePost } from '../api/postsApi';

export const usePostDetails = () => {
  const [post, setPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id)).then((response) => {
        console.log('Fetched post details:', response.data);
        setPost(response.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    console.log('Updating post:', post);
    await updatePost(parseInt(id), post);
    setLoading(false);
    navigate('/');
  };

  const handleDelete = async () => {
    setLoading(true);
    console.log('Deleting post with ID:', id);
    await deletePost(parseInt(id));
    setLoading(false);
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return {
    post,
    setPost,
    loading,
    handleUpdate,
    handleDelete,
    handleBackToHome,
  };
};
