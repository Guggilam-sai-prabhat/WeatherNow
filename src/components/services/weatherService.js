import { data } from 'autoprefixer';
import { DateTime } from 'luxon'

const API_KEY = 'ba81b98b7c9cd01cdb9108c8f31b50ce'
const BASR_URL = 'http://api.openweathermap.org/data/2.5/'

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASR_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });


    return fetch(url)
        .then(response => response.json())



}

const iconUrl = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
}


const formatToLocalTime = (secs, offset, format = "cccc , dd LLL yyyy'| Local time : 'hh:mm a") => 
    DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

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

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        pressure,
        humidity,
        temp_min,
        temp_max, name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
        sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
        speed,
        details,
        icon: iconUrl(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat, lon
    };
}

const formatForecastWeather = (secs , offset , data) => {
    //hourly
    const hourly = data.filter(f => f.dt>secs).map( (f) => ({
    temp : f.main.temp,
        title : formatToLocalTime(f.dt, offset, "hh:mm a"),
        icon : iconUrl(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0, 4)

    //daily
    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map((f) => ({
        temp: f.main.temp,
        title : formatToLocalTime(f.dt, offset, "ccc"),
        icon: iconUrl(f.weather[0].icon),
        date: f.dt_txt,
    }))

    return {hourly , daily};
}

const getFomattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent)

    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat, lon, units: searchParams.units
    }).then((d) => formatForecastWeather(dt, timezone, d.list))
    return { ...formattedCurrentWeather , ...formattedForecastWeather };
}

export default getFomattedWeatherData;