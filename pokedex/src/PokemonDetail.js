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
      <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
      <p>Type: {selectedPokemon.types.map((type) => type.type.name).join(', ')}</p>
      <p>Height: {selectedPokemon.height} cm</p>
      <p>Weight: {selectedPokemon.weight} kg</p>
      <p>Abilities: {selectedPokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
      {/* Display other attributes */}
    </div>
  );
};

export default PokemonDetail;