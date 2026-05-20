import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateUserModal from '../components/CreateUserModal';

describe('CreateUserModal Component', () => {
  const mockRoles = [{ id: 1, role: 'Admin' }];
  const mockStores = [{ id: 1, name: 'Store 1' }];
  const mockOnUserCreated = jest.fn();
  const mockOnClose = jest.fn();

  test('calls onUserCreated with form data', async () => {
    render(
      <CreateUserModal
        isOpen
        onClose={mockOnClose}
        onUserCreated={mockOnUserCreated}
        roles={mockRoles}
        stores={mockStores}
      />,
    );

    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'New' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@user.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/birth date/i), { target: { value: '2000-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /^create user$/i }));

    await waitFor(() => {
      expect(mockOnUserCreated).toHaveBeenCalledWith(
        expect.objectContaining({
          first_name: 'New',
          email: 'new@user.com',
        }),
      );
    });
  });

  test('handles empty roles or stores', () => {
    const { rerender } = render(
      <CreateUserModal
        isOpen
        onClose={mockOnClose}
        onUserCreated={mockOnUserCreated}
        roles={[]}
        stores={[]}
      />,
    );
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();

    rerender(
      <CreateUserModal
        isOpen
        onClose={mockOnClose}
        onUserCreated={mockOnUserCreated}
        roles={mockRoles}
        stores={mockStores}
      />,
    );
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  test('renders nothing if not open', () => {
    const { container } = render(
      <CreateUserModal
        isOpen={false}
        onClose={mockOnClose}
        onUserCreated={mockOnUserCreated}
        roles={mockRoles}
        stores={mockStores}
      />,
    );
    expect(container.firstChild).toBeNull();
  });
});
