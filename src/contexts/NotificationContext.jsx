import React, { createContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const nextIdRef = useRef(1);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (title, message, type = 'info') => {
      const id = nextIdRef.current;
      nextIdRef.current += 1;
      setNotifications((prev) => [...prev, { id, title, message, type }]);
      setTimeout(() => removeNotification(id), 5000);
    },
    [removeNotification],
  );

  const connect = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const noteType = ['info', 'error', 'success', 'warning'].includes(data.type) ? data.type : 'info';
        addNotification(data.title || 'Notification', data.message || '', noteType);
      } catch {
        /* ignore malformed messages */
      }
    };

    ws.onclose = () => {
      if (wsRef.current !== ws) return;
      wsRef.current = null;
      reconnectTimeoutRef.current = setTimeout(connect, 3000);
    };

    ws.onerror = () => {
      if (wsRef.current === ws) ws.close();
    };

    wsRef.current = ws;
  }, [addNotification]);

  useEffect(() => {
    connect();

    const ws = wsRef.current;
    return () => {
      if (ws) ws.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);

  const contextValue = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
}
