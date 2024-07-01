// components/Details.js
import React from 'react';
import TopSection from './TopSection';
import Chart from './Chart';
import LightStatus from './LightStatus';

const Details = ({ username, temperatureData, humidityData, soilHumidityData, lightStatus, toggleLightStatus }) => (
  <div className="details">
    <TopSection username={username} />
    <Chart temperatureData={temperatureData} humidityData={humidityData} soilHumidityData={soilHumidityData} />
    <LightStatus lightStatus={lightStatus} toggleLightStatus={toggleLightStatus} />
  </div>
);

export default Details;
