import { days, locations } from "../data/trip";
import { getCached, setCached } from "./buildCache";

const ROUTE_CACHE_MS = 1000 * 60 * 60 * 24 * 365;

export interface TripRoute {
    roadRoute: [number, number][];
    distanceKmByDayId: Record<number, number>;
}

function getOrderedStops() {
    const seen = new Set<string>();
    const coords: [number, number][] = [];
    const arrivalDayId: number[] = [];
    for (const day of days) {
        if (seen.has(day.locationId)) continue;
        seen.add(day.locationId);
        const location = locations.find((l) => l.id === day.locationId);
        if (!location) continue;
        coords.push([location.lat, location.lng]);
        arrivalDayId.push(day.id);
    }
    return { coords, arrivalDayId };
}

// Ruta real por carretera (para el mapa) + km de cada tramo, atribuidos al
// día en que se llega a la siguiente parada (para el timeline)
export async function getTripRoute(): Promise<TripRoute> {
    const { coords, arrivalDayId } = getOrderedStops();
    const cacheKey = `route:${JSON.stringify(coords)}`;
    const cached = getCached<TripRoute>(cacheKey, ROUTE_CACHE_MS);
    if (cached !== undefined) return cached;

    const coordsStr = coords.map(([lat, lng]) => `${lng},${lat}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`OSRM ${res.status}`);
        const data = await res.json();
        const route = data.routes[0];
        const roadRoute: [number, number][] = route.geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng],
        );

        // legs[i] es el tramo entre la parada i y la i+1; lo atribuimos al
        // día en que se llega a la parada i+1
        const distanceKmByDayId: Record<number, number> = {};
        route.legs.forEach((leg: { distance: number }, i: number) => {
            const dayId = arrivalDayId[i + 1];;
            distanceKmByDayId[dayId] = Math.round(leg.distance / 1000);
        });

        const result: TripRoute = { roadRoute, distanceKmByDayId };
        setCached(cacheKey, result);
        return result;
    } catch (err) {
        console.warn("OSRM falló en build, usando línea recta de respaldo", err);
        return { roadRoute: coords, distanceKmByDayId: {} };
    }
}