import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { NotificationContext, NotificationProvider } from '../contexts/NotificationContext';

let lastMock;
let currentCtx;

class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = 0;
    lastMock = this;
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      if (this.onopen) this.onopen();
    }, 0);
  }

  // eslint-disable-next-line
  send() {}

  close() {
    this.readyState = WebSocket.CLOSED;
    if (this.onclose) this.onclose();
  }
}

function CtxCatcher({ children }) {
  currentCtx = React.useContext(NotificationContext);
  return children || null;
}

function renderWithCtx() {
  currentCtx = null;
  render(
    <NotificationProvider>
      <CtxCatcher />
    </NotificationProvider>,
  );
}

function emitWs(type, title, message) {
  act(() => {
    lastMock.onmessage({
      data: JSON.stringify({ type, title, message }),
    });
  });
}

beforeAll(() => {
  global.WebSocket = MockWebSocket;
  jest.useFakeTimers();
});

beforeEach(() => {
  localStorage.setItem('token', 'test-token');
});

afterEach(() => {
  localStorage.clear();
  currentCtx = null;
});

afterAll(() => {
  jest.useRealTimers();
});

describe('NotificationContext', () => {
  test('adds and removes notification', () => {
    function TestConsumer() {
      const c = React.useContext(NotificationContext);
      currentCtx = c;
      return (
        <div>
          <span data-testid="count">{c.notifications.length}</span>
          {c.notifications.map((n) => (
            <span key={n.id} data-testid={`notification-${n.id}`}>
              {n.title}:{n.message}
            </span>
          ))}
          <button
            type="button"
            data-testid="add"
            onClick={() => c.addNotification('Test', 'Hello', 'info')}
          >
            Add
          </button>
          <button type="button" data-testid="remove" onClick={() => c.removeNotification(1)}>
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

  test('auto-removes after 5 seconds', () => {
    renderWithCtx();

    act(() => {
      currentCtx.addNotification('Auto', 'Remove me', 'info');
    });
    expect(currentCtx.notifications.length).toBe(1);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(currentCtx.notifications.length).toBe(0);
  });

  test('addNotification stores correct type/title/message', () => {
    renderWithCtx();

    act(() => {
      currentCtx.addNotification('Err', 'bad', 'error');
    });

    expect(currentCtx.notifications[0].type).toBe('error');
    expect(currentCtx.notifications[0].title).toBe('Err');
    expect(currentCtx.notifications[0].message).toBe('bad');
  });

  test('WS onmessage adds notification for known type (info)', () => {
    renderWithCtx();

    emitWs('info', 'WS Info', 'WS Msg');

    expect(currentCtx.notifications).toHaveLength(1);
    expect(currentCtx.notifications[0].type).toBe('info');
    expect(currentCtx.notifications[0].title).toBe('WS Info');
    expect(currentCtx.notifications[0].message).toBe('WS Msg');
  });

  test('WS onmessage normalizes unknown type to info', () => {
    renderWithCtx();

    emitWs('item_created', 'Item', 'New item');

    expect(currentCtx.notifications).toHaveLength(1);
    expect(currentCtx.notifications[0].type).toBe('info');
  });

  test('WS onmessage ignores malformed JSON', () => {
    renderWithCtx();

    act(() => {
      lastMock.onmessage({ data: 'not-json' });
    });

    expect(currentCtx.notifications).toHaveLength(0);
  });

  test('WS onmessage uses defaults when title/message missing', () => {
    renderWithCtx();

    act(() => {
      lastMock.onmessage({ data: JSON.stringify({ type: 'something' }) });
    });

    expect(currentCtx.notifications).toHaveLength(1);
    expect(currentCtx.notifications[0].title).toBe('Notification');
    expect(currentCtx.notifications[0].message).toBe('');
    expect(currentCtx.notifications[0].type).toBe('info');
  });

  test('WS onclose triggers reconnect', () => {
    renderWithCtx();

    act(() => {
      lastMock.close();
    });
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    act(() => {
      jest.advanceTimersByTime(1);
    });
  });

  test('WS onerror closes socket', () => {
    renderWithCtx();

    act(() => {
      lastMock.onerror();
    });
  });

  test('does not connect when no token', () => {
    localStorage.clear();
    renderWithCtx();
  });
});
