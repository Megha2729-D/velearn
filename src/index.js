import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './Components/Router';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster, toast, resolveValue } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/">
    <Toaster position="top-right">
      {(t) => {
        let color = '#FFB200'; // Information yellow default
        let title = 'Information';

        if (t.type === 'error') {
          color = '#FF0000'; // Error red
          title = 'Error';
        } else if (t.type === 'success') {
          color = '#00A800'; // Success green
          title = 'Success';
        }

        return (
          <div
            style={{
              opacity: t.visible ? 1 : 0,
              transform: t.visible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              background: '#fff',
              padding: '16px 20px',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              minWidth: '340px',
              maxWidth: '400px',
              borderLeft: `8px solid ${color}`
            }}
          >
            {/* Rounded Square Icon */}
            <div style={{
              width: '46px',
              height: '46px',
              minWidth: '46px',
              borderRadius: '12px',
              background: color,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '16px'
            }}>
              {t.type === 'error' ? (
                <div style={{ width: '22px', height: '22px', background: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: color, fontWeight: 'bold', fontSize: '15px' }}>
                  !
                </div>
              ) : t.type === 'success' ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <div style={{ width: '22px', height: '22px', background: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: color, fontWeight: 'bold', fontSize: '15px', fontStyle: 'italic', fontFamily: 'serif' }}>
                  i
                </div>
              )}
            </div>

            {/* Content area: Title & Message */}
            <div style={{ flex: 1, paddingRight: '20px' }}>
              <h5 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: '700', color: '#111', fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
                {title}
              </h5>
              <p style={{ margin: 0, fontSize: '14px', color: '#888', lineHeight: '1.4', fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
                {resolveValue(t.message, t)}
              </p>
            </div>

            {/* Close button (top right) */}
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'transparent',
                border: 'none',
                fontSize: '22px',
                cursor: 'pointer',
                color: '#aaa',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px',
                height: '24px',
                lineHeight: 1,
                padding: 0
              }}
            >
              ×
            </button>
          </div>
        );
      }}
    </Toaster>
    <AppRouter />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
