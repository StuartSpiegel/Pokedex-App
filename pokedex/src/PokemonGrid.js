import React from 'react';
import './PokemonGrid.css';
import { Link } from 'react-router-dom';
import usePagination from './hooks/usePagination';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import FavoriteButton from './components/FavoriteButton';
import CompareButton from './components/CompareButton';

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokemonGrid = ({ pokemonData }) => {
  const itemsPerPage = 100; // Show 100 Pokemon per page in rows of 10

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToNextPage,
    goToPrevPage,
    getPageNumbers,
    hasNextPage,
    hasPrevPage,
    totalItems,
    itemsPerPage: actualItemsPerPage,
  } = usePagination(pokemonData, itemsPerPage);

  if (!pokemonData || pokemonData.length === 0) {
    return <LoadingSpinner message="Loading Pokémon..." />;
  }

  if (pokemonData.error) {
    return (
      <div className="pokemon-grid-error">Error fetching data: {pokemonData.error.message}</div>
    );
  }

  return (
    <div className="pokemon-grid-container">
      <div className="pokemon-grid">
        {paginatedData.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card-wrapper">
            <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
              <div className="pokemon-card-content">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
                <h4>#{pokemon.id}</h4>
                <h4>
                  Type:{' '}
                  {pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}
                </h4>
              </div>
            </Link>
            <div className="pokemon-card-actions">
              <FavoriteButton pokemon={pokemon} size="medium" />
              <CompareButton
                pokemon={{
                  id: pokemon.id,
                  name: pokemon.name,
                  image: pokemon.sprites.front_default,
                  types: pokemon.types,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onNextPage={goToNextPage}
        onPrevPage={goToPrevPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        getPageNumbers={getPageNumbers}
        totalItems={totalItems}
        itemsPerPage={actualItemsPerPage}
      />
    </div>
  );
};

export default PokemonGrid;
