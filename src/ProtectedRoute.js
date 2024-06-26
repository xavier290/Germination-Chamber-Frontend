import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  // Check for the presence of the token in local storage
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? Element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;