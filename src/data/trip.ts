export interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    colorGroup: string;
}

export interface TripDay {
    id: number;
    date: string;
    weekday: string;
    title: string;
    locationId: string;
    activities: string[];
    overnight: string | null;
    transportIcon?: "flight" | "car" | null;
}

export const locations: Location[] = [
    { id: "sf", name: "San Francisco", lat: 37.7749, lng: -122.4194, colorGroup: "purple" },
    { id: "mariposa", name: "Mariposa", lat: 37.4849, lng: -119.9663, colorGroup: "purple" },
    { id: "visalia", name: "Visalia (Sequoia)", lat: 36.3302, lng: -119.2921, colorGroup: "green" },
    { id: "vegas", name: "Las Vegas", lat: 36.1699, lng: -115.1398, colorGroup: "orange" },
    { id: "page", name: "Zion + Bryce + Page", lat: 36.9147, lng: -111.4558, colorGroup: "blue" },
    { id: "monument", name: "Monument Valley", lat: 37.0031, lng: -110.2233, colorGroup: "red" },
    { id: "williams", name: "Gran Cañón + Williams", lat: 35.2494, lng: -112.1901, colorGroup: "yellow" },
    { id: "route66", name: "Ruta 66 (Williams→LA)", lat: 35.3253, lng: -112.8746, colorGroup: "brown" },
    { id: "la", name: "Los Ángeles", lat: 34.0522, lng: -118.2437, colorGroup: "teal" },
];

export const days: TripDay[] = [
    {
        id: 1, date: "2026-10-17", weekday: "SÁB", title: "San Francisco",
        locationId: "sf",
        activities: ["Llegada 21:59", "Inmigración y traslado al hotel", "Check-in y descanso"],
        overnight: "San Francisco", transportIcon: null,
    },
    {
        id: 2, date: "2026-10-18", weekday: "DOM", title: "San Francisco",
        locationId: "sf",
        activities: ["Free Tour (10:30)", "Cable Car, Lombard Street", "Pier 39, Ghirardelli", "Palace of Fine Arts", "Golden Gate al atardecer"],
        overnight: "San Francisco", transportIcon: null,
    },
    {
        id: 3, date: "2026-10-19", weekday: "LUN", title: "San Francisco + Mariposa",
        locationId: "mariposa",
        activities: ["Alcatraz (11:00)", "Comer y recoger maletas", "BART al aeropuerto", "Recoger coche de alquiler", "Compra en Walmart / Target", "Salida hacia Mariposa"],
        overnight: "Mariposa", transportIcon: "car",
    },
    {
        id: 4, date: "2026-10-20", weekday: "MAR", title: "Yosemite + Sequoia",
        locationId: "visalia",
        activities: ["Yosemite: Tunnel View, Bridalveil Fall, El Capitan, Yosemite Village", "Sequoia: General Sherman, Congress Trail"],
        overnight: "Visalia", transportIcon: "car",
    },
    {
        id: 5, date: "2026-10-21", weekday: "MIÉ", title: "Death Valley + Las Vegas",
        locationId: "vegas",
        activities: ["Zabriskie Point", "Badwater Basin", "Artist's Drive", "Llegada a Las Vegas al atardecer", "Paseo nocturno por el Strip"],
        overnight: "Las Vegas", transportIcon: "car",
    },
    {
        id: 6, date: "2026-10-22", weekday: "JUE", title: "Las Vegas",
        locationId: "vegas",
        activities: ["Campo de tiro", "North Premium Outlets", "Bellagio, Caesars, Venetian, Paris", "Fremont Street por la noche"],
        overnight: "Las Vegas", transportIcon: null,
    },
    {
        id: 7, date: "2026-10-23", weekday: "VIE", title: "Las Vegas",
        locationId: "vegas",
        activities: ["Día libre para disfrutar a tu ritmo", "Piscina, compras, espectáculos, relax o repetir tus sitios favoritos"],
        overnight: "Las Vegas", transportIcon: null,
    },
    {
        id: 8, date: "2026-10-24", weekday: "SÁB", title: "Zion + Bryce + Page",
        locationId: "page",
        activities: ["Zion National Park", "Bryce Canyon", "Horseshoe Bend (según horario Antelope)", "Lower Antelope Canyon"],
        overnight: "Page", transportIcon: "car",
    },
    {
        id: 9, date: "2026-10-25", weekday: "DOM", title: "Monument Valley",
        locationId: "monument",
        activities: ["Visitor Center", "Valley Drive", "The Mittens, John Ford Point, Three Sisters", "Atardecer inolvidable"],
        overnight: "Goulding's Lodge", transportIcon: "car",
    },
    {
        id: 10, date: "2026-10-26", weekday: "LUN", title: "Gran Cañón + Williams",
        locationId: "williams",
        activities: ["Entrada Este (Desert View)", "Miradores: Lipan Point, Grandview, Yavapai, Mather Point", "Conducción hasta Williams", "Paseo nocturno por Williams (Ruta 66)"],
        overnight: "Williams", transportIcon: "car",
    },
    {
        id: 11, date: "2026-10-27", weekday: "MAR", title: "Ruta 66 — Día Completo",
        locationId: "route66",
        activities: ["Williams → Seligman → Hackberry → Kingman → Oatman → Sitgreaves Pass", "Llegada a Los Ángeles por la tarde"],
        overnight: "Los Ángeles", transportIcon: "car",
    },
    {
        id: 12, date: "2026-10-28", weekday: "MIÉ", title: "Santa Mónica + Venice",
        locationId: "la",
        activities: ["Final de la Ruta 66 en el muelle", "Playa, Venice Beach, Muscle Beach"],
        overnight: "Los Ángeles", transportIcon: null,
    },
    {
        id: 13, date: "2026-10-29", weekday: "JUE", title: "Universal Studios",
        locationId: "la",
        activities: ["Día entero en el parque", "Nintendo World, Jurassic World, Harry Potter, Studio Tour, WaterWorld", "CityWalk por la noche"],
        overnight: "Los Ángeles", transportIcon: null,
    },
    {
        id: 14, date: "2026-10-30", weekday: "VIE", title: "Malibú + Hollywood",
        locationId: "la",
        activities: ["Malibú Pier, Pacific Coast Highway", "Paseo de la Fama, Dolby Theatre, TCL Chinese Theatre", "Griffith Observatory"],
        overnight: "Los Ángeles", transportIcon: null,
    },
    {
        id: 15, date: "2026-10-31", weekday: "SÁB", title: "Día Flexible — Halloween",
        locationId: "la",
        activities: ["Compras, outlets (Citadel)", "Repetir lugares favoritos", "Disfrutar Halloween en LA"],
        overnight: "Los Ángeles", transportIcon: null,
    },
    {
        id: 16, date: "2026-11-01", weekday: "DOM", title: "Regreso",
        locationId: "la",
        activities: ["Desayuno tranquilo", "Últimas compras", "Devolver coche en el aeropuerto", "Vuelo de regreso a las 18:00"],
        overnight: null, transportIcon: "flight",
    },
];