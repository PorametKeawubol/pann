import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentPage from './StudentPage';
import StaffPage from './StaffPage';
import EntryPageforstaff from './EntryPageforstaff';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';

function MainApp() {
  const navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/entry" element={<EntryPageforstaff />} />
        
      </Routes>
    </div>
  );
}

export default MainApp;