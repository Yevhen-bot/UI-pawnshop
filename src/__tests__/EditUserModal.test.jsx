import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditUserModal from '../components/EditUserModal';

describe('EditUserModal Component', () => {
  const mockUser = {
    id: 1,
    first_name: 'E',
    last_name: 'N',
    email: 'e@u.c',
    phone_number: '5',
    birth_date: '1980-01-01',
  };
  const mockOnUserUpdated = jest.fn();
  const mockOnClose = jest.fn();

  test('initializes and submits', async () => {
    render(
      <EditUserModal
        isOpen
        onClose={mockOnClose}
        onUserUpdated={mockOnUserUpdated}
        user={mockUser}
      />,
    );
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'C' } });
    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    await waitFor(() => expect(mockOnUserUpdated).toHaveBeenCalled());
  });

  test('handles missing user fields', () => {
    render(
      <EditUserModal isOpen onClose={mockOnClose} onUserUpdated={mockOnUserUpdated} user={{}} />,
    );
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
  });

  test('renders nothing if not open', () => {
    const { container } = render(<EditUserModal isOpen={false} user={mockUser} />);
    expect(container.firstChild).toBeNull();
  });
});
