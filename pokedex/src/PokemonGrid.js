import React from 'react';
import './PokemonGrid.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

//helper function to capitalize the first letter of each pokemon name
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokemonGrid = ({ pokemonData }) => {
  return (
    <div className="pokemon-grid">
      {pokemonData.map((pokemon) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} className="pokemon-card">
          <div className="pokemon-card-content">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{capitalizeFirstLetter(pokemon.name)}</h3> 
            <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonGrid;