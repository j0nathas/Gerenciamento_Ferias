import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from '../App/App.jsx'
import Login from '../Login/Login.jsx'

function RotaProtegida({ logado, children }) {
  return logado ? children : <Navigate to="/login" replace />;
}

function Root() {
  const [logado, setLogado] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setLogado(true)} />} />
        <Route path="/*" element={
          <RotaProtegida logado={logado}>
            <App />
          </RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)