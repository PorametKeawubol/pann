import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { SessionStorageProvider } from './SessionStorage/useSessionStorage';
import App from './App';
import MainApp from './App';

ReactDOM.render(
  <BrowserRouter>
    <SessionStorageProvider>
      <MainApp />
    </SessionStorageProvider>
  </BrowserRouter>,
  document.getElementById('root')
);