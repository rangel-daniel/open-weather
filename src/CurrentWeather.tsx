import { Current, getAmPm, getDay, getIcon, unixToDate } from "./WeatherData"
import { BsEyeFill, BsSnow2, BsArrowUp, BsSunriseFill, BsSunsetFill, BsCloudFill, BsCloudRainFill } from 'react-icons/bs';
import './CurrentWeather.css'

function CurrentWeather({ current }: { current: Current }) {
    const weather = current.weather[0];

    const main = current.main;
    const wind = current.wind;
    const icon = getIcon('l', weather.icon, weather.main);

    const sunrise = getAmPm(current.sys.sunrise, current.timezone);
    const sunset = getAmPm(current.sys.sunset, current.timezone);

    const dt = unixToDate(current.dt, current.timezone);
    const day = getDay(dt.getUTCDay());
    const time = getAmPm(dt);


    return (
        <div>
            <div id="top">
                <span><BsSunriseFill /> {sunrise} <br /> sunrise </span>
                <span>{day} {time} <h3>{weather.description}</h3> </span>
                <span> <BsSunsetFill /> {sunset} <br /> sunset</span>
            </div>

            <br />

            <div id="main">
                <span id="wind">
                    <h4>Wind</h4>
                    <table id="wind-table">
                        <tr>
                            <td className="col">speed</td>
                            <td className="row">{wind.speed}</td>
                        </tr>
                        <tr>
                            <td className="col">degree</td>
                            <td className="row">
                                <span style={{ display: 'inline-block', transform: `rotate(${wind.deg}deg)` }}>
                                    <BsArrowUp />
                                </span>
                                &nbsp;{wind.deg}&deg;
                            </td>
                        </tr>
                        <tr>
                            <td className="col">gust</td>
                            <td className="row">{wind.gust}</td>
                        </tr>
                    </table>

                </span>

                <div id="icon-temp">
                    {icon}
                    <h4> {main.temp}</h4>
                </div>

                <span id="temp">
                    <h4>Temperature</h4>
                    <table id="temp-table">
                        <tr>
                            <td className="col">feels like</td>
                            <td className="row">{main.feels_like}</td>
                        </tr>
                        <tr>
                            <td className="col">min</td>
                            <td className="row">{main.temp_min}</td>
                        </tr>
                        <tr>
                            <td className="col">max</td>
                            <td className="row">{main.temp_max}</td>
                        </tr>
                    </table>
                </span>
            </div>
            <div id="misc">
                <p>
                    <p>
                        <b>Sea level</b>: {main.sea_level}<b>hPa</b>
                    </p>
                    <p>
                        <b>Ground level</b>: {main.grnd_level}<b>hPa</b>
                    </p>
                    <p>
                        <b>Pressure</b>: {main.grnd_level}<b>hPa</b>
                    </p>
                    <p>
                        <b>Humidity</b>: {main.humidity}%
                    </p>
                </p>
                <p>
                    {current.snow ? (
                        <p>
                            <BsSnow2 />
                        </p>
                    ) : current.rain ? (
                        <p>
                            <BsCloudRainFill title='rain volume' /> {current.rain["1h"]}mm/hr
                        </p>
                    ) : undefined}
                    <p>
                        <BsCloudFill title='cloudiness' /> {current.clouds.all}%
                    </p>
                    <p>
                        <BsEyeFill title='visibility' /> {current.visibility / 1000}km
                    </p>
                </p>
            </div>
        </div>

    )
}
export default CurrentWeather;
