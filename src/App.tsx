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
}

function App() {
    const [place, setPlace] = useState<Place | undefined>();

    return (
        <>
            <Search setPlace={setPlace} />
            <Weather place={place} />
        </>
    )
}

export default App
