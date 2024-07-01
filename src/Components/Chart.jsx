// components/Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ temperatureData, humidityData, soilHumidityData }) => (
  <section className='chart'>
    <h2>Historial de Temperatura</h2>
    <Line data={temperatureData} />

    <h2>Historial de Humedad</h2>
    <Line data={humidityData} />

    <h3>Historial de Humedad del Suelo</h3>
    <Line data={soilHumidityData} />
  </section>
);

export default Chart;