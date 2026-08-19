import { days, locations } from "../data/trip";

function escapeIcsText(text: string): string {
    return text
        .replace(/\\/g, "\\\\")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;")
        .replace(/\n/g, "\\n");
}

function toIscDate(isoDate: string): string {
    return isoDate.replace(/-/g, "");
}

function nextDay(isoDate: string): string {
    const d = new Date(isoDate + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + 1);
    return d.toISOString().split("T")[0];
}

// Un VEVENT de día completo por cada día del viaje. DTEND es exclusivo en el 
// estándar iCal para eventos de día completo, por eso es "el día siguiente"
export function buildTripIcs(): string {
    const locById = new Map(locations.map((l) => [l.id, l]));
    const dtstamp =
        new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Divas en Ruta//Itinerario//ES",
        "CALSCALE:GREGORIAN",
    ];

    for (const day of days) {
        const location = locById.get(day.locationId);
        lines.push(
            "BEGIN:VEVENT",
            `UID:day-${day.id}@divasenruta`,
            `DTSTAMP:${dtstamp}`,
            `DTSTART;VALUE=DATE:${toIscDate(day.date)}`,
            `DTEND;VALUE=DATE:${toIscDate(nextDay(day.date))}`,
            `SUMMARY:${escapeIcsText(`Día ${day.id}: ${day.title} `)}`,
            `DESCRIPTION:${escapeIcsText(day.activities.join("\n"))}`,
        );
        if (location) lines.push(`LOCATION:${escapeIcsText(location.name)}`);
        lines.push("END:VEVENT");
    }

    lines.push("END:VCALENDAR");
    return lines.join("\r\n");
}