import './styling/main.scss';

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';

import ProtectedRoute from './ProtectedRoute';


const App = () => {
  return (
    <div className="container">
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
};


export default App;