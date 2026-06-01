import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from '../App/App.jsx'
import Login from '../Login/Login.jsx'
import { AuthProvider, useAuth } from '../context/AuthContext.jsx'

function RotaProtegida({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={
            <RotaProtegida>
              <App />
            </RotaProtegida>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)