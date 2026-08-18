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

export type TripPhase =
    | { status: "before"; daysLeft: number }
    | { status: "during"; today: TripDay }
    | { status: "after" };

// Punto único de verdad sobre "en qué fase del viaje estamos" -
// lo usan tanto TripStatus como TripHero para no divergir entre sí.
export function getTripPhase(): TripPhase {
    const now = getEffectiveNow();
    const tripStart = new Date(days[0].date + "T00:00:00");
    const tripEnd = new Date(days[days.length - 1].date + "T23:59:59");

    if (now < tripStart) {
        const diffMs = tripStart.getTime() - now.getTime();
        const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return { status: "before", daysLeft };
    }

    if (now < tripEnd) {
        const today = getTodayTrip();
        if (today) return { status: "during", today };
    }

    return { status: "after" };
}

// Hace scroll a la card del día actual, una sola vez por sesión
// (salvo en modo ?debugDate, que siempre desplaza para poder depurar).
export function scrollToToday(todayTrip: TripDay) {
    const params = new URLSearchParams(window.location.search);
    const isDebug = params.has("debugDate");
    const alreadyScrolled = sessionStorage.getItem("trip-auto-scrolled");
    if (alreadyScrolled && !isDebug) return;

    const el = document.getElementById(`day-${todayTrip.id}`);
    if (!el) return; // no hay timeline en esta página, no consumimos el flag

    el.scrollIntoView({ behavior: isDebug ? "auto" : "smooth", block: "start" });
    if (!isDebug) sessionStorage.setItem("trip-auto-scrolled", "true");
}

// Motor compartido del widget de countdown: dispara render() al montar y cada
// hora, y hace scroll al día actual si estamos "during". Devuelve el cleanup
// a llamar en astro:before-swap
export function mountPhaseWidget(render: (phase: TripPhase) => void): () => void {
    function tick() {
        const phase = getTripPhase();
        render(phase);
        if (phase.status === "during") scrollToToday(phase.today);
    }
    tick();
    const intervalId = setInterval(tick, 60 * 60 * 1000);
    return () => clearInterval(intervalId);
}