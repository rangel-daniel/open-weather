import { Properties } from 'csstype'
import { useState } from 'react';
import { Place } from './App';
import './Weather.css'

function Weather({ place }: { place?: Place }) {
    const [is_day, setIsDay] = useState(false);

    const l_bg: Properties = {
        backgroundColor: is_day ? 'transparent' : '#3584e4',
        color: is_day ? 'black' : 'white'
    }

    const r_bg: Properties = {
        backgroundColor: !is_day ? 'transparent' : '#3584e4',
        color: !is_day ? 'black' : 'white'
    }

    return (
        <div id='weather-box' style={{ margin: '55px', borderStyle: 'solid', borderWidth: 'thin' }}>
            <label id="selector">
                <div id="left" onClick={() => setIsDay(false)} style={l_bg}>Week</div>
                <div id="right" onClick={() => setIsDay(true)} style={r_bg}>Day</div>
            </label>

            <h2>
                {place?.string}
            </h2>
        </div>
    )
}

export default Weather;
