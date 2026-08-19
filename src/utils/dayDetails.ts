import { days, locations, type TripDay } from "../data/trip";
import { getWeatherForDay, getWeatherWarning, type DayWeatherResult, type WeatherWarning } from "./weather";
import { getSunTimes, type SunTimes } from "./sun";
import { getTripRoute } from "./route";

export interface DayDetails {
    day: TripDay;
    weather: DayWeatherResult | null;
    warning: WeatherWarning | null;
    sun: SunTimes | null;
    distanceKm: number | undefined;
    funFact: string | undefined;
}

async function mapWithConcurrency<T, R>(
    items: T[],
    limit: number,
    fn: (item: T) => Promise<R>,
): Promise<R[]> {
    const results: R[] = new Array(items.length);
    let index = 0;
    async function worker() {
        while (index < items.length) {
            const current = index++;
            results[current] = await fn(items[current]);
        }
    }
    await Promise.all(Array.from({ length: limit }, worker));
    return results;
}

// Punto único que combina clima, amanecer/atardecer, km recorridos y
// curiosidad por día — lo usan TripTimeline y cualquier página que necesite
// el itinerario completo con todos sus datos.
export async function getDaysWithDetails(): Promise<DayDetails[]> {
    const locById = new Map(locations.map((l) => [l.id, l]));
    const referenceYear = new Date().getFullYear() - 1;
    const { distanceKmByDayId } = await getTripRoute();

    const seenLocations = new Set<string>();
    const funFactByDayId = new Map<number, string>();
    for (const day of days) {
        if (seenLocations.has(day.locationId)) continue;
        seenLocations.add(day.locationId);
        const fact = locById.get(day.locationId)?.funFact;
        if (fact) funFactByDayId.set(day.id, fact);
    }

    return mapWithConcurrency(days, 3, async (day) => {
        const loc = locById.get(day.locationId);
        const [weather, sun] = loc
            ? await Promise.all([
                  getWeatherForDay(loc.lat, loc.lng, day.date, referenceYear),
                  getSunTimes(loc.lat, loc.lng, day.date, loc.timezone),
              ])
            : [null, null];
        return {
            day,
            weather,
            warning: weather ? getWeatherWarning(weather) : null,
            sun,
            distanceKm: distanceKmByDayId[day.id],
            funFact: funFactByDayId.get(day.id),
        };
    });
}
