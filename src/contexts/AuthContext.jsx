import React, { createContext, useState, useEffect, useMemo } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/api/auth/user/');
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (username, password) => {
    const response = await api.post('/api/auth/login/', { username, password });
    const { key } = response.data;
    localStorage.setItem('token', key);
    // Manually set the header for the immediate next request to avoid interceptor race
    const userResponse = await api.get('/api/auth/user/', {
      headers: { Authorization: `Token ${key}` },
    });
    setUser(userResponse.data);
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout/');
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      loading,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
