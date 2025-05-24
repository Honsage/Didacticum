import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/login';
import SignupPage from './pages/signup/signup';
import HomePage from './pages/home/home';
import NotFound from './pages/not-found/not-found';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
