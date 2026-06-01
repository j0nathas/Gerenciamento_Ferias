import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Login.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
            setError('E-mail ou senha inválidos');
            console.error(err);
        }
    };

    return (
        <div className="loginContainer">
            <aside className="loginBackground">
                <img src="/img/GCF-logo.png" alt="GCF Logo" width={300} />

                <div className="loginText">
                    <h1 className="loginTextTitle">Olá,</h1>
                    <p className="loginTextSubtitle">Bem-vindo de volta!</p>
                </div>

                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

                    <div className='loginInputLine'>
                        <div className="inputWrapper">
                            <svg className="inputIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                            </svg>
                            <input
                                className="loginInput"
                                type="email"
                                placeholder="e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='loginInputLine'>
                        <div className="inputWrapper">
                            <svg className="inputIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 1a5 5 0 0 1 5 5v2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5zm0 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0-10a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z" fill="currentColor" />
                            </svg>
                            <input
                                className="loginInput"
                                type="password"
                                placeholder="senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="loginButton">
                        Entrar
                    </button>
                </form>

                <p>Não possuí cadastro?
                    <Link to="/register" className='registerLink'>Registre-se</Link>
                </p>

                <p className='developerInfo'>Desenvolvido por: <strong>Jonathas Oliveira</strong></p>
            </aside>

            <img src='/img/loginImage.png' width={600} alt="Login Image" />
        </div>
    );
}