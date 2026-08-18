export interface DivaProfile {
    name: string;
    avatar: string;
    tagline: string;
}

export const DIVAS_PROFILES: DivaProfile[] = [
    { name: 'Ruben', avatar: '/avatars/ruben.webp', tagline: 'El pistolero más rápido con el mapa' },
    { name: 'Stephie', avatar: '/avatars/stephie.webp', tagline: 'La reina indiscutible del Strip' },
    { name: 'Saray', avatar: '/avatars/saray.webp', tagline: 'La forajida que nunca pierde el rumbo' },
];

export function getCurrentUser(): string | null {
    return localStorage.getItem('trip-user');
}

export function setCurrentUser(name: string) {
    localStorage.setItem('trip-user', name);
}

