import React, { useState, useEffect } from 'react';
import PokemonGrid from './PokemonGrid';

// helper function to map required data from the detailed poke API response.
// The types array is mapped to create a comma-separated string for displaying the Pokemon types.
const mapPokemonData = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((type) => type.type.name),
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
  };
};

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  // use the useEffect hook to fetch data when the component mounts.
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => response.json())
        );
  
        Promise.all(promises)
          .then((detailedData) => {
            setPokemonData(detailedData.map(mapPokemonData));
          })
          .catch((error) => {
            console.error('Error fetching Pokemon details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching Pokemon list:', error);
      });
  }, []);
  // passing pokemonData as a prop to the PokemonGrid component. 
  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokemonGrid pokemonData={pokemonData} />
    </div>
  );
};

export default App;

