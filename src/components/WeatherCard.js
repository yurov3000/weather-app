import React from 'react';
import WeatherIcon from './WeatherIcon';
import '../styles/WeatherCard.css'; // Подключение стилей

const WeatherCard = ({ weather }) => {
  const { dt, temp, weather: weatherDetails } = weather;
  const date = new Date(dt * 1000).toLocaleDateString();

  return (
    <div className="weather-card">
      <h3>{date}</h3>
      <WeatherIcon icon={weatherDetails[0].icon} />
      <p>{weatherDetails[0].description}</p>
      <p>{temp.day}°C</p>
    </div>
  );
};

export default WeatherCard;