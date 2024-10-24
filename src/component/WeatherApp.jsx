import React, { useState, useEffect } from 'react';

// OpenWeather API key (replace with your own key for testing)
const API_KEY = 'YOUR_API_KEY';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('theme') === 'dark'
  );

  // Fetch weather data
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather({
        name: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className="weather-container">
      <h1>Weather Dashboard</h1>

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* City Search Input */}
      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Weather Info */}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.temp}°C</p>
          <p>{weather.description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
        </div>
      )}

      {/* Styles */}
      <style>{`
        body.light {
          background-color: #fff;
          color: #000;
        }
        body.dark {
          background-color: #333;
          color: #fff;
        }
        .weather-container {
          max-width: 400px;
          margin: 50px auto;
          text-align: center;
        }
        .search {
          margin: 20px 0;
        }
        .theme-toggle {
          margin-bottom: 10px;
          cursor: pointer;
        }
        .error {
          color: red;
        }
        .weather-info img {
          width: 100px;
          height: 100px;
        }
        @media (max-width: 600px) {
          .weather-container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default WeatherApp;
