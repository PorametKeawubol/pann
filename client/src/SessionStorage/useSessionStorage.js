import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SessionStorageContext = createContext();

export const useSessionStorage = () => {
  const context = useContext(SessionStorageContext);
  if (!context) {
    throw new Error('useSessionStorage must be used within a SessionStorageProvider');
  }
  return context;
};

export const SessionStorageProvider = ({ children }) => {
  const navigate = useNavigate();

  const setItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));   
    if (key === 'jwt') {
      axios.defaults.headers.common['Authorization'] = `bearer ${value}`;   //พี่ TA แนะนำมาใช้ได้จริงหลังจากที่พังมาหลายวัน
    }
  };

  const getItem = (key) => {
    const storedItem = sessionStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  };

  const removeItem = (key) => {
    sessionStorage.removeItem(key);
    if (key === 'jwt') {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  

  const clearStorage = () => {
    sessionStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
  };
  

  const handleLogout = () => {
    
    removeItem('jwt');
    navigate('/');
  };


  const value = {
    setItem,
    getItem,
    removeItem,
    clearStorage,
    handleLogout,
  };

  return <SessionStorageContext.Provider value={value}>{children}</SessionStorageContext.Provider>;
};