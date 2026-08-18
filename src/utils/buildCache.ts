import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const CACHE_PATH = join(process.cwd(), ".cache", "weather-cache.json");

type CacheEntry<T> = { value: T; fetchedAt: number };
type CacheStore = Record<string, CacheEntry<unknown>>;

function readStore(): CacheStore {
    if (!existsSync(CACHE_PATH)) return {}
    try {
        return JSON.parse(readFileSync(CACHE_PATH, "utf-8"));
    } catch {
        return {};
    }
}

function writeStore(store: CacheStore) {
    mkdirSync(dirname(CACHE_PATH), { recursive: true });
    writeFileSync(CACHE_PATH, JSON.stringify(store, null, 2));
}

// Devuelve el valor cacheado si existe y no ha superado maxAgeMs;
// si no, undefined (para distinguirlo de un null "no hay datos" real).
export function getCached<T>(key: string, maxAgeMs: number): T | undefined {
    const entry = readStore()[key];
    if (!entry) return undefined;
    if (Date.now() - entry.fetchedAt > maxAgeMs) return undefined;
    return entry.value as T;
}

export function setCached<T>(key: string, value: T) {
    const store = readStore();
    store[key] = { value, fetchedAt: Date.now() };
    writeStore(store);
}