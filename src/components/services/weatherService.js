import { DateTime } from 'luxon';

// API key and base URL for OpenWeatherMap API
const API_KEY = 'ba81b98b7c9cd01cdb9108c8f31b50ce';
const BASR_URL = 'http://api.openweathermap.org/data/2.5/';

// Function to fetch weather data from the OpenWeatherMap API
const getWeatherData = (infoType, searchParams) => {
    // Construct the URL with query parameters
    const url = new URL(BASR_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    // Fetch weather data and parse JSON response
    return fetch(url)
        .then(response => response.json());
};

// Function to generate the URL for weather icon
const iconUrl = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

// Function to format UTC timestamp to local time
const formatToLocalTime = (secs, offset, format = "cccc , dd LLL yyyy'| Local time : 'hh:mm a") => 
    DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

// Function to format current weather data
const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, pressure, humidity, temp_max, temp_min },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
    } = data;

    // Extract weather details
    const { main: details, icon } = weather[0];

    // Format local time
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        pressure,
        humidity,
        temp_min,
        temp_max,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
        sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
        speed,
        details,
        icon: iconUrl(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat,
        lon
    };
};

// Function to format forecast weather data
const formatForecastWeather = (secs, offset, data) => {
    // Hourly forecast
    const hourly = data.filter(f => f.dt > secs).map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "hh:mm a"),
        icon: iconUrl(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0, 4);

    // Daily forecast
    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map((f) => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "ccc"),
        icon: iconUrl(f.weather[0].icon),
        date: f.dt_txt,
    }));

    return { hourly, daily };
};

// Function to fetch and format weather data
const getFomattedWeatherData = async (searchParams) => {
    // Fetch current weather data and format it
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent);

    // Extract necessary data for forecast formatting
    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    // Fetch forecast weather data and format it
    const formattedForecastWeather = await getWeatherData('forecast', {
        lat,
        lon,
        units: searchParams.units
    }).then((d) => formatForecastWeather(dt, timezone, d.list));

    // Combine current and forecast weather data
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFomattedWeatherData;
