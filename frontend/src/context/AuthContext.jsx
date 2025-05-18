import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../services/http.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      setUser(true);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('https://super-cod-4prvrvq6gw6f5qjp-3000.app.github.dev/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `${res.data.token}`;
    setUser(true);
  };

  const register = async (email, password, name) => {
    const res = await axios.post('https://super-cod-4prvrvq6gw6f5qjp-3000.app.github.dev/api/auth/register', { email, password, name });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `${res.data.token}`;
    setUser(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};