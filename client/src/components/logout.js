import React from 'react';
import { Button } from 'react-bootstrap';

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href= 'http://localhost:3000';
  };

  


export default handleLogout;