import { ThreeHrBlock, getAmPm, getDeg, getIcon } from "./WeatherData";
function DayWeather({ data, timezone }: { data: ThreeHrBlock[], timezone: number }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Temperature</th>
                        <th>Wind</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) => (
                            <tr key={i}>
                                <td>
                                    {getAmPm(d.dt, timezone)}
                                </td>

                                <td>
                                    {d.main.temp} {getIcon('s', d.weather[0].icon, d.weather[0].main)}
                                </td>

                                <td>
                                    {d.wind.speed} <br /> {getDeg(d.wind.deg)}
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
