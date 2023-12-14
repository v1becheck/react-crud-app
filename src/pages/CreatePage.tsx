import React, { useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
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

const CreatePage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSuccess = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const {
    title,
    setTitle,
    body,
    setBody,
    loading,
    handleSubmit,
    handleBackToHome,
  } = useCreatePost(handleSuccess);

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Create Post
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          label='Title'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          label='Body'
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
        <Button variant='outlined' sx={{ mt: 2 }} onClick={handleBackToHome}>
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
            <Typography variant='h6'>Post Created Successfully</Typography>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default CreatePage;
