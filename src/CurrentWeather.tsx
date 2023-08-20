import { Current, getAmPm, getDay, getIcon, unixToDate } from "./WeatherData"
import { BsSunriseFill, BsSunsetFill } from 'react-icons/bs';
import './CurrentWeather.css'

function CurrentWeather({ current }: { current: Current }) {
    const weather = current.weather[0];
    const main = current.main;
    const icon = getIcon('l', weather.icon, weather.main);

    const sunrise = getAmPm(current.sys.sunrise, current.timezone);
    const sunset = getAmPm(current.sys.sunset, current.timezone);

    const dt = unixToDate(current.dt, current.timezone);
    const day = getDay(dt.getUTCDay());
    const time = getAmPm(dt);


    return (
        <div>
            <div id="top">
                <span><BsSunriseFill /> {sunrise} <br /> sunrise</span>
                <span>{day} <br /> {time}</span>
                <span> <BsSunsetFill /> {sunset} <br /> sunset</span>
            </div>
            <div id="main">
                {icon}
                <br />
                <label>
                    {weather.description}
                </label>
            </div>
            <div id="temp">
                <div>
                    {main.temp}&deg;F
                </div>
                <div>
                    {main.feels_like}&deg;F
                    <br /> feels like
                </div>
            </div>
        </div>

    )
}
export default CurrentWeather;
