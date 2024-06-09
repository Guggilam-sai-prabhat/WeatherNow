import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFomattedWeatherData from './components/services/weatherService';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // State variables
  const [query , setQuery] = useState({q : "london"}); // Default query is London
  const [weather, setWeather] = useState(null); // State for weather data
  const [units , setUnits] = useState("metric"); // Default unit is metric
  const [theme , setTheme] = useState("light"); // Default theme is light

  // Function to handle theme change
  const handleTheme = () => {
    if (theme === "light") {
      document.body.style.backgroundColor = "#303030"; // Dark mode background color
      document.body.style.color = "#fff"; // Dark mode text color
      setTheme("dark");
    } else {
      document.body.style.backgroundColor = "#fff"; // Light mode background color
      document.body.style.color = "#303030"; // Light mode text color
      setTheme("light");
    }
  };

  // Function to fetch weather data
  const getWeather = async () => {
    const message = query.q ? `Loading weather for ${query.q}` : "Loading weather";
    toast.info(message);
    await getFomattedWeatherData({ ...query, units }).then(data => {
        toast.success("Weather loaded successfully");
        setWeather(data);
    });
  };

  // useEffect hook to fetch weather data when query or units change
  useEffect(() => {
    getWeather();
  }, [query, units]);

  // Function to determine background gradient based on temperature
  const formatBackground = () => {
    if (!weather) {
      return " from-cyan-600 to-blue-700"; // Default gradient when weather data is not available
    }
    const threshold = units === "metric" ? 20 : 60; // Temperature threshold for gradient change
    if (weather.temp <= threshold) {
      return " from-cyan-600 to-blue-700"; // Cold temperature gradient
    }
    return " from-yellow-600 to-orange-700"; // Warm temperature gradient
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-900 ${formatBackground()}`}>
      {/* Top buttons for location search and theme change */}
      <TopButtons setQuery={setQuery} theme={theme} handleTheme={handleTheme} />
      {/* Inputs for location search and unit selection */}
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {/* Weather components */}
      {weather &&
        <>
          {/* Display current time and location */}
          <TimeAndLocation weather={weather} />
          {/* Display current temperature and weather details */}
          <TempAndDetails weather={weather} units={units} />
          {/* Display 3-hourly forecast */}
          <Forecast title="3 hours step Forecast" weather={weather} data={weather.hourly} />
          {/* Display daily forecast */}
          <Forecast title="Daily Forecast" weather={weather} data={weather.daily} />
        </>
      }
      {/* Toast container for notifications */}
      <ToastContainer autoClose={2200} hideProgressBar={true} theme='colored' />
    </div>
  );
}

export default App;
