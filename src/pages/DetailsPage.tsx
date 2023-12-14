import React, { useState } from 'react';
import { usePostDetails } from '../hooks/usePostDetails';
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

  const handleSuccess = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
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
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
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
