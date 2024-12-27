import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import your App component
import './index.css';
import './App.css';// If you have global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
