import React, { useState, useEffect } from 'react';
import PokemonGrid from './PokemonGrid';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    // Fetch a list of Pokemon from the PokeAPI
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')  // Limit the number of Pokemon for demonstration
      .then((response) => response.json())
      .then((data) => {
        // Map over the fetched data to get additional details for each Pokemon
        const pokemonDetailsPromises = data.results.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => response.json())
        );

        // Wait for all details to be fetched
        Promise.all(pokemonDetailsPromises)
          .then((detailedPokemonData) => {
            setPokemonData(detailedPokemonData);
          })
          .catch((error) => {
            console.error('Error fetching Pokemon details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching Pokemon list:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <PokemonGrid pokemonData={pokemonData} />
    </div>
  );
};

export default App;

