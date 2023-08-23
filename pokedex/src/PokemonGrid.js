import React from 'react';
import './PokemonGrid.css'; // Import your CSS file for styling

const PokemonGrid = ({ pokemonData }) => {
  return (
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="pokemon-card">
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <p>Type: {pokemon.type}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;
