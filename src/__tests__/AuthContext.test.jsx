import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

jest.mock('../services/api');

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('AuthProvider initializes with no user if no token', async () => {
    let capturedUser;
    const TestComponent = () => {
      const { user, loading } = React.useContext(AuthContext);
      if (!loading) capturedUser = user;
      return null;
    };

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );
    });

    expect(capturedUser).toBeNull();
  });

  test('AuthProvider fetches user if token exists', async () => {
    localStorage.setItem('token', 'fake-token');
    const mockUser = { username: 'testuser' };
    api.get.mockResolvedValueOnce({ data: mockUser });

    let capturedUser;
    const TestComponent = () => {
      const { user, loading } = React.useContext(AuthContext);
      if (!loading) capturedUser = user;
      return null;
    };

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );
    });

    expect(api.get).toHaveBeenCalledWith('/api/auth/user/');
    expect(capturedUser).toEqual(mockUser);
  });

  test('login sets token and user', async () => {
    api.post.mockResolvedValueOnce({ data: { key: 'new-token' } });
    const mockUser = { username: 'logged-in' };
    api.get.mockResolvedValueOnce({ data: mockUser });

    let loginFn;
    let capturedUser;
    const TestComponent = () => {
      const { user, login } = React.useContext(AuthContext);
      loginFn = login;
      capturedUser = user;
      return null;
    };

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );
    });

    await act(async () => {
      await loginFn('user', 'pass');
    });

    expect(localStorage.getItem('token')).toBe('new-token');
    expect(capturedUser).toEqual(mockUser);
  });

  test('AuthProvider clears token on init error', async () => {
    localStorage.setItem('token', 'bad-token');
    api.get.mockRejectedValueOnce(new Error('Unauthorized'));

    await act(async () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {({ loading }) => (loading ? 'Loading' : 'Done')}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
    });

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  test('logout handles api failure gracefully', async () => {
    localStorage.setItem('token', 'token');
    api.get.mockResolvedValueOnce({ data: { username: 'user' } });
    api.post.mockRejectedValueOnce(new Error('Network Error'));

    let logoutFn;
    const TestComponent = () => {
      const { logout } = React.useContext(AuthContext);
      logoutFn = logout;
      return null;
    };

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );
    });

    await act(async () => {
      try {
        await logoutFn();
      } catch (e) {
        // ignore
      }
    });

    expect(localStorage.getItem('token')).toBeNull();
  });
});
