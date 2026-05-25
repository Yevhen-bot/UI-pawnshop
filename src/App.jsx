import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationPopup from './components/NotificationPopup';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import Catalog from './pages/Catalog';
import Estimates from './pages/Estimates';
import Operations from './pages/Operations';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NotificationPopup />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user-profile/:id" element={<UserProfile />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/estimates" element={<Estimates />} />
              <Route path="/operations" element={<Operations />} />
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
