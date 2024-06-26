import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Logo from '../images/logo2.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://squid-app-ht2cp.ondigitalocean.app/api/auth/login', { email, password });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          navigate('/dashboard');
        } 
        catch (error) {
          console.error('Login failed', error);
          // Handle login failure (e.g., show error message)
        }
    };
    
    return (
        <div className='LoginSection'>
            <div className='logoSection'>
                <img src={Logo} alt="logo" />
                <p>SmartClimate</p>
            </div>
            <div className="pageContent">
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