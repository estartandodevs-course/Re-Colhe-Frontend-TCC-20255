// src/services/favorites.api.ts
import axios from 'axios';
import type { Location } from '../mocks/locations';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export async function getFavorites(): Promise<Location[]> {
  const res = await api.get('/favorites');
  return res.data;
}

export async function isFavorite(id: number): Promise<boolean> {
  const res = await api.get(`/favorites/${id}`);
  return res.data.isFavorite;
}

export async function addFavorite(location: Location): Promise<void> {
  await api.post('/favorites', location);
}

export async function removeFavorite(id: number): Promise<void> {
  await api.delete(`/favorites/${id}`);
}

export async function toggleFavorite(location: Location): Promise<void> {
  const fav = await isFavorite(location.id);
  if (fav) {
    await removeFavorite(location.id);
  } else {
    await addFavorite(location);
  }
}
