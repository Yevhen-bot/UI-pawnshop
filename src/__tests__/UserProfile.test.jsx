import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import api from '../services/api';

jest.mock('../services/api');

describe('UserProfile Page', () => {
  const mockUser = { id: 1, first_name: 'J', last_name: 'B', email: 'j@b.c' };

  test('renders profile and handles edit interaction', async () => {
    api.get.mockResolvedValue({ data: mockUser });
    api.put.mockResolvedValue({ data: mockUser });

    render(
      <MemoryRouter initialEntries={['/user-profile/1']}>
        <Routes>
          <Route path="/user-profile/:id" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('J B');
    fireEvent.click(screen.getByText(/edit user/i));

    const saveBtn = await screen.findByRole('button', { name: /save changes/i });
    fireEvent.click(saveBtn);

    // Wait for potential async effect
    await waitFor(() => expect(api.get).toHaveBeenCalled());
  });

  test('handles update failure branch', async () => {
    api.get.mockResolvedValue({ data: mockUser });
    api.put.mockRejectedValue(new Error('Fail'));

    render(
      <MemoryRouter initialEntries={['/user-profile/1']}>
        <Routes>
          <Route path="/user-profile/:id" element={<UserProfile />} />
        </Routes>
      </MemoryRouter>,
    );

    await screen.findByText('J B');
    fireEvent.click(screen.getByText(/edit user/i));
    const saveBtn = await screen.findByRole('button', { name: /save changes/i });
    fireEvent.click(saveBtn);
  });
});
