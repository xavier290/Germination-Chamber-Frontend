// components/TopSection.js
import React from 'react';
import Menu from '../images/menu.png';
import { useNavigate } from 'react-router-dom';

const TopSection = ({ username }) => {
  const navigate = useNavigate();

  const navigateToSettings = () => {
    navigate('/settings');
  };

  return (
    <section className='topsection'>
      <div className="content">
        <h1>Bienvenido, {username}</h1>
        <p>Revisa las condiciones de la cámara de germinación:</p>
      </div>
      <div className="options" onClick={navigateToSettings}>
        <img src={Menu} alt="menu settings" />
      </div>
    </section>
  );
};

export default TopSection;