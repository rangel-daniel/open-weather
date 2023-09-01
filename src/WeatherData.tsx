import { BsArrowUp } from 'react-icons/bs';
export type FiveDay = {
    list: {
        dt: number,
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            sea_level: number,
            grnd_level: number,
            humidity: number,
            temp_kf: number
        },
        weather: {
            main: string,
            description: string,
            icon: string
        }[],
        wind: {
            speed: number,
            deg: number,
            gust: number
        },
        clouds: {
            all: number
        },
        visibility: number,
        pop: number,
        rain?: {
            '3h'?: number
        },
        snow?: {
            '3h'?: number
        },
        sys: {
            pod: string
        }
    }[],
    city: {
        timezone: number
    }
}

export type ParsedDay = {
    day: string,
    data: ThreeHrBlock[]
}

export type ThreeHrBlock = {
    dt: number,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level: number,
        humidity: number,
        temp_kf: number
    },
    weather: {
        main: string,
        description: string,
        icon: string
    }[],
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    visibility: number,
    pop: number,
    rain?: {
        '3h'?: number
    },
    snow?: {
        '3h'?: number
    },
    sys: {
        pod: string
    }
}

export type Current = {
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    weather: {
        main: string,
        description: string,
        icon: string
    }[]
    ,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    rain?: {
        '1h'?: number,
        '3h'?: number
    },
    snow?: {
        '1h'?: number,
        '3h'?: number
    },
    clouds: {
        all: number
    },
    sys: {
        sunrise: number,
        sunset: number
    },
    visibility: number,
    dt: number,
    timezone: number,
}

export function getIcon(size: 's' | 'm' | 'l' = 's', icon: string, main: string) {
    const end = {
        s: `${icon}.png`,
        m: `${icon}@2x.png`,
        l: `${icon}@4x.png`
    }
    const url = `https://openweathermap.org/img/wn/${end[size]}`;

    return (
        <img alt={main} src={url} />
    )

}

export function getDeg(deg: number) {
    return (
        <>
            {deg}&deg;
            <span style={{ display: 'inline-block', transform: `rotate(${deg}deg)` }}>
                <BsArrowUp />
            </span>
        </>
    )
}

export function getDay(day: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return days[day];
}

export function getAmPm(_date: Date | number, shift: number = 0): string {
    const date: Date = _date instanceof Date ? _date : unixToDate(_date, shift)

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const period = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12 === 0 ? 12 : hours % 12;
    const prettyMins = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${prettyMins} ${period}`
}

export function unixToDate(time: number, shift: number) {
    return new Date((time + shift) * 1000);
}
