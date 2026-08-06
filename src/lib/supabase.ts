import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Se suscribe a los cambios de una tabla y refresca los datos. Se desuscribe
// sola al salir de la página para no dejar canales de Supabase abiertos.
export function subscribeToTable(table: string, onChange: () => void) {
    const channel = supabase
        .channel(`${table}_changes`)
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table },
            onChange,
        )
        .subscribe();

    window.addEventListener('beforeunload', () => channel.unsubscribe());
    return channel;
}