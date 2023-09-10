import { BiCurrentLocation } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { Dispatch, FocusEvent, KeyboardEvent, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { Place } from './App';
import './Search.css'

const APPID = import.meta.env.VITE_APPID;
function Search({ setPlace }: { setPlace: Dispatch<SetStateAction<Place | undefined>> }) {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState<Place[]>([]);

    const [index, setIndex] = useState(-1);

    const [show, setShow] = useState(false);
    const [typing, setTyping] = useState(false);
    const [navigating, setNavigating] = useState(false);


    useEffect(() => {
        const handleSearch = async () => {
            if (query.length) {
                const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APPID}`
                const response = await fetch(url);
                const data = await response.json() as Place[];
                setResult(data);
            } else {
                setResult([]);
            }
        }

        handleSearch();
    }, [query])

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

    const fullName = useMemo(() => {
        return new Intl.DisplayNames(['en'], { type: 'region' });
    }, []);

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
            const length = result.length + 1;
            if (e.key === 'ArrowDown' || e.key === 'Tab') {
                index + 1 < length ? setIndex(index + 1) : setIndex(0);
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

    const handleClick = useCallback(async (place: Place | null) => {
        if (place === null) {
            place = await getGeo();
        }

        if (place) {
            const name = place.name;
            const state = place.state;

            place['val'] = `${name}${state ? ', ' + state : ''}, ${place.country}`

            const country = fullName.of(place.country);

            if (country) {
                place['country'] = country;
            }

            place['string'] = `${name} ${state ? state : ''}, ${place.country} `

            setQuery(place['val']);
            setPlace(place);
            setNavigating(false);
        }
    }, [fullName, setPlace]);

    useEffect(() => {
        console.log('sprint');
        handleClick(null);
    }, [handleClick])

    const getGeo = async (): Promise<Place | null> => {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const coords = position.coords;
                        const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&appid=${APPID}`;

                        try {
                            const response = await fetch(url);
                            if (response.ok) {
                                const data = await response.json();
                                if (data.length > 0) {
                                    resolve(data[0])
                                } else {
                                    reject(null)
                                    console.error('No data received from the API');
                                }
                            } else {
                                reject(null)
                                console.error('Failed to fetch data from the API');
                            }
                        } catch (error) {
                            reject(null)
                            console.error('An error occoured while requesting data from API');
                        }
                    },
                    () => {
                        reject(null)
                        console.error('An error occoured while requesting data from API');
                    });
            } else {
                console.error('geolocation is not available');
            }
        });
    }

    return (
        <div id='search-bar'>
            <div className='bar'>
                <input onKeyDown={(e) => keyDown(e)} id='search' type='search' value={query} placeholder='Search for location' onChange={(e) => setQuery(e.target.value)} onFocus={() => handleSearchFocus()} onBlur={() => setTyping(false)} />
            </div>
            {
                show && result.length > 0 && (
                    <div id='results'>
                        <button onFocus={() => setNavigating(true)} onBlur={(e) => handleBtnBlur(e)} onKeyDown={(e) => keyDown(e)} id={'sel' + 0} key={0} className='search-select' onClick={() => handleClick(null)}>
                            <BiCurrentLocation /> Your location
                        </button>
                        {result.map((p: Place, i: number) => (
                            <button onFocus={() => setNavigating(true)} onBlur={(e) => handleBtnBlur(e)} onKeyDown={(e) => keyDown(e)} id={'sel' + (i + 1)} key={i + 1} className='search-select' onClick={() => handleClick(p)}>
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
