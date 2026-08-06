export interface DivaProfile {
    name: string;
    avatar: string;
    tagline: string;
}

export const DIVAS_PROFILES: DivaProfile[] = [
    { name: 'Ruben', avatar: '/avatars/ruben.png', tagline: 'El pistolero más rápido con el mapa' },
    { name: 'Stephie', avatar: '/avatars/stephie.jpeg', tagline: 'La reina indiscutible del Strip' },
    { name: 'Saray', avatar: '/avatars/saray.jpeg', tagline: 'La forajida que nunca pierde el rumbo' },
];

export const DIVAS = DIVAS_PROFILES.map((d) => d.name);

export function getCurrentUser(): string | null {
    return localStorage.getItem('trip-user');
}

export function setCurrentUser(name: string) {
    localStorage.setItem('trip-user', name);
}

export function avatarOf(name: string): string {
    return DIVAS_PROFILES.find((p) => p.name === name)?.avatar ?? '';
}