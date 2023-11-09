// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Import your main CSS file
import PokemonDetail from './PokemonDetail';
import SearchApp from './SearchApp';
import Home from './Home';

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home pokemonData={pokemonData} />} />
        <Route path="/search" element={<SearchApp />} />
        <Route path="/pokemon/:id" element={<PokemonDetail pokemonData={pokemonData} />} />
      </Routes>
    </Router>
  );
}

export default App;