import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your main CSS file
import PokemonGrid from './PokemonGrid';
import PokemonDetail from './PokemonDetail';

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
        <h1>Pokedex</h1>
        <Routes> {/* Wrap your routes inside the <Routes> component */}
          <Route path="/" element={<PokemonGrid pokemonData={pokemonData} />} />
          <Route path="/pokemon/:id" element={<PokemonDetail pokemonData={pokemonData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

