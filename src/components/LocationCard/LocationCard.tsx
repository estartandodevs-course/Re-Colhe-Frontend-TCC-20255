import { useState, useEffect } from 'react';
import type { Location } from '../../mocks/locations';
import {
  isFavorite,
  toggleFavorite,
} from '../../services/favorites';

type LocationCardProps = {
  location: Location;
  className?: string;
};

function LocationCard({ location, className }: LocationCardProps) {
  const [favorite, setFavorite] = useState(false);

  // Verifica se já está favoritado ao montar
  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(location.id); // agora aceita number
      setFavorite(fav);
    };
    checkFavorite();
  }, [location.id]);

  const handleFavorite = async () => {
    await toggleFavorite(location); // passa o objeto inteiro
    const fav = await isFavorite(location.id);
    setFavorite(fav);
  };

  return (
    <div className={className}>
      <div>
        <h3 className="location-title">{location.name}</h3>
        <p className="location-info">📍 {location.address}</p>
        <p className="location-info">🕒 {location.hours}</p>
        <p className="location-info">📞 {location.phone}</p>
      </div>
      <button
        className={`favorite-button ${favorite ? 'active' : ''}`}
        onClick={handleFavorite}
        title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {favorite ? '💚' : '❤️'}
      </button>
    </div>
  );
}

export default LocationCard;
