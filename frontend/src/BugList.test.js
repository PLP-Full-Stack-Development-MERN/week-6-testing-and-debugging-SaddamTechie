import { render, screen, fireEvent } from '@testing-library/react';
import BugList from './components/BugList';
import axios from 'axios';

jest.mock('axios');

describe('BugList', () => {
  test('renders loading state', () => {
    render(<BugList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders bugs list', async () => {
    const mockBugs = [
      { _id: '1', title: 'Bug 1', status: 'open' },
      { _id: '2', title: 'Bug 2', status: 'in-progress' }
    ];
    axios.get.mockResolvedValue({ data: mockBugs });
    
    render(<BugList />);
    await screen.findByText('Bug 1');
    
    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
  });

  test('handles status update', async () => {
    const mockBug = { _id: '1', title: 'Bug 1', status: 'open' };
    axios.get.mockResolvedValue({ data: [mockBug] });
    axios.put.mockResolvedValue({ data: { ...mockBug, status: 'resolved' } });
    
    render(<BugList />);
    await screen.findByText('Bug 1');
    
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'resolved' }
    });
    
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:5000/api/bugs/1',
      { status: 'resolved' }
    );
  });
});