import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import BugList from '../components/BugList';
import axios from 'axios';
import { toast } from 'sonner';

jest.mock('axios');
jest.mock('sonner', () => ({
  toast: jest.fn(),
}));

describe('BugList', () => {
  test('renders loading state', () => {
    render(<BugList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders bugs list', async () => {
    const mockBugs = [
      { _id: '1', title: 'Bug 1', status: 'open' },
      { _id: '2', title: 'Bug 2', status: 'in-progress' },
    ];
    axios.get.mockResolvedValue({ data: mockBugs });
    
    await act(async () => {
      render(<BugList />);
    });
    
    expect(await screen.findByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
  });

  test('handles status update', async () => {
    const mockBugs = [{ _id: '1', title: 'Bug 1', status: 'open' }];
    axios.get.mockResolvedValue({ data: mockBugs });
    axios.put.mockResolvedValue({ data: { _id: '1', title: 'Bug 1', status: 'resolved' } });
    
    await act(async () => {
      render(<BugList />);
    });
    
    const select = await screen.findByRole('combobox');
    
    await act(async () => {
      fireEvent.change(select, { target: { value: 'resolved' } });
    });
    
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:5000/api/bugs/1',
      { status: 'resolved' }
    );
    expect(toast).toHaveBeenCalledWith('Status updated successfully');
  });

  test('handles delete', async () => {
    const mockBugs = [{ _id: '1', title: 'Bug 1', status: 'open' }];
    axios.get.mockResolvedValue({ data: mockBugs });
    axios.delete.mockResolvedValue({});
    
    await act(async () => {
      render(<BugList />);
    });
    
    const deleteButton = await screen.findByText('Delete');
    
    await act(async () => {
      fireEvent.click(deleteButton);
    });
    
    expect(axios.delete).toHaveBeenCalledWith('http://localhost:5000/api/bugs/1');
    expect(toast).toHaveBeenCalledWith('Bug deleted successfully');
  });
});