import React, { useState } from 'react';
import axios from 'axios';

const CitySelector = ({ onSelect }) => {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9c98f761d2f9bd6a94f6a8c5dbf1cf1`
      );

      // Получаем координаты и название города из response.data
      const { lat, lon } = response.data.coord;
      const name = response.data.name;

      // Передаем данные в родительский компонент
      onSelect(lat, lon, name);
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CitySelector;