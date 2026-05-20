import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../contexts/AuthContext';

describe('Layout Component', () => {
  const mockLogout = jest.fn();
  const mockUser = { username: 'admin' };

  test('renders layout with user info', () => {
    render(
      <AuthContext.Provider value={{ user: mockUser, logout: mockLogout }}>
        <MemoryRouter initialEntries={['/users']}>
          <Layout />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    const usersLink = screen.getByText('Users');
    expect(usersLink.closest('a')).toHaveClass('active');
  });

  test('calls logout on link click', async () => {
    render(
      <AuthContext.Provider value={{ user: mockUser, logout: mockLogout }}>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    fireEvent.click(screen.getByText(/logout/i));
    await waitFor(() => expect(mockLogout).toHaveBeenCalled());
  });
});
