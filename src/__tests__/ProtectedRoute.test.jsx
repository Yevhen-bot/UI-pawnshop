import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthContext } from '../contexts/AuthContext';

describe('ProtectedRoute', () => {
  test('renders loading when auth is loading', () => {
    const authValue = { user: null, loading: true };
    render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter>
          <ProtectedRoute />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('redirects to login when no user', () => {
    const authValue = { user: null, loading: false };
    render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<div>Secret</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders outlet when user is authenticated', () => {
    const authValue = { user: { username: 'val' }, loading: false };
    render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<div>Secret</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });
});
