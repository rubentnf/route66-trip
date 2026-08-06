import { days, type TripDay } from '../data/trip';

export function getEffectiveNow(): Date {
    const params = new URLSearchParams(window.location.search);
    const debugDate = params.get('debugDate');
    if (debugDate) {
        console.log(`🐛 Modo debug activo: simulando fecha ${debugDate}`);
        return new Date(debugDate + 'T12:00:00');
    }
    return new Date();
}

// Fuente única de verdad sobre "qué día del viaje es hoy" (real o simulado).
// La usan tanto TripStatus como TripMap, para que ninguno de los dos dependa
// de que le llegue un evento a tiempo desde el otro.
export function getTodayTrip(): TripDay | null {
    const now = getEffectiveNow();
    const todayStr = now.toISOString().split('T')[0];
    return days.find((d) => d.date === todayStr) ?? null;
}