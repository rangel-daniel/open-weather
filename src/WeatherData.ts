export type WeekWeather = {
    list:
    {
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
            id: number,
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
        },
        dt: number,
    }[]
    ,
    city: {
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

export type CurrentWeather = {
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
