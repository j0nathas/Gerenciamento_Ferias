import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from '../App/App.jsx'
import Login from '../Registration/Login/Login.jsx'
import Register from '../Registration/Register/Register.jsx'
import Loading from './loading/Loading.jsx'
import { AuthProvider, useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../PageTransition/Registration/RegistrationTransition.jsx'

function RotaProtegida({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) return <Loading />;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RotaPublica({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) return <Loading />;

  if (authenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function Root() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <RotaPublica>
              <PageTransition><Login /></PageTransition>
            </RotaPublica>
          } />

          <Route path="/register" element={
            <RotaPublica>
              <PageTransition><Register /></PageTransition>
            </RotaPublica>
          } />

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