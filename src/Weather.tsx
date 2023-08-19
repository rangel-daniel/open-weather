import { Properties } from 'csstype'
import { useEffect, useState } from 'react';
import { Place } from './App';
import './Weather.css'
import { CurrentWeather } from './WeatherData';

const APPID = import.meta.env.VITE_APPID;

function Weather({ place }: { place?: Place }) {
    const [is_curr, setIsCurr] = useState(false);

    const [curr, setCurr] = useState<CurrentWeather>();

    const l_bg: Properties = {
        backgroundColor: is_curr ? 'transparent' : '#3584e4',
        color: is_curr ? 'black' : 'white'
    }

    const r_bg: Properties = {
        backgroundColor: !is_curr ? 'transparent' : '#3584e4',
        color: !is_curr ? 'black' : 'white'
    }

    useEffect(() => {
        const getCurr = async (lat: number, lon: number) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APPID}`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            setCurr(data);
        }

        if (is_curr && place && !curr) {
            getCurr(place.lat, place.lon);
        }
    }, [is_curr, place, curr])


    return (
        <div id='weather-box' >
            <label id="selector">
                <div id="left" onClick={() => setIsCurr(false)} style={l_bg}>5 day</div>
                <div id="right" onClick={() => setIsCurr(true)} style={r_bg}>Current</div>
            </label>

            <h2>
                {place?.string}
            </h2>

            {is_curr ? (
                <h3>@todo current weather!</h3>
            ) : (
                <h3>@todo 5 day weather forecast!</h3>
            )}

        </div>
    )
}

export default Weather;
