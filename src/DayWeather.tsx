import { ThreeHrBlock, getAmPm, getC, getDeg, getIcon, getMs } from "./WeatherData";
import './DayWeather.css'
function DayWeather({ data, timezone, is_imp }: { data: ThreeHrBlock[], timezone: number, is_imp: boolean }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Temperature</th>
                        <th>Wind</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) => (
                            <tr key={i}>
                                <td>
                                    {getAmPm(d.dt, timezone)}
                                    <p className="faint">
                                        {d.weather[0].description}
                                    </p>
                                </td>

                                <td className="align-img">
                                    {is_imp ? (d.main.temp + '°F') : (getC(d.main.temp))} {getIcon('s', d.weather[0].icon, d.weather[0].main)}
                                </td>

                                <td>
                                    {is_imp ? (d.wind.speed + 'mph') : (getMs(d.wind.speed))} <br /> {getDeg(d.wind.deg)}
                                </td>

                                <td className="center-text">
                                    {d.main.humidity}%
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DayWeather;
