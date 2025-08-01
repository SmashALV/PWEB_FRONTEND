import React, { useState } from 'react';
import './Iniciar_Sesion.css'; 
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/UserApi';
import { Link } from 'react-router-dom';

const IniciarSesion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.includes('@')) {
            setEmailError('El correo debe contener un @');
            return;
        } else {
            setEmailError('');
        }

        // Solo usar backend
        getAllUsers().then(usersApi => {
            const user = usersApi.find(
                u => (u.correo === email && u.contrasena === password)
            );
            if (!user) {
                setLoginError('Correo o contraseña incorrectos');
                return;
            }
            setLoginError('');
            localStorage.setItem("user", JSON.stringify(user));
            if (user.rol === 'admin') {
                navigate('/Dashboard');
            } else {
                navigate('/');
            }
        }).catch(() => {
            setLoginError('Error al conectar con el servidor');
        });
    };

    return (
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email"><strong>Correo</strong></label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {emailError && <span className="error-message">{emailError}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password"><strong>Contraseña</strong></label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {loginError && <span className="error-message">{loginError}</span>}
                <div className="divider"></div>
                <button type="submit" className="login-button">Iniciar sesión</button>
                <div className="links">
                    <Link to="/registro" className="register-link">Registrarme</Link>
                    <a href="/Olvidar_Contraseña" className="forgot-password">Olvidé mi contraseña</a>
                </div>
            </form>
        </div>
    );
}

export default IniciarSesion;