import React, { useState } from 'react';
//import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySelector from './components/CitySelector';
import WeatherCard from './components/WeatherCard';
//import { mockWeatherData } from './mockData/mockWeatherData'; // Импорт фейковых данных
import './styles/App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [theme, setTheme] = useState('default'); // Состояние для темы

  // // Для тестирования используем фейковые данные
  // useEffect(() => {
  //   setWeatherData(mockWeatherData);

  //   // Определяем тему на основе фальшивых данных
  //   const currentWeather = mockWeatherData[0].weather[0].main; // Погода на первый день
  //   const currentTime = new Date().getHours(); // Текущее время
  //   const newTheme = determineTheme(currentWeather, currentTime);
  //   setTheme(newTheme);
  // }, []);

  // Функция для определения темы
  const determineTheme = (weather, currentTime) => {
    if (currentTime >= 20 || currentTime < 8) {
      return 'dark'; // Темная тема после 20:00 и до 8:00
    }
    if (weather === 'Clouds' || weather === 'Rain') {
      return 'gray'; // Серая тема для облачной или дождливой погоды
    }
    if (weather === 'Clear') {
      return 'beige'; // Бежевая тема для солнечной погоды
    }
    return 'default'; // По умолчанию
  };

  const fetchWeather = async (lat, lon, cityName) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&excludecurrent,minutely,hourly,alerts&units=metric&appid=c9c98f761d2f9bd6a94f6a8c5dbf1cf1`
      );
      setWeatherData(response.data.daily);
      setCity(cityName); // Устанавливаем название города

      // Определяем тему на основе текущей погоды и времени
      const currentWeather = response.data.daily[0].weather[0].main;
      const currentTime = new Date().getHours();
      const newTheme = determineTheme(currentWeather, currentTime);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`App ${theme}`}>
      <h1>Weather Forecast</h1>
      {city && <h2>City: {city}</h2>} {/* Отображаем название города */}
      <CitySelector onSelect={fetchWeather} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="weather-container">
          {weatherData.map((day, index) => (
            <WeatherCard key={index} weather={day} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

//npm install axios
//npm install react react-dom
//npm install @mui/material @emotion/react @emotion/styled
//npm install
//npm start  