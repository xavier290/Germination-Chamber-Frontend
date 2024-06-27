// components/Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ temperatureData, humidityData }) => (
  <section className='chart'>
    <h2>Historial de Temperatura</h2>
    <Line data={temperatureData} />

    <h2>Historial de Humedad</h2>
    <Line data={humidityData} />
  </section>
);

export default Chart;