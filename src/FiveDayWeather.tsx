import { FiveDay, ParsedDay, getDay, unixToDate } from "./WeatherData";
import './FiveDayWeather.css'
import { useEffect, useState } from "react";
import DayWeather from "./DayWeather";
function FiveDayWeather({ data }: { data: FiveDay }) {
    const [parsed, setParsed] = useState<ParsedDay[]>([])
    const [selected, setSelected] = useState(0);
    const timezone = data.city.timezone;

    useEffect(() => {
        const list = data.list;
        const new_parsed: ParsedDay[] = [];

        let i = 0;

        let date = unixToDate(list[i].dt, data.city.timezone);
        let day = getDay(date.getUTCDay());

        for (const l of list) {
            date = unixToDate(l.dt, data.city.timezone);
            day = getDay(date.getUTCDay());

            if (!new_parsed[i]) {
                new_parsed[i] = {
                    day,
                    data: [l]
                }
            } else if (day === new_parsed[i].day) {
                new_parsed[i].data.push(l);
            } else {
                i++;
                new_parsed[i] = {
                    day,
                    data: [l]
                }
            }
        }

        setParsed(new_parsed);
        console.log('new parsed', new_parsed);
    }, [data])

    return (
        <>
            <div id="tabs">
                {parsed.map((day, i) => (
                    <span
                        style={i === selected ? { textDecoration: 'none', backgroundColor: '#D3D3D3AA' } : undefined}
                        key={i}
                        className="tab"
                        onClick={() => setSelected(i)}>
                        {day.day}
                    </span>
                ))}
            </div>
            {
                parsed[selected] && (<DayWeather timezone={timezone} data={parsed[selected].data} />)
            }
        </>
    )
}

export default FiveDayWeather;
