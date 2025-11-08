import type { Location } from '../mocks/locations';

const STORAGE_KEY = 'favoriteLocations';

function read(): Location[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(list: Location[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export async function getFavorites(): Promise<Location[]> {
  return read();
}

export async function isFavorite(id: number): Promise<boolean> {
  return read().some((loc) => loc.id === id);
}

export async function addFavorite(location: Location): Promise<void> {
  const list = read();
  if (!list.some((l) => l.id === location.id)) {
    write([...list, location]);
  }
}

export async function removeFavorite(id: number): Promise<void> {
  const list = read().filter((l) => l.id !== id);
  write(list);
}

export async function toggleFavorite(location: Location): Promise<void> {
  if (await isFavorite(location.id)) {
    await removeFavorite(location.id);
  } else {
    await addFavorite(location);
  }
}
