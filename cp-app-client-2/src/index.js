import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { HashRouter } from 'react-router-dom';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />    
    </HashRouter>
  </React.StrictMode>
);


