// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainInfo from '../Components/MainInfo';
import Details from '../Components/Details';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [currentSelection, setCurrentSelection] = useState('temperature');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [todayDate, setTodayDate] = useState('');
  const [username, setUsername] = useState('');
  const [temperatureHistory, setTemperatureHistory] = useState([]);
  const [humidityHistory, setHumidityHistory] = useState([]);
  const [lightStatus, setLightStatus] = useState(false);

  const endpoints = {
    temperature: 'https://squid-app-ht2cp.ondigitalocean.app/api/temperature/latest',
    humidity: 'https://squid-app-ht2cp.ondigitalocean.app/api/humidity/latest',
    temperatureHistory: 'https://squid-app-ht2cp.ondigitalocean.app/api/temperature/',
    humidityHistory: 'https://squid-app-ht2cp.ondigitalocean.app/api/humidity/',
    lightStatus: 'https://squid-app-ht2cp.ondigitalocean.app/api/parameters/666d9c0df2c9716c9211a35f',
  };

  const fetchData = async (selection) => {
    try {
      const response = await axios.get(endpoints[selection]);
      setData(response.data.Payload);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch ${selection} data`);
      setData(null);
    }
  };

  const fetchTemperatureHistory = async () => {
    try {
      const response = await axios.get(endpoints.temperatureHistory);
      setTemperatureHistory(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch temperature history');
    }
  };

  const fetchHumidityHistory = async () => {
    try {
      const response = await axios.get(endpoints.humidityHistory);
      setHumidityHistory(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch humidity history');
    }
  };

  const fetchLightStatus = async () => {
    try {
      const response = await axios.get(endpoints.lightStatus);
      setLightStatus(response.data.HoursLuminosity > 0); // Assuming HoursLuminosity > 0 means the light is on
      setError(null);
    } catch (err) {
      setError('Failed to fetch light status');
    }
  };

  const toggleLightStatus = async () => {
    try {
      const newStatus = !lightStatus;
      const newHoursLuminosity = newStatus ? 1 : 0; // Assuming 1 means light is on, 0 means light is off
      await axios.put(endpoints.lightStatus, {
        HoursLuminosity: newHoursLuminosity.toString(),
      });
      setLightStatus(newStatus);
    } catch (err) {
      setError('Failed to update light status');
    }
  };

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-es', options);
    setTodayDate(formattedDate);

    fetchData(currentSelection);
    fetchTemperatureHistory();
    fetchHumidityHistory();
    fetchLightStatus();

    const storedUsername = localStorage.getItem('name');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [currentSelection]);

  const handleLeftClick = () => {
    setCurrentSelection((prevSelection) =>
      prevSelection === 'temperature' ? 'humidity' : 'temperature'
    );
  };

  const handleRightClick = () => {
    setCurrentSelection((prevSelection) =>
      prevSelection === 'humidity' ? 'temperature' : 'humidity'
    );
  };

  const temperatureData = {
    labels: temperatureHistory.map((entry) => new Date(entry.Timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature History (ºC)',
        data: temperatureHistory.map((entry) => entry.Payload),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const humidityData = {
    labels: humidityHistory.map((entry) => new Date(entry.Timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Humidity History (%)',
        data: humidityHistory.map((entry) => entry.Payload),
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
      },
    ],
  };

  return (
    <div className='dashboard-cnt'>
      <MainInfo
        currentSelection={currentSelection}
        data={data}
        todayDate={todayDate}
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
      />
      <Details
        username={username}
        temperatureData={temperatureData}
        humidityData={humidityData}
        lightStatus={lightStatus}
        toggleLightStatus={toggleLightStatus}
      />
    </div>
  );
};

export default Dashboard;