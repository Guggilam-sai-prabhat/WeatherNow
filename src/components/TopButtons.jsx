import React, { useState } from 'react';
import { MdDarkMode } from "react-icons/md";

const TopButtons = ({ setQuery, theme, handleTheme }) => {
  // State variable to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const handleColorMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // List of cities
  const cities = [
    { id: 1, name: 'London' },
    { id: 2, name: 'New York' },
    { id: 3, name: 'Tokyo' },
    { id: 4, name: 'Paris' },
    { id: 5, name: 'Moscow' }
  ];

  return (
    <div className='flex items-center justify-around my-6'>
      {/* Buttons for each city */}
      {cities.map((city) => (
        <button key={city.id} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'
          onClick={() => setQuery({ q: city.name })}>
          {city.name}
        </button>
      ))}
      {/* Dark mode toggle button */}
      <MdDarkMode
        size={40}
        onClick={() => { handleTheme(); handleColorMode(); }} // Call both theme and color mode handlers
        className={`cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-45 ${theme === 'dark' ? 'text-white' : 'text-black'}`} // Dynamically apply styles based on theme
      />
    </div>
  );
}

export default TopButtons;
