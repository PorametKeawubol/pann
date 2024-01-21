import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, auth, ...rest }) => {
  return auth ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;