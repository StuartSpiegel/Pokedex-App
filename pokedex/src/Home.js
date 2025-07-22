// Home.js
import React, { useState } from 'react';
import './Home.css';
import PokemonGrid from './PokemonGrid';
import SearchAndFilter from './components/SearchAndFilter';
import ThemeToggle from './components/ThemeToggle';
import PokemonComparison from './components/PokemonComparison';
import ComparisonPanel from './components/ComparisonPanel';
import RandomPokemonGenerator from './components/RandomPokemonGenerator';
import { usePokemonData } from './hooks/usePokemonData';
import { PokemonGridSkeleton } from './components/PokemonCardSkeleton';
import { useComparison } from './contexts/ComparisonContext';

function Home() {
  const limit = 1010; // Current total Pokemon count in PokeAPI
  const { data: pokemonData, isLoading, error, refetch } = usePokemonData(limit);
  const { selectedPokemon, showComparison, setShowComparison, removeFromComparison } =
    useComparison();

  // Filter and search state
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('id');

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="home-header">
          <h1>Pokédex</h1>
          <p>Gotta catch 'em all!</p>
        </div>
        <div className="app-loading">
          <PokemonGridSkeleton count={20} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="home-header">
          <h1>Pokédex</h1>
        </div>
        <div className="app-error">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
          <button onClick={() => refetch()} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <ThemeToggle position="fixed" size="medium" />
      <div className="home-header">
        <div className="pokemon-logo">
          <h1>🔴⚡ POKÉDEX ⚡🟡</h1>
          <div className="logo-pokeball">⚪</div>
        </div>
        <p>🌟 Gotta Catch 'Em All! 🌟</p>
        <div className="header-subtitle">
          <span>🔥 Discover</span>
          <span>⚔️ Compare</span>
          <span>📊 Analyze</span>
          <span>🎲 Explore</span>
        </div>
      </div>

      <SearchAndFilter
        pokemonData={pokemonData || []}
        onFilteredDataChange={setFilteredData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <RandomPokemonGenerator />

      <PokemonGrid pokemonData={filteredData} />

      {showComparison && selectedPokemon.length >= 2 && (
        <PokemonComparison
          selectedPokemon={selectedPokemon}
          onClose={() => setShowComparison(false)}
          onRemovePokemon={removeFromComparison}
        />
      )}

      <ComparisonPanel />
    </div>
  );
}

export default Home;
