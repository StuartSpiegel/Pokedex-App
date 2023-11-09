// Home.js
import React from 'react';
import './Home.css'; // Import your main CSS file
import SearchApp from './SearchApp';
import PokemonGrid from './PokemonGrid';

function Home() {
  return (
    <div className="home-container">
      <SearchApp />
      <PokemonGrid />
    </div>
  );
}

export default Home;
