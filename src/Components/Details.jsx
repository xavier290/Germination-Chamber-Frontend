// components/Details.js
import React from 'react';
import TopSection from './TopSection';
import Chart from './Chart';
import LightStatus from './LightStatus';

const Details = ({ username, temperatureData, humidityData, lightStatus, toggleLightStatus }) => (
  <div className="details">
    <TopSection username={username} />
    <Chart temperatureData={temperatureData} humidityData={humidityData} />
    <LightStatus lightStatus={lightStatus} toggleLightStatus={toggleLightStatus} />
  </div>
);

export default Details;