import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the change to 'react-dom/client'
import App from './App';
import './index.css';
im

const root = ReactDOM.createRoot(document.getElementById('root')); // Using createRoot
root.render(
  <React.StrictMode>
    <App />
    <Team/>
  </React.StrictMode>
);
