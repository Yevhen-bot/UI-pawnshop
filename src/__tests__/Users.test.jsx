import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Users from '../pages/Users';
import api from '../services/api';

jest.mock('../services/api');

describe('Users Page', () => {
  const mockUsers = [
    { id: 1, first_name: 'John', last_name: 'Doe', role: 1, birth_date: '1990-01-01' },
  ];

  test('renders user list and handles delete success', async () => {
    api.get.mockResolvedValue({ data: mockUsers });
    api.delete.mockResolvedValue({ status: 204 });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );
    await screen.findByText('John Doe');
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => expect(api.delete).toHaveBeenCalled());
  });

  test('handles creation error message object parsing', async () => {
    api.get.mockResolvedValue({ data: mockUsers });
    api.post.mockRejectedValue({ response: { data: { email: ['error'] } } });

    const { container } = render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );
    await screen.findByText(/user list/i);
    fireEvent.click(screen.getByText(/\+ create user/i));

    const form = container.querySelector('#create-user-form');
    fireEvent.submit(form);

    await waitFor(() => expect(api.post).toHaveBeenCalled());
  });
});
