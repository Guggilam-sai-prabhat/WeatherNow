import React, { useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';

const Inputs = ({ setQuery, setUnits }) => {
    // State to manage the input value for city
    const [city, setCity] = useState('');

    // Function to handle the search button click
    const handleSearch = () => {
        if (city !== "") {
            // If the city input is not empty, set the query with the city name
            setQuery({ q: city });
        }
    };

    // Function to handle the current location button click
    const handleLocation = () => {
        // Get current geolocation
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Set the query with latitude, longitude, and units
                setQuery({
                    lat: latitude,
                    lon: longitude,
                    units: "metric" // Default unit is metric
                });
            }
        );
    };

    return (
        <div className='flex flex-row justify-center my-6'>
            {/* Input field for city */}
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type='text'
                    placeholder='City Name'
                    className='border-2 border-gray-400 rounded-md p-2 shadow-md w-full focus:outline-none capitalize text-gray-700'
                />
                {/* Search button */}
                <BiSearch
                    size={30}
                    className='cursor-pointer transition ease-in-out duration-150 hover:scale-110 text-white'
                    onClick={handleSearch}
                />
                {/* Current location button */}
                <BiCurrentLocation
                    size={30}
                    className='cursor-pointer transition ease-in-out duration-150 hover:scale-110 text-white'
                    onClick={handleLocation}
                />
            </div>
            {/* Unit selection buttons */}
            <div className='flex flex-row w-1/4 items-center justify-center'>
                <button className="text-2xl font-medium transition ease-out hover:scale-125 text-white" onClick={() => setUnits("metric")}>°C</button>
                <p className="text-2xl font-medium mx-1 text-white">|</p>
                <button className="text-2xl font-medium transition ease-out hover:scale-125 text-white" onClick={() => setUnits("imperial")}>°F</button>
            </div>
        </div>
    );
}

export default Inputs;
