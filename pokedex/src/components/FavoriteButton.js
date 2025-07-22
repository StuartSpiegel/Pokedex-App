import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import './FavoriteButton.css';

const FavoriteButton = ({ pokemon, size = 'medium', showLabel = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleClick = e => {
    e.preventDefault(); // Prevent navigation when used inside links
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  const favorite = isFavorite(pokemon.id);

  return (
    <button
      onClick={handleClick}
      className={`favorite-btn ${size} ${favorite ? 'favorited' : ''}`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="favorite-icon">{favorite ? '❤️' : '🤍'}</span>
      {showLabel && (
        <span className="favorite-label">{favorite ? 'Favorited' : 'Add to Favorites'}</span>
      )}
    </button>
  );
};

export default FavoriteButton;
