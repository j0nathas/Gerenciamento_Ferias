import './Login.css'

export default function Login() {
    return (
        <div className="loginContainer">

            <aside className="loginBackground">

                <img src="/img/GCF-logo.png" alt="GCF Logo" width={300} />

                <h1>Olá,</h1>
                <p>Bem-vindo de volta!</p>

                <div className='loginInputLine'>
                    <div className="inputWrapper">
                        <svg className="inputIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
                        </svg>
                        <input className="loginInput" type="text" placeholder="e-mail" />
                    </div>
                </div>

                <div className='loginInputLine'>
                    <div className="inputWrapper">
                        <svg className="inputIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={18} height={18}>
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 1a5 5 0 0 1 5 5v2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5zm0 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0-10a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z" fill="currentColor" />
                        </svg>
                        <input className="loginInput" type="password" placeholder="senha" />
                    </div>
                </div>

                <button className="loginButton">
                    Entrar
                    <div className="iconButton">
                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                        </svg>
                    </div>
                </button>

                <p>Não possuí cadastro? <a href="/register" className='registerLink'>Registre-se</a></p>

                <p>Desenvolvido por: Jonathas Oliveira</p>
            </aside>

            <img src='/img/loginImage.png' width={600} alt="Login Image" />

        </div>
    )
}