import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock child components to simplify App test
jest.mock('../pages/Login', () => () => <div>Login Page</div>);
jest.mock('../components/ProtectedRoute', () => ({ children }) => <div>{children}</div>);
jest.mock('../components/Layout', () => ({ children }) => <div>{children}</div>);

describe('App Component', () => {
  test('renders login page by default', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
