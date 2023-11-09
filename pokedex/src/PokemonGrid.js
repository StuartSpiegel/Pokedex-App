import React from 'react';
import './PokemonGrid.css';
import { Link } from 'react-router-dom';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokemonGrid = ({ pokemonData }) => {
  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  if (pokemonData.error) {
    return <div>Error fetching data: {pokemonData.error.message}</div>;
  }

  return (
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} className="pokemon-card">
          <div className="pokemon-card-content">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
            <h4>{pokemon.id}</h4>
            <h4>Type: {pokemon.types.map((type) => capitalizeFirstLetter(type.type.name)).join(', ')}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonGrid;
