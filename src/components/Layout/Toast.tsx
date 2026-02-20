import React from 'react';
import { useToast } from '../../hooks/useToast';
import './Toast.css';

const Toast: React.FC = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type} fade-in`}
          onClick={() => hideToast(toast.id)}
        >
          <div className="toast-header">
            <strong>{toast.title}</strong>
            <button className="toast-close">&times;</button>
          </div>
          <div className="toast-body">{toast.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
