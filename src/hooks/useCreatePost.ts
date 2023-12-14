import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postsApi';

export const useCreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createPost({ title, body });
    setLoading(false);
    navigate('/');
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
