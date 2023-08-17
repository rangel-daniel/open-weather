import { BiCurrentLocation } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { Dispatch, FocusEvent, KeyboardEvent, SetStateAction, useEffect, useState } from 'react';
import { Place } from './App';

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
                const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=3&appid=${APPID}`
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
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (e.key === 'ArrowDown') {
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

        place['val'] = `${name}${state ? ', ' + state : ''}, ${place.country} `

        const country = fullName.of(place.country);

        if (country)
            place['country'] = country;

        setQuery(place['val']);
        setPlace(place);
        setNavigating(false);
    }

    return (
        <div id='search-bar'>
            <div className='bar'>
                <input onKeyDown={(e) => keyDown(e)} id='search' type='search' value={query} placeholder='Search for location' onChange={(e) => setQuery(e.target.value)} onFocus={() => handleSearchFocus()} onBlur={() => setTyping(false)} />
                <button> <BiCurrentLocation /> </button>
            </div>
            {
                show && result.length > 0 && (
                    <div className='bar'>
                        <div id='results'>
                            {result.map((p: Place, i: number) => (
                                <button onFocus={() => setNavigating(true)} onBlur={(e) => handleBtnBlur(e)} onKeyDown={(e) => keyDown(e)} id={'sel' + i} key={i} className='search-select' tabIndex={i + 1} onClick={() => handleClick(p)}>
                                    <MdLocationPin /> {p.name} {p.state}, {countryStr(p.country)}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Search
