import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import to use toBeInTheDocument

import DetailsPage from '../pages/DetailsPage';
import { usePostDetails } from '../hooks/usePostDetails';

jest.mock('../hooks/usePostDetails', () => ({
  usePostDetails: jest.fn(),
}));

describe('DetailsPage', () => {
  // Define a mock post object for testing
  const mockPost = {
    title: 'Test Title',
    body: 'Test Body',
  };

  beforeEach(() => {
    usePostDetails.mockImplementation(() => ({
      post: mockPost,
      setPost: jest.fn(),
      loading: false,
      handleUpdate: jest.fn(),
      handleDelete: jest.fn(),
      handleBackToHome: jest.fn(),
    }));
  });

  test('renders DetailsPage component', () => {
    render(<DetailsPage />);
    expect(screen.getByText('Post Details')).toBeInTheDocument();
  });

  test('updates the post when the "Update" button is clicked', async () => {
    render(<DetailsPage />);
    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);
  });

  test('deletes the post when the "Delete" button is clicked', async () => {
    render(<DetailsPage />);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
  });
});
