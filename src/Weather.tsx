import { Properties } from 'csstype'
import { useEffect, useState } from 'react';
import { Place } from './App';
import './Weather.css'
import { Current, FiveDay } from './WeatherData';

import { ImSpinner } from 'react-icons/im'

import CurrentWeather from './CurrentWeather';
import FiveDayWeather from './FiveDayWeather';

const APPID = import.meta.env.VITE_APPID;

function Weather({ place }: { place?: Place }) {
    const [is_curr, setIsCurr] = useState(true);
    const [is_imp, setIsImp] = useState(true);

    const [current, setCurrent] = useState<Current>();
    const [five_day, setFiveDay] = useState<FiveDay>();

    const l_bg: Properties = {
        backgroundColor: !is_curr ? 'transparent' : '#3584e4',
        color: !is_curr ? 'black' : 'white'
    }

    const r_bg: Properties = {
        backgroundColor: is_curr ? 'transparent' : '#3584e4',
        color: is_curr ? 'black' : 'white'
    }

    useEffect(() => {
        const getCurr = async (lat: number, lon: number) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APPID}`
            const response = await fetch(url);
            const data = await response.json();
            setCurrent(data);
        }

        const getFiveDay = async (lat: number, lon: number) => {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APPID}`
            const response = await fetch(url);
            const data = await response.json();
            setFiveDay(data);
            console.log(data);
        }

        if (place) {
            getCurr(place.lat, place.lon);
            getFiveDay(place.lat, place.lon)
        }
    }, [place])


    return (
        <div id='weather-box' >
            <div id='options'>
                <div id="mode">
                    <div id="left" onClick={() => setIsCurr(true)} style={l_bg}>Current</div>
                    <div id="right" onClick={() => setIsCurr(false)} style={r_bg}>5 day</div>
                </div>
                <span id="unit">
                    <span id="imperial" onClick={() => setIsImp(true)} style={{ fontWeight: is_imp ? 'bold' : 'lighter' }}>F&deg;</span>
                    <span id="metric" onClick={() => setIsImp(false)} style={{ fontWeight: is_imp ? 'lighter' : 'bold' }}>C&deg;</span>
                </span>
            </div>

            <div id='location-outer'>
                <div id='location'>
                    <h2> {place?.string} <hr /></h2>
                </div>
            </div>

            {place ? (
                is_curr && current ? (<CurrentWeather is_imp={is_imp} data={current} />) :
                    !is_curr && five_day ? (<FiveDayWeather is_imp={is_imp} data={five_day} />) :
                        <div id='center-main'>
                            <ImSpinner className='spinner' />
                        </div>
            ) : (
                <div id='center-main'>
                    <h3> Please select a location 🗺️ </h3>
                </div>
            )}
        </div>
    )
}

export default Weather;
