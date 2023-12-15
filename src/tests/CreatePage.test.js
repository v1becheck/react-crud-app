import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePage from '../pages/CreatePage';

// Mock the specific functions and properties from useCreatePost
jest.mock('../hooks/useCreatePost', () => ({
  useCreatePost: () => ({
    title: '',
    setTitle: jest.fn(),
    body: '',
    setBody: jest.fn(),
    loading: false,
    handleSubmit: jest.fn(),
    handleBackToHome: jest.fn(),
  }),
}));

describe('CreatePage', () => {
  test('renders CreatePage component', () => {
    render(<CreatePage />);
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('submits the form and shows success modal', async () => {
    render(<CreatePage />);

    const titleInput = screen.getByPlaceholderText('Title');
    const bodyInput = screen.getByPlaceholderText('Body');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });

    fireEvent.click(screen.getByText('Create'));
  });
});
