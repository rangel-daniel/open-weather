import { Current, getMs, getInch, getC, getAmPm, getDay, getDeg, getIcon, unixToDate } from "./WeatherData"
import { BsEyeFill, BsSnow2, BsSunriseFill, BsSunsetFill, BsCloudFill, BsCloudRainFill } from 'react-icons/bs';
import './CurrentWeather.css'

function CurrentWeather({ data, is_imp }: { data: Current, is_imp: boolean }) {
    const weather = data.weather[0];

    const main = data.main;
    const wind = data.wind;
    const icon = getIcon('l', weather.icon, weather.main);

    const sunrise = getAmPm(data.sys.sunrise, data.timezone);
    const sunset = getAmPm(data.sys.sunset, data.timezone);

    const dt = unixToDate(data.dt, data.timezone);
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
                        <tbody>
                            <tr className="tr">
                                <td className="col">speed</td>
                                <td className="row">
                                    {is_imp ? (wind.speed + 'mph') : (getMs(wind.speed))}
                                </td>
                            </tr>
                            <tr className="tr">
                                <td className="col">degree</td>
                                <td className="row"> {getDeg(wind.deg)} </td>
                            </tr>
                            <tr className="tr">
                                <td className="col">gust</td>
                                <td className="row">
                                    {is_imp ? (wind.gust + 'mph') : (getMs(wind.gust))}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </span>

                <div id="icon-temp">
                    {icon}
                    <h4> {is_imp ? (main.temp + '°F') : (getC(main.temp))}</h4>

                </div>

                <span id="temp">
                    <h4>Temperature</h4>
                    <table id="temp-table">
                        <tbody>
                            <tr className="tr">
                                <td className="col">feels like</td>
                                <td className="row">
                                    {is_imp ? (main.feels_like + '°F') : (getC(main.feels_like))}
                                </td>
                            </tr>
                            <tr className="tr">
                                <td className="col">min</td>
                                <td className="row">
                                    {is_imp ? (main.temp_min + '°F') : (getC(main.temp_min))}
                                </td>
                            </tr>
                            <tr className="tr">
                                <td className="col">max</td>
                                <td className="row">
                                    {is_imp ? (main.temp_max + '°F') : (getC(main.temp_max))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </span>
            </div>
            <div id="misc">
                <div>
                    <b>Humidity</b>: {main.humidity}%
                    {main.sea_level && <div><b>Sea level</b>: {main.sea_level}<span className="faint">hPa </span> </div>}
                    {main.grnd_level && <div><b>Ground level</b>: {main.grnd_level}<span className="faint">hPa </span></div>}
                    {main.pressure && <div><b>Pressure</b>: {main.pressure}<span className="faint">hPa </span></div>}
                </div>

                <p>
                    {
                        data.snow ? (
                            <>
                                <BsSnow2 title='snow volume' /> &nbsp;
                                {is_imp && data.snow['1h'] ? (getInch(data.snow["1h"])) : (data.snow["1h"] + 'mm/hr')}<br />

                            </>
                        ) :
                            data.rain ? (
                                <>
                                    <BsCloudRainFill title='snow volume' /> &nbsp;
                                    {is_imp && data.rain['1h'] ? (getInch(data.rain["1h"])) : (data.rain["1h"] + 'mm/hr')}<br />

                                </>
                            ) : undefined
                    }
                    <BsCloudFill title='cloudiness' /> {data.clouds.all}% <br />
                    <BsEyeFill title='visibility' /> {data.visibility / 100}% <br />
                </p>
            </div>
        </div>

    )
}
export default CurrentWeather;
