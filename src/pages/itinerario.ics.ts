import type { APIRoute } from "astro";
import { buildTripIcs } from "../utils/ics";

export const GET: APIRoute = () => {
    return new Response(buildTripIcs(), {
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'attachment; filename="ruta66-2026.ics"',
        },
    });
};
