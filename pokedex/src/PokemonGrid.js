import React from 'react';
import './PokemonGrid.css'; //import my CSS style sheet

const PokemonGrid = ({ pokemonData }) => {
  return (
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <div key={pokemon.name} className="pokemon-card">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
            alt={pokemon.name}
          />
          <h3>{pokemon.name}</h3>
          
          <p>{pokemon.types}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;
