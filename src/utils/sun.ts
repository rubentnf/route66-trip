import { getCached, setCached } from "./buildCache";

// El amanecer/atardecer de una fecha+lugar concretos es un dato astronómico
// fijo, no cambia - cacheamos igual de "para siempre" que la ruta.
const CACHE_MS = 1000 * 60 * 60 * 24 * 365;

export interface SunTimes {
    sunrise: string;
    sunset: string;
}

export async function getSunTimes(
    lat: number,
    lng: number,
    isoDate: string,
    timezone: string,
): Promise<SunTimes | null> {
    const cacheKey = `sun:${lat},${lng}:${isoDate}`;
    const cached = getCached<SunTimes>(cacheKey, CACHE_MS);
    if (cached !== undefined) return cached;

    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${isoDate}&formatted=0`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`[sun] ${res.status} para ${lat},${lng} ${isoDate}`);
            return null;
        }
        const data = await res.json();
        if (data.status !== "OK") {
            console.error(`[sun] status ${data.status} para ${lat},${lng} ${isoDate}`);
            return null;
        }

        const fmt = (iso: string) =>
            new Intl.DateTimeFormat("es-ES", {
                timeZone: timezone,
                hour: "2-digit",
                minute: "2-digit",
            }).format(new Date(iso));

        const result: SunTimes = {
            sunrise: fmt(data.results.sunrise),
            sunset: fmt(data.results.sunset),
        };
        setCached(cacheKey, result);
        return result;
    } catch (err) {
        console.error(`[sun] excepción para ${lat},${lng} ${isoDate}:`, err);
        return null;
    }
}