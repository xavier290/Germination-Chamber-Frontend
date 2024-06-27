// components/MainInfo.js
import React from 'react';
import Plant from '../images/plant.png';
import Sun from '../images/sun.png';


import Header from './Header';


const MainInfo = ({ currentSelection, data, todayDate, handleLeftClick, handleRightClick }) => (
  <div className="main-info">
    <Header />
    <main>
      <div className="info">
        <button onClick={handleLeftClick}>‹</button>
        {data !== null ? (
          <span>
            {currentSelection === 'temperature' ? ` Temperatura: ${data}ºC` : ` Humedad: ${data}%`}
          </span>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={handleRightClick}>›</button>
      </div>
    </main>
    <footer>
      <div className="bg-img">
        <img src={Plant} alt="" />
      </div>
      <div className="date">
        <p>{todayDate}</p>
      </div>
      <div className="bg-img2">
        <img src={Sun} alt="" />
      </div>
    </footer>
  </div>
);


export default MainInfo;