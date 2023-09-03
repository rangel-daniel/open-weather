import { useState } from 'react';
import './App.css'
import Search from './Search'
import Weather from './Weather';

export type Place = {
    name: string,
    state?: string,
    country: string,
    val: string,
    string: string
    lat: number,
    lon: number
}

function App() {
    const [place, setPlace] = useState<Place | undefined>();

    return (
        <>
            <header>
                <a href='https://openweathermap.org/' draggable='false'>
                    <img src='/open_weather.png' alt='open weather' draggable='false' />
                </a>
            </header>

            <main>
                <span>
                    <Search setPlace={setPlace} />
                    <Weather place={place} />
                </span>
            </main>

        </>
    )
}

export default App 
