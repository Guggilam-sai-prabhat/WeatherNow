import React from 'react';

const Forecast = ({ title, data }) => {
    return (
        <div>
            {/* Title of the forecast */}
            <div className='flex items-center justify-start mt-6'>
                <p className='font-medium uppercase'>{title}</p>
            </div>
            {/* Horizontal line */}
            <hr className='my-1' />

            {/* Forecast data */}
            <div className='flex items-center justify-between'>
                {/* Iterate through each forecast data */}
                {data.map((d, index) => (
                    <div key={index} className='flex flex-col items-center justify-center'>
                        {/* Forecast title (e.g., time) */}
                        <p className='text-sm font-light'>{d.title}</p>
                        {/* Forecast icon */}
                        <img src={d.icon} alt="weather-icon" className="w-12 my-1" />
                        {/* Forecast temperature */}
                        <p className='font-medium'>{`${d.temp.toFixed()}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
