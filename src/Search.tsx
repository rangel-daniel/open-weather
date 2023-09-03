import { BiCurrentLocation } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { Dispatch, FocusEvent, KeyboardEvent, SetStateAction, useEffect, useState } from 'react';
import { Place } from './App';
import './Search.css'

function Search({ setPlace }: { setPlace: Dispatch<SetStateAction<Place | undefined>> }) {
    const APPID = import.meta.env.VITE_APPID;

    const [query, setQuery] = useState('');
    const [result, setResult] = useState<Place[]>([]);

    const [index, setIndex] = useState(-1);

    const [show, setShow] = useState(false);
    const [typing, setTyping] = useState(false);
    const [navigating, setNavigating] = useState(false);


    useEffect(() => {
        const handleSearch = async () => {
            if (query.length) {
                const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APPID}`
                const response = await fetch(url);
                const data = await response.json() as Place[];
                setResult(data);
            } else {
                setResult([]);
            }
        }

        handleSearch();
    }, [query, APPID])

    useEffect(() => {
        document.getElementById('sel' + index)?.focus();

    }, [index])


    useEffect(() => {
        if (typing || navigating) {
            setShow(true)
        } else {
            setShow(false);
        }
    }, [typing, navigating])

    const fullName = new Intl.DisplayNames(['en'], { type: 'region' });

    const getGeo = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const coords = position.coords;
                const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&appid=${APPID}`;

                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.length > 0) {
                            handleClick(data[0]);
                            console.log(data);
                        } else {
                            console.error('No data received from the API');
                        }
                    } else {
                        console.error('Failed to fetch data from the API');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            },
            (error) => {
                console.error(error.message);
            });
    }

    useEffect(() => {
        getGeo();
    },[]);

    const countryStr = (code: string): string => {
        let country: string | undefined;
        try {
            country = fullName.of(code);
        } catch (e) {
            country = code;
        }

        return country ? country : code;
    }

    const keyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Tab') {
            e.preventDefault();
            if (e.key === 'ArrowDown' || e.key === 'Tab') {
                index + 1 < result.length ? setIndex(index + 1) : setIndex(0);
            } else {
                index - 1 < 0 ? setIndex(result.length - 1) : setIndex(index - 1);

                if (result.length === 1) { // No round-robin.
                    document.getElementById('search')?.focus();
                }
            }
        } else if (navigating && e.key !== 'Enter') {
            document.getElementById('search')?.focus();
        }
    }

    const handleSearchFocus = () => {
        setIndex(-1);
        setTyping(true);
    }

    const handleBtnBlur = (e: FocusEvent) => {
        e.preventDefault();
        setNavigating(false);
    }

    const handleClick = (place: Place) => {
        const name = place.name;
        const state = place.state;

        place['val'] = `${name}${state ? ', ' + state : ''}, ${place.country}`

        const country = fullName.of(place.country);

        if (country)
            place['country'] = country;

        place['string'] = `${name} ${state ? state : ''}, ${place.country} `
        setQuery(place['val']);
        setPlace(place);
        setNavigating(false);
        console.log(place)
    }

    return (
        <div id='search-bar'>
            <div className='bar'>
                <input onKeyDown={(e) => keyDown(e)} id='search' type='search' value={query} placeholder='Search for location' onChange={(e) => setQuery(e.target.value)} onFocus={() => handleSearchFocus()} onBlur={() => setTyping(false)} />
                <button onClick={() => getGeo()}> <BiCurrentLocation /> </button>
            </div>
            {
                show && result.length > 0 && (
                    <div id='results'>
                        {result.map((p: Place, i: number) => (
                            <button onFocus={() => setNavigating(true)} onBlur={(e) => handleBtnBlur(e)} onKeyDown={(e) => keyDown(e)} id={'sel' + i} key={i} className='search-select' onClick={() => handleClick(p)}>
                                <MdLocationPin /> {p.name} {p.state}, {countryStr(p.country)}
                            </button>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Search
