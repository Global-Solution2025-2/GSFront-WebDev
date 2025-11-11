import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import Login from '../pages/Login';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}