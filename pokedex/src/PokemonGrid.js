import React from 'react';
import './PokemonGrid.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const PokemonGrid = ({ pokemonData }) => {
  return (
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} className="pokemon-card">
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          {/* You can add more information or styling here */}
        </Link>
      ))}
    </div>
  );
};

export default PokemonGrid;