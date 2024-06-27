// components/LightStatus.js
import React from 'react';
import Light from '../images/light.png';

const LightStatus = ({ lightStatus, toggleLightStatus }) => (
  <section className='light'>
    <h2>Estado Luminosidad:</h2>
    <img src={Light} alt="light status" />
    <p>{lightStatus ? 'Encendido' : 'Apagado'}</p>
    <button onClick={toggleLightStatus}>
      {lightStatus ? 'Apagar' : 'Encender'}
    </button>
  </section>
);

export default LightStatus;