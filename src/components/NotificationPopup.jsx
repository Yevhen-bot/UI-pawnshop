import React, { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

export default function NotificationPopup() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((n) => (
        <div key={n.id} className={`notification notification-${n.type}`}>
          <div className="notification-icon">
            {n.type === 'error' ? '!' : n.type === 'warning' ? '?' : 'i'}
          </div>
          <div className="notification-content">
            <strong>{n.title}</strong>
            <div>{n.message}</div>
          </div>
          <button
            type="button"
            className="notification-close"
            onClick={() => removeNotification(n.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
