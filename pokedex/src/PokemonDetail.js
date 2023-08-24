import React from 'react';
import './PokemonDetail.css';
import { useParams } from 'react-router-dom';

// use the 'id' parameter from the URL using the "useParams" hook from 'react-router-dom'
const PokemonDetail = ({ pokemonData }) => {
  const { id } = useParams();
  const selectedPokemon = pokemonData.find((pokemon) => pokemon.id.toString() === id);

  if (!selectedPokemon) {
    return <div>Select a Pokemon from the grid.</div>;
  }

  return (
    <div className="pokemon-detail">
      <h2>{selectedPokemon.name}</h2>
      <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} />
      <p>Type: {selectedPokemon.types.join(', ')}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PokemonDetail;