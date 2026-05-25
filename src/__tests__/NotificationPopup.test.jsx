import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationContext } from '../contexts/NotificationContext';
import NotificationPopup from '../components/NotificationPopup';

describe('NotificationPopup Component', () => {
  const mockRemoveNotification = jest.fn();

  test('renders nothing when no notifications', () => {
    const { container } = render(
      <NotificationContext.Provider
        value={{ notifications: [], removeNotification: mockRemoveNotification }}
      >
        <NotificationPopup />
      </NotificationContext.Provider>,
    );

    expect(container.innerHTML).toBe('');
  });

  test('renders notification with correct content', () => {
    const notifications = [{ id: 1, title: 'Test Title', message: 'Test Message', type: 'info' }];

    render(
      <NotificationContext.Provider
        value={{ notifications, removeNotification: mockRemoveNotification }}
      >
        <NotificationPopup />
      </NotificationContext.Provider>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message').closest('.notification')).toHaveClass(
      'notification-info',
    );
  });

  test('renders multiple notifications', () => {
    const notifications = [
      { id: 1, title: 'First', message: 'First msg', type: 'info' },
      { id: 2, title: 'Second', message: 'Second msg', type: 'error' },
    ];

    render(
      <NotificationContext.Provider
        value={{ notifications, removeNotification: mockRemoveNotification }}
      >
        <NotificationPopup />
      </NotificationContext.Provider>,
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Second').closest('.notification')).toHaveClass('notification-error');
  });

  test('calls removeNotification on close button click', () => {
    const notifications = [{ id: 42, title: 'Close Me', message: 'Click X', type: 'warning' }];

    render(
      <NotificationContext.Provider
        value={{ notifications, removeNotification: mockRemoveNotification }}
      >
        <NotificationPopup />
      </NotificationContext.Provider>,
    );

    const closeBtn = screen.getByText('\u00D7');
    fireEvent.click(closeBtn);

    expect(mockRemoveNotification).toHaveBeenCalledWith(42);
  });
});
