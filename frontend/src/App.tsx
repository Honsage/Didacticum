import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/login';
import SignupPage from './pages/signup/signup';
import HomePage from './pages/home/home';
import ProfilePage from './pages/profile/profile';
import ViewerPage from './pages/viewer/viewer';
import { EditPage } from './pages/edit/edit';
import NotFound from './pages/not-found/not-found';
import ProtectedRoute from './components/protected-route/protected-route';
import SearchPage from './pages/search/search';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/viewer" element={<ViewerPage />} />
      <Route path="/viewer/:id" element={<ViewerPage />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit/:id" 
        element={
          <ProtectedRoute>
            <EditPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit" 
        element={
          <ProtectedRoute>
            <EditPage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
