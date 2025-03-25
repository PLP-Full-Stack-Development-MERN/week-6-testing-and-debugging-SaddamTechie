import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import BugForm from '../components/BugForm';
import axios from 'axios';

jest.mock('axios');

describe('BugForm', () => {
  test('renders Add Bug button and opens modal', () => {
    render(<BugForm />);
    expect(screen.getByText('Add Bug')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add Bug'));
    expect(screen.getByRole('button', { name: 'Report Bug' })).toBeInTheDocument(); // Submit button
    expect(screen.getByPlaceholderText('Bug Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByText('Report Bug', { selector: 'h2' })).toBeInTheDocument(); // Modal header
  });

  test('submits form successfully', async () => {
    axios.post.mockResolvedValue({ data: { title: 'Test Bug', description: 'Test Desc' } });
    render(<BugForm />);

    // Open modal
    fireEvent.click(screen.getByText('Add Bug'));

    // Fill form and submit
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Bug Title'), {
        target: { value: 'Test Bug' },
      });
      fireEvent.change(screen.getByPlaceholderText('Description'), {
        target: { value: 'Test Desc' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Report Bug' }));
    });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/bugs',
      { title: 'Test Bug', description: 'Test Desc' }
    );
  });

  test('displays error on submission failure', async () => {
    axios.post.mockRejectedValue(new Error('Failed'));
    render(<BugForm />);

    // Open modal
    fireEvent.click(screen.getByText('Add Bug'));

    // Fill form and submit
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Bug Title'), {
        target: { value: 'Test Bug' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Report Bug' }));
    });

    expect(await screen.findByText('Failed to submit bug')).toBeInTheDocument();
  });
});