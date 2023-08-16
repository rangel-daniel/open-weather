import { BiCurrentLocation } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { useEffect, useState } from 'react';

function Search({ setLocation }: { setLocation: any }) {
    const APPID = import.meta.env.VITE_APPID;
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<any[]>([]);
    const [focus, setFocus] = useState(false);
    let indx = -1;

    useEffect(() => {
        console.log('ran')
        focus && result.length ? document.addEventListener('keydown', mvFocus) :
            document.removeEventListener('keydown', mvFocus);
    }, [focus, result.length])

    useEffect(() => {
        const handleSearch = async () => {
            if (query.length) {
                const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=3&appid=${APPID}`
                const response = await fetch(url);
                const data = await response.json();
                setResult(data);
                console.log(url, data);
            } else {
                setResult([]);
            }
        }

        console.log(query)
        handleSearch();
    }, [query])

    const fullName = new Intl.DisplayNames(['en'], { type: 'region' });

    const mvFocus = (e: any) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const len = result.length;

            if (e.key === 'ArrowDown') {
                indx++;
                if (indx > len - 1) {
                    indx = 0
                }
            } else if (indx >= 0) {
                indx--;
                if (indx < 0) {
                    indx = len - 1;
                }
            } else {
                console.log('index', indx, 'length', len);
                return;
            }
            document.removeEventListener('keydown', mvFocus);
            const elem = document.getElementById('sel' + indx);

            if (elem) {
                elem.focus();
                document.addEventListener('keydown', mvFocus);
            } else {
                indx = -1;
            }
            console.log(indx, result.length);
        }
    }

    const handleSelect = (loc: any) => {
        setLocation(loc);
        setFocus(false);
        document.removeEventListener('keydown', mvFocus);
    }

    return (
        <div id='search-bar'>
            <div className='bar'>
                <input type='search' value={query} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder='Search for location' onChange={(e) => setQuery(e.target.value)} />
                <button> <BiCurrentLocation /> </button>
            </div>
            {
                (focus && result.length > 0) && (
                    <div className='bar'>
                    <div id="flex-item">Flex Item 1</div>
                        <div id='results'>
                            {result.map((r: any, i: number) => (
                                <button id={'sel' + i} key={i} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className='search-select' onClick={() => handleSelect(r)} tabIndex={i}>
                                    <MdLocationPin /> {r.name} {r.state}, {fullName.of(r.country)}
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
