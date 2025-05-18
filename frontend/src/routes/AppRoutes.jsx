import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import RepositoryList from '../components/Repository/RepositoryList';
import RepositoryCreate from '../components/Repository/RepositoryCreate';
import FileUpload from '../components/Repository/FileUpload';
import FileList from '../components/Repository/FileList';
import FileHistory from '../components/Repository/FileHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RepositoryList />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-repo"
        element={
          <PrivateRoute>
            <RepositoryCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/repo/:repoId/upload"
        element={
          <PrivateRoute>
            <FileUpload />
          </PrivateRoute>
        }
      />
      <Route
        path="/repo/:repoId/files"
        element={
          <PrivateRoute>
            <FileList />
          </PrivateRoute>
        }
      />
      <Route
        path="/file/:fileId/history"
        element={
          <PrivateRoute>
            <FileHistory />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
