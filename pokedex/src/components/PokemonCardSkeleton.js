import React from 'react';
import './PokemonCardSkeleton.css';

const PokemonCardSkeleton = () => {
  return (
    <div className="pokemon-card-skeleton">
      <div className="skeleton-content">
        <div className="skeleton-image"></div>
        <div className="skeleton-text skeleton-name"></div>
        <div className="skeleton-text skeleton-id"></div>
        <div className="skeleton-text skeleton-type"></div>
      </div>
    </div>
  );
};

const PokemonGridSkeleton = ({ count = 20 }) => {
  return (
    <div className="pokemon-grid-skeleton">
      <div className="pokemon-grid">
        {Array.from({ length: count }, (_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export { PokemonCardSkeleton, PokemonGridSkeleton };
export default PokemonCardSkeleton;
