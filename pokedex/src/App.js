import React, { useState, useEffect } from 'react';
import PokemonGrid from './PokemonGrid';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  // use the useEffect hook to fetch data when the component mounts.
  useEffect(() => {
    // Fetch a list of Pokemon from the PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // You can adjust the limit as needed
      .then((response) => response.json())
      .then((data) => setPokemonData(data.results))
      .catch((error) => console.error('Error fetching Pokemon data:', error));
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

