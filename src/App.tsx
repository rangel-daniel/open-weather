import { useState } from 'react';
import './App.css'
import Search from './Search'
import Weather from './Weather';

function App() {
    const [location, setLocation] = useState();

    return (
        <>
            <Search setLocation={setLocation} />
            <Weather location={location}/>
        </>
    )
}

export default App
