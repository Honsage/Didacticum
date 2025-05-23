import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}
