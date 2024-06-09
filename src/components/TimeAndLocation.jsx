import React from 'react';

const TimeAndLocation = ({ weather: { formattedLocalTime, name, country } }) => {
    return (
        <div>
            {/* Display formatted local time */}
            <div className='flex items-center justify-center my-6'>
                <p className='text-xl font-extralight text-white'>{formattedLocalTime}</p>
            </div>
            {/* Display name and country */}
            <div className='flex items-center justify-center my-3'>
                <p className='text-3xl font-medium'>{`${name}, ${country}`}</p>
            </div>
        </div>
    );
}

export default TimeAndLocation;
