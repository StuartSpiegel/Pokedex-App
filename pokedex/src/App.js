import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your main CSS file
import PokemonGrid from './PokemonGrid';
import PokemonDetail from './PokemonDetail';
import axios from 'axios'; // Import axios

// helper function to map required data from the detailed poke API response.
// The types array is mapped to create a comma-separated string for displaying the Pokemon types.
// const mapPokemonData = (pokemon) => {
//   return {
//     id: pokemon.id,
//     name: pokemon.name,
//     types: pokemon.types.map((type) => type.type.name),
//     imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
//   };
// };

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  // use the useEffect hook to fetch data when the component mounts.
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = response.data.results;

        const detailedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailedResponse = await axios.get(pokemon.url);
            return detailedResponse.data;
          })
        );

        setPokemonData(detailedPokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  // passing pokemonData as a prop to the PokemonGrid component. 
  // const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Add a click handler to the PokemonGrid component
  // const handlePokemonClick = (pokemon) => {
  //   setSelectedPokemon(pokemon);
  // };

  // using the "Route" component to map specific paths to corresponding components. "Exact" prop ensures the '/' route only matches
  // when the path is exactly '/'
  // The <Routes> component is the top-level component for routing in react-router-dom. It should contain all the individual <Route> components that define your application's routes.
  return (
    <Router>
      <div className="App">
        <header className='App-header'>
        <h1 className='pokedex-title'>Pokedex</h1>
        <Routes>
          <Route path="/" element={<PokemonGrid pokemonData={pokemonData} />} />
          <Route path="/pokemon/:id" element={<PokemonDetail pokemonData={pokemonData} />} />
        </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;

