import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, updatePost, deletePost } from '../api/postsApi';

export const usePostDetails = (
  onUpdateSuccess: (title: string, message: string) => void,
  onDeleteSuccess: (title: string, message: string) => void
) => {
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
    try {
      await updatePost(parseInt(id), post);
      console.log('Updated post:', post);
      if (onUpdateSuccess && id) {
        onUpdateSuccess(id, 'The post has been updated successfully.');
        setTimeout(() => navigate('/'), 2100);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(parseInt(id));
      console.log('Deleted post with ID:', id);
      if (onDeleteSuccess && id) {
        onDeleteSuccess(id, 'The post has been deleted successfully.');
        setTimeout(() => navigate('/'), 2100);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
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
