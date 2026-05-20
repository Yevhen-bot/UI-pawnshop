import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import { AuthContext } from '../contexts/AuthContext';

describe('Login Page', () => {
  test('renders login form', () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('shows error message on login failure', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Auth failed'));
    render(
      <AuthContext.Provider value={{ login: mockLogin, user: null }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'u' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'p' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await screen.findByText(/invalid credentials/i);
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('redirects if user exists', () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1 } }}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<div>Target</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Target')).toBeInTheDocument();
  });
});
