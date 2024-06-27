// components/Header.js
import React from 'react';
import Logo from '../images/logo.png';

const Header = () => (
  <header>
    <img src={Logo} alt="SmartClimate logo" className="logo" />
    <p>SmartClimate</p>
  </header>
);

export default Header;