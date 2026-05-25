import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { NotificationContext, NotificationProvider } from '../contexts/NotificationContext';

class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = WebSocket.OPEN;
    setTimeout(() => this.onopen && this.onopen(), 0);
  }

  // eslint-disable-next-line class-methods-use-this
  send() {}

  close() {
    setTimeout(() => this.onclose && this.onclose(), 0);
  }
}

beforeAll(() => {
  global.WebSocket = MockWebSocket;
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('NotificationContext', () => {
  test('adds and removes notification', () => {
    function TestConsumer() {
      const ctx = React.useContext(NotificationContext);
      return (
        <div>
          <span data-testid="count">{ctx.notifications.length}</span>
          {ctx.notifications.map((n) => (
            <span key={n.id} data-testid={`notification-${n.id}`}>
              {n.title}:{n.message}
            </span>
          ))}
          <button
            type="button"
            data-testid="add"
            onClick={() => ctx.addNotification('Test', 'Hello', 'info')}
          >
            Add
          </button>
          <button type="button" data-testid="remove" onClick={() => ctx.removeNotification(1)}>
            Remove
          </button>
        </div>
      );
    }

    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>,
    );

    expect(screen.getByTestId('count').textContent).toBe('0');

    act(() => {
      fireEvent.click(screen.getByTestId('add'));
    });

    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('notification-1').textContent).toMatch('Test');
    expect(screen.getByTestId('notification-1').textContent).toMatch('Hello');

    act(() => {
      fireEvent.click(screen.getByTestId('remove'));
    });

    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  test('notification auto-removes after 5 seconds', () => {
    let contextValue;
    function TestConsumer() {
      contextValue = React.useContext(NotificationContext);
      return (
        <div>
          <span data-testid="count">{contextValue.notifications.length}</span>
        </div>
      );
    }

    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>,
    );

    act(() => {
      contextValue.addNotification('Auto', 'Remove me', 'info');
    });

    expect(screen.getByTestId('count').textContent).toBe('1');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  test('addNotification creates notification with correct type', () => {
    let ctx;
    function TestConsumer() {
      ctx = React.useContext(NotificationContext);
      return <span data-testid="count">{ctx.notifications.length}</span>;
    }

    render(
      <NotificationProvider>
        <TestConsumer />
      </NotificationProvider>,
    );

    act(() => {
      ctx.addNotification('Error', 'Something went wrong', 'error');
    });

    expect(ctx.notifications[0].type).toBe('error');
    expect(ctx.notifications[0].title).toBe('Error');
    expect(ctx.notifications[0].message).toBe('Something went wrong');
  });
});
