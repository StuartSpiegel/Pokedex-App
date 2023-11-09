// PokemonDetail.js
import React from 'react';
import './PokemonDetail.css';
import { useParams } from 'react-router-dom';

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokemonDetail = ({ pokemonData }) => {
  const { id } = useParams();
  const selectedPokemon = pokemonData.find((pokemon) => pokemon.id.toString() === id);

  if (!selectedPokemon) {
    return <div>Select a Pokemon from the grid.</div>;
  }

  return (
    <div className="pokemon-detail">
      <h2>{capitalizeFirstLetter(selectedPokemon.name)}</h2>
      <h3>{selectedPokemon.id}</h3>
      <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
      <p>Type: {selectedPokemon.types.map((type) => capitalizeFirstLetter(type.type.name)).join(', ')}</p>
      <p>Height: {selectedPokemon.height} cm</p>
      <p>Weight: {selectedPokemon.weight} kg</p>
      <p>Abilities: {selectedPokemon.abilities.map((ability) => capitalizeFirstLetter(ability.ability.name)).join(', ')}</p>
    </div>
  );
};

export default PokemonDetail;
