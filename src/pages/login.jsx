// lets do a basic login page
import React, { useState } from 'react';

import Logo from '../images/logo2.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://dolphin-app-hlqw2.ondigitalocean.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data);
   }
    
    return (
        <div className='LoginSection'>
            <div className='logoSection'>
                <img src={Logo} alt="logo" />
                <p>SmartClimate</p>
            </div>
            <div className="pageContent">
                <form onSubmit={handleSubmit}>
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