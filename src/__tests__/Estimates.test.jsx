import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Estimates from '../pages/Estimates';
import api from '../services/api';

jest.mock('../services/api');

describe('Estimates Page', () => {
  const mockEsts = [
    { id: 1, item: 10, worker: 5, date: '2023-01-01', cost: 100, reasoning: 'Fair' },
  ];
  const mockItems = [{ id: 10, name: 'Gold Ring' }];
  const mockWorkers = [{ id: 5, first_name: 'John', last_name: 'Doe' }];

  beforeEach(() => {
    api.get.mockImplementation((url) => {
      if (url === '/estimates/') return Promise.resolve({ data: mockEsts });
      if (url === '/items/') return Promise.resolve({ data: mockItems });
      if (url === '/workers/') return Promise.resolve({ data: mockWorkers });
      return Promise.reject(new Error('Not Found'));
    });
  });

  test('renders estimates list with mapped names', async () => {
    render(<Estimates />);
    await waitFor(() => {
      expect(screen.getByText('Gold Ring')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });
  });

  test('handles submission error gracefully', async () => {
    api.post.mockRejectedValue(new Error('Post fail'));
    render(<Estimates />);
    fireEvent.change(screen.getByLabelText(/item id/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /submit estimate/i }));
    // Should not crash
  });

  test('clears form on clear button click', () => {
    render(<Estimates />);
    const input = screen.getByLabelText(/item id/i);
    fireEvent.change(input, { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(input.value).toBe('');
  });
});
