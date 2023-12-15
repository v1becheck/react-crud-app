import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postsApi';

export const useCreatePost = (onSuccess: () => void) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createPost({ title, body });
      console.log('Created post:', response.data);
      if (onSuccess) {
        onSuccess();
        setTimeout(() => navigate('/'), 2100);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return {
    title,
    setTitle,
    body,
    setBody,
    loading,
    handleSubmit,
    handleBackToHome,
  };
};
