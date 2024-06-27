import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Logo from '../images/logo2.png';
import Warning from '../images/warning.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard'); // Redirect to dashboard if token exists
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://squid-app-ht2cp.ondigitalocean.app/api/auth/login', { email, password });
            // console.log(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);

            navigate('/dashboard');
        } 
        catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.');
          // Handle login failure (e.g., show error message)
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    };
    
    return (
        <div className='LoginSection'>
            <div className='logoSection'>
                <img src={Logo} alt="logo" />
                <p>SmartClimate</p>
            </div>
            <div className="pageContent">
                {errorMessage && (
                    <div className="Message">
                        <div className="content">
                            <div className="img">
                                 <img src={Warning} alt="warning sign" />
                            </div>
                            <div className="payload">
                                <p className='boldtext'>Parece que algo salio mal...</p>
                                <p>{errorMessage}</p>
                                <button onClick={clearErrorMessage}>&times;</button>
                            </div>
                        </div>
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <h1>Iniciar Sesión</h1>
                    
                    <label htmlFor="correo" id='text'>Correo</label>
                    <input name='correo' id='correo' type="text" placeholder="usuario@example.com" onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password" id='contraseña'>Contraseña</label>
                    <input name='password' autoComplete='contraseña' id='password' type="password" placeholder="Contraseña..." onChange={e => setPassword(e.target.value)} />

                    <button className="login-btn" type='submit'>Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;