import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateParameters = () => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate('/dashboard');
  };

  const [parameters, setParameters] = useState({
    MaxTemperature: '',
    MinTemperature: '',
    MaxHumidity: '',
    MinHumidity: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters({ ...parameters, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://squid-app-ht2cp.ondigitalocean.app/api/parameters/666d9c0df2c9716c9211a35f', parameters);
      setMessage('Parametros Actualizados');
      navigate('/dashboard');
    } catch (error) {
      setMessage('Error al actualizar los parametros');
    }
  };

  return (
    <div className='ParametersPage'>
      <form onSubmit={handleSubmit}>
        <h1>Ajuste de Parámetros:</h1>
        <label>
          Temperatura:
        </label>
        <div className="temp">
          <input type="text" placeholder='Temperatura Maxima' name="MaxTemperature" value={parameters.MaxTemperature} onChange={handleChange} />
          <input type="text" placeholder='Temperatura Minima' name="MinTemperature" value={parameters.MinTemperature} onChange={handleChange} />
        </div>
        <label>
          Humedad:
        </label>
        <div className="hum">
          <input type="text" placeholder='Humedad Maxima' name="MaxHumidity" value={parameters.MaxHumidity} onChange={handleChange} />
          <input type="text" placeholder='Humedad Minima' name="MinHumidity" value={parameters.MinHumidity} onChange={handleChange} />
        </div>
        
        <div className="btns">
          <button className='cancel' onClick={navigateTo}>Cancelar</button>
          <button className='save' type="submit">Guardar</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateParameters;
