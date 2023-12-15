import React, { useState } from 'react';
import { usePostDetails } from '../hooks/usePostDetails';
import DOMPurify from 'dompurify';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';

const DetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleSuccess = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const validateAndUpdate = () => {
    let isValid = true;

    if (!post.title.trim()) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (!post.body.trim()) {
      setBodyError(true);
      isValid = false;
    } else {
      setBodyError(false);
    }

    if (isValid) {
      handleUpdate();
    }
  };

  const {
    post,
    setPost,
    loading,
    handleUpdate,
    handleDelete,
    handleBackToHome,
  } = usePostDetails(
    () =>
      handleSuccess(
        'Update Successful',
        'The post has been updated successfully.'
      ),
    () =>
      handleSuccess(
        'Delete Successful',
        'The post has been deleted successfully.'
      )
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedTitle = DOMPurify.sanitize(e.target.value);
    setPost({ ...post, title: sanitizedTitle });
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedBody = DOMPurify.sanitize(e.target.value);
    setPost({ ...post, body: sanitizedBody });
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
    <Container sx={{ padding: '16px' }}>
      <Typography variant='h4' gutterBottom>
        Post Details
      </Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          error={titleError}
          helperText={titleError ? "Title can't be empty" : ''}
          margin='normal'
          fullWidth
          label='Title'
          value={post.title}
          onChange={handleTitleChange}
        />
        <TextField
          error={bodyError}
          helperText={bodyError ? "Body can't be empty" : ''}
          margin='normal'
          fullWidth
          label='Body'
          multiline
          rows={4}
          value={post.body}
          onChange={handleBodyChange}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3, mb: 2, mr: 2 }}
          onClick={validateAndUpdate}
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
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        components={{
          Backdrop: Backdrop,
        }}
        componentsProps={{
          backdrop: { timeout: 500 },
        }}
      >
        <Fade in={showModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant='h6'>{modalTitle}</Typography>
            <Typography>{modalMessage}</Typography>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default DetailsPage;
