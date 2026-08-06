// Identidad ligera: no hay login real, solo un selector de nombre
// guardado en localStorage. Suficiente para saber "quién metió qué gasto"
// sin montar autenticación completa para un grupo de 4-5 personas.

export const DIVAS = ['Ruben', 'Stephie', 'Saray']; // ajusta a los nombres reales del grupo

export function getCurrentUser(): string | null {
    return localStorage.getItem('trip-user');
}

export function setCurrentUser(name: string) {
    localStorage.setItem('trip-user', name);
}