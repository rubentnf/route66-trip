export interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    colorGroup: string;
    timezone: string;
    theme?: "vegas" | "desert";
    funFact?: string;
}

export interface TripDay {
    id: number;
    date: string;
    title: string;
    locationId: string;
    activities: string[];
    overnight: string | null;
    transportIcon?: "flight" | "car" | null;
}

export function getDayById(id: number): TripDay | undefined {
    return days.find((d) => d.id === id);
}

export const locations: Location[] = [
    {
        id: "sf", name: "San Francisco", lat: 37.7749, lng: -122.4194, colorGroup: "purple",
        funFact: "El Golden Gate se pintó en 'international orange' porque se veía mejor entre la niebla — iba a ser gris azulado, como quería la Marina de EE. UU.",
        timezone: "America/Los_Angeles"
    },
    {
        id: "mariposa", name: "Mariposa", lat: 37.4849, lng: -119.9663, colorGroup: "purple",
        funFact: "Mariposa nació como pueblo minero en la fiebre del oro de 1849; hoy es la puerta sur de entrada a Yosemite.",
        timezone: "America/Los_Angeles"
    },
    {
        id: "yosemite", name: "Yosemite", lat: 37.7456, lng: -119.5936, colorGroup: "green",
        funFact: "En 1864 Lincoln firmó la Yosemite Grant para proteger este valle — el precedente que dio origen al propio concepto de parque nacional.",
        timezone: "America/Los_Angeles"
    },
    {
        id: "sequoia", name: "Sequoia", lat: 36.5786, lng: -118.75, colorGroup: "green",
        funFact: "El General Sherman, aquí, es el árbol más grande del planeta por volumen de madera: unos 1.487 m³.",
        timezone: "America/Los_Angeles"
    },
    {
        id: "deathvalley", name: "Death Valley", lat: 36.4636, lng: -116.8656, colorGroup: "orange",
        funFact: "En Furnace Creek se registró en 1913 la temperatura más alta jamás medida en la Tierra: 56,7 °C.",
        timezone: "America/Los_Angeles",
        theme: "desert"
    },
    {
        id: "vegas", name: "Las Vegas", lat: 36.1699, lng: -115.1398, colorGroup: "orange",
        funFact: "El cartel 'Welcome to Fabulous Las Vegas' está fuera de los límites de la ciudad, en el condado de Clark, y es Monumento Histórico desde 2009.",
        timezone: "America/Los_Angeles",
        theme: "vegas"
    },
    {
        id: "zion", name: "Zion National Park", lat: 37.201, lng: -112.986, colorGroup: "blue",
        funFact: "El nombre 'Zion' se lo pusieron colonos mormones en el s. XIX, como lugar de paz y refugio.",
        timezone: "America/Denver"
    },
    {
        id: "monument", name: "Antelope Canyon + Monument Valley", lat: 37.0031, lng: -110.2233, colorGroup: "red",
        funFact: "Monument Valley pertenece a la Nación Navajo, no es parque nacional de EE. UU. — hace falta permiso tribal para buena parte de las rutas.",
        timezone: "America/Denver"
    },
    {
        id: "williams", name: "Gran Cañón + Williams", lat: 35.2494, lng: -112.1901, colorGroup: "yellow",
        funFact: "Williams fue el último pueblo de la Ruta 66 saltado por la interestatal (I-40), en 1984 — por eso se le llama 'la última ciudad de la Ruta 66'.",
        timezone: "America/Phoenix"
    },
    {
        id: "route66", name: "Ruta 66 (Williams→LA)", lat: 35.3253, lng: -112.8746, colorGroup: "brown",
        funFact: "La Ruta 66 se inauguró el 11 de noviembre de 1926 — este viaje cae justo en su centenario.",
        timezone: "America/Phoenix"
    },
    {
        id: "la", name: "Los Ángeles", lat: 34.0522, lng: -118.2437, colorGroup: "teal",
        funFact: "El cartel de Hollywood decía originalmente 'HOLLYWOODLAND' — era un anuncio de una inmobiliaria de 1923.",
        timezone: "America/Los_Angeles"
    },
];


export const days: TripDay[] = [
    {
        id: 1, date: "2026-10-17", title: "Llegada: San Francisco",
        locationId: "sf",
        activities: [
            "Vuelo Tenerife → Madrid · IB1556 (2:45–6:30)",
            "Vuelo Madrid → Miami · IB4611 (13:00–16:35)",
            "Vuelo Miami → San Francisco · IB4676 (18:39–21:59)",
            "Check-in Club Quarters Hotel Embarcadero",
        ],
        overnight: "Club Quarters Hotel Embarcadero, San Francisco", transportIcon: "flight",
    },
    {
        id: 2, date: "2026-10-18", title: "San Francisco",
        locationId: "sf",
        activities: [
            "Free Tour (10:30)",
            "Cable Car, Lombard Street",
            "Alcatraz (11:00)",
            "Pier 39, Ghirardelli",
            "Palace of Fine Arts",
            "Golden Gate al atardecer",
        ],
        overnight: "Club Quarters Hotel Embarcadero, San Francisco", transportIcon: null,
    },
    {
        id: 3, date: "2026-10-19", title: "San Francisco → Mariposa",
        locationId: "mariposa",
        activities: [
            "Aeropuerto Internacional de San Francisco",
            "Walmart Supercenter",
            "Apple Park Visitor Center (Silicon Valley)",
            "Google Visitor Experience",
        ],
        overnight: "Yosemite Miners Inn Motel, Mariposa", transportIcon: "car",
    },
    {
        id: 4, date: "2026-10-20", title: "Yosemite",
        locationId: "yosemite",
        activities: [
            "Tunnel View",
            "Salto Bridalveil",
            "El Capitan Meadow",
            "Sentinel Bridge",
            "Yosemite Valley Welcome Center",
        ],
        overnight: "Ramada by Wyndham Fresno Northwest", transportIcon: "car",
    },
    {
        id: 5, date: "2026-10-21", title: "Sequoia",
        locationId: "sequoia",
        activities: ["General Sherman Tree", "The Congress Trail"],
        overnight: "Country Inn & Suites by Radisson, Bakersfield", transportIcon: "car",
    },
    {
        id: 6, date: "2026-10-22", title: "Death Valley",
        locationId: "deathvalley",
        activities: [
            "Ridgecrest",
            "Cuenca Badwater",
            "Zabriskie Point",
            "Artists Palette",
            "Furnace Creek",
        ],
        overnight: "Days Inn by Wyndham Las Vegas Airport", transportIcon: "car",
    },
    {
        id: 7, date: "2026-10-23", title: "Las Vegas",
        locationId: "vegas",
        activities: [
            "Battlefield Vegas",
            "Las Vegas North Premium Outlets",
            "Fountains of Bellagio",
            "Caesars Palace",
            "The Venetian",
            "Paris Las Vegas",
            "Fremont Street Experience",
        ],
        overnight: "Days Inn by Wyndham Las Vegas Airport", transportIcon: null,
    },
    {
        id: 8, date: "2026-10-24", title: "Las Vegas",
        locationId: "vegas",
        activities: ["Día libre — por planificar"],
        overnight: "Days Inn by Wyndham Las Vegas Airport", transportIcon: null,
    },
    {
        id: 9, date: "2026-10-25", title: "Zion National Park",
        locationId: "zion",
        activities: [
            "Parque nacional Zion",
            "The Zion-Mount Carmel Tunnel",
            "Checkerboard Mesa",
            "Kanab",
            "Curva de la Herradura (Horseshoe Bend)",
        ],
        overnight: "Best Western Plus at Lake Powell, Page", transportIcon: "car",
    },
    {
        id: 10, date: "2026-10-26", title: "Antelope Canyon + Monument Valley",
        locationId: "monument",
        activities: ["Cañón del Antílope", "Oljato-Monument Valley"],
        overnight: "The View Hotel, Monument Valley", transportIcon: "car",
    },
    {
        id: 11, date: "2026-10-27", title: "Gran Cañón + Williams",
        locationId: "williams",
        activities: [
            "Atalaya de Desert View",
            "Lipan Point",
            "Grandview Point",
            "Yavapai Viewpoint Rd",
            "Mather Point",
        ],
        overnight: "Days Inn by Wyndham Williams", transportIcon: "car",
    },
    {
        id: 12, date: "2026-10-28", title: "Ruta 66 — Día Completo",
        locationId: "route66",
        activities: [
            "Seligman",
            "Hackberry General Store",
            "Kingman",
            "Oatman",
        ],
        overnight: "Trend Hotel LAX", transportIcon: "car",
    },
    {
        id: 13, date: "2026-10-29", title: "Los Ángeles",
        locationId: "la",
        activities: ["Día libre — por planificar"],
        overnight: "Trend Hotel LAX", transportIcon: null,
    },
    {
        id: 14, date: "2026-10-30", title: "Los Ángeles",
        locationId: "la",
        activities: ["Día libre — por planificar"],
        overnight: "Trend Hotel LAX", transportIcon: null,
    },
    {
        id: 15, date: "2026-10-31", title: "Los Ángeles — Halloween",
        locationId: "la",
        activities: ["Día libre — por planificar"],
        overnight: "Trend Hotel LAX", transportIcon: null,
    },
    {
        id: 16, date: "2026-11-01", title: "Regreso",
        locationId: "la",
        activities: [
            "Check-out Trend Hotel LAX",
            "Vuelo Los Ángeles → Madrid · IB352, sale 18:15",
            "Conexión Madrid → Tenerife · IB1585 (2 nov, 18:45–20:40)",
        ],
        overnight: null, transportIcon: "flight",
    },
];

export const totalStates = 4; // California, Nevada, Utah, Arizona
export const totalParks = 5; // Yosemite, Sequoia, Death Valley, Zion, Gran Cañón

export function getWeekday(dateStr: string): string {
    return new Date(dateStr + "T12:00:00")
        .toLocaleDateString("es-ES", { weekday: "short" })
        .toUpperCase();
}
