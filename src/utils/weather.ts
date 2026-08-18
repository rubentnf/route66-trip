import { getCached, setCached } from "./buildCache";

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
const SIX_HOURS_MS = 1000 * 60 * 60 * 6;

export interface DayWeather {
    tempMax: number;
    tempMin: number;
    weatherCode: number;
    precipitation: number;
}

const WEATHER_LABELS: Record<number, { icon: string, label: string }> = {
    0: { icon: "☀️", label: "Despejado" },
    1: { icon: "🌤️", label: "Mayormente despejado" },
    2: { icon: "⛅", label: "Parcialmente nublado" },
    3: { icon: "☁️", label: "Nublado" },
    45: { icon: "🌫️", label: "Niebla" },
    48: { icon: "🌫️", label: "Niebla" },
    51: { icon: "🌦️", label: "Llovizna ligera" },
    53: { icon: "🌦️", label: "Llovizna" },
    55: { icon: "🌦️", label: "Llovizna intensa" },
    61: { icon: "🌧️", label: "Lluvia ligera" },
    63: { icon: "🌧️", label: "Lluvia" },
    65: { icon: "🌧️", label: "Lluvia intensa" },
    71: { icon: "🌨️", label: "Nieve ligera" },
    73: { icon: "🌨️", label: "Nieve" },
    75: { icon: "❄️", label: "Nieve intensa" },
    80: { icon: "🌦️", label: "Chubascos" },
    81: { icon: "🌧️", label: "Chubascos" },
    82: { icon: "⛈️", label: "Chubascos fuertes" },
    95: { icon: "⛈️", label: "Tormenta" },
};

export function describeWeatherCode(code: number) {
    return WEATHER_LABELS[code] ?? { icon: "🌡️", label: "—" };
}

export interface WeatherWarning {
    icon: string;
    message: string;
}

async function fetchOpenMeteoDay(
    url: string,
    cacheKey: string,
    maxAgeMs: number,
): Promise<DayWeather | null> {
    const cached = getCached<DayWeather>(cacheKey, maxAgeMs);
    if (cached !== undefined) return cached;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`[weather] ${res.status} en ${url}:`, await res.text());
            return null;
        }
        const data = await res.json();
        if (!data.daily?.time?.length) {
            console.error(`[weather] sin datos diarios en ${url}`);
            return null;
        }
        const result: DayWeather = {
            tempMax: data.daily.temperature_2m_max[0],
            tempMin: data.daily.temperature_2m_min[0],
            weatherCode: data.daily.weathercode[0],
            precipitation: data.daily.precipitation_sum[0],
        };
        setCached(cacheKey, result);
        return result;
    } catch (err) {
        console.error(`[weather] excepción en ${url}:`, err);
        return null;
    }
}

// Clima real de esa misma fecha (mes-día) en `year`, vía Open-Metro Historical
// Weather API (reanálisis ERA5). No requiere API Key.
export async function getHistoricalWeather(
    lat: number,
    lng: number,
    monthDay: string, // "MM-DD"
    year: number,
): Promise<DayWeather | null> {
    const date = `${year}-${monthDay}`;
    const cacheKey = `historical:${lat},${lng}:${date}`;
    const url =
        `https://archive-api.open-meteo.com/v1/archive` +
        `?latitude=${lat}&longitude=${lng}` +
        `&start_date=${date}&end_date=${date}` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode` +
        `&timezone=auto`;
    return fetchOpenMeteoDay(url, cacheKey, ONE_YEAR_MS);
}

export type WeatherSource = "forecast" | "historical";

export interface DayWeatherResult extends DayWeather {
    source: WeatherSource;
}

// Previsión real (Open-Meteo Forecast API, no la histórica) - solo cubre
// aprox. los próximos 16 días desde hoy
export async function getForecastWeather(
    lat: number,
    lng: number,
    isoDate: string, // "YYYY-MM-DD"
): Promise<DayWeather | null> {
    const cacheKey = `forecast:${lat},${lng}:${isoDate}`;
    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}&longitude=${lng}` +
        `&start_date=${isoDate}&end_date=${isoDate}` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode` +
        `&timezone=auto`;
    return fetchOpenMeteoDay(url, cacheKey, SIX_HOURS_MS);
}

const FORECAST_WINDOW_DAYS = 16;

// Punto único de decisión: previsión real si el día ya cae dentro de la
// ventana de Open-Meteo: si no, histórico del año pasado como estimación
export async function getWeatherForDay(
    lat: number,
    lng: number,
    isoDate: string,
    referenceYear: number,
): Promise<DayWeatherResult | null> {
    const daysUntil = Math.floor(
        (new Date(isoDate + "T00:00:00").getTime() - Date.now()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysUntil >= 0 && daysUntil <= FORECAST_WINDOW_DAYS) {
        const forecast = await getForecastWeather(lat, lng, isoDate);
        if (forecast) return { ...forecast, source: "forecast" };
    }

    const [, month, day] = isoDate.split("-");
    const historical = await getHistoricalWeather(lat, lng, `${month}-${day}`, referenceYear);
    if (historical) return { ...historical, source: "historical" };

    return null;
}

export function getWeatherWarning(weather: DayWeather): WeatherWarning | null {
    if (weather.tempMax >= 38) {
        return {
            icon: "🥵",
            message: "Va a hacer muchísimo calor — lleva agua de sobra y protección solar",
        };
    }
    if (weather.tempMax >= 28) {
        return { icon: "🌡️", message: "Va a hacer bastante calor — hidrátate bien" };
    }
    if (weather.tempMin <= 2) {
        return { icon: "🥶", message: "Va a hacer frío — abrígate bien" };
    }
    if (weather.precipitation >= 5) {
        return {
            icon: "🌧️",
            message: "Buena probabilidad de lluvia — lleva algo para cubrirte",
        };
    }
    return null;
}