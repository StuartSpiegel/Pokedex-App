// PokemonDetail.js
import React from 'react';
import './PokemonDetail.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePokemonById, usePokemonData } from './hooks/usePokemonData';
import LoadingSpinner from './components/LoadingSpinner';
import EvolutionChain from './components/EvolutionChain';
import StatsChart from './components/StatsChart';

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch individual Pokemon data
  const {
    data: selectedPokemon,
    isLoading: pokemonLoading,
    error: pokemonError,
  } = usePokemonById(id);

  // Fetch full Pokemon list for navigation
  const limit = parseInt(process.env.REACT_APP_DEFAULT_POKEMON_LIMIT) || 100;
  const { data: pokemonData } = usePokemonData(limit);

  // Loading state for Pokemon detail
  if (pokemonLoading) {
    return (
      <div className="pokemon-detail-loading">
        <LoadingSpinner size="large" message={`Loading Pokémon #${id}...`} />
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Error state for Pokemon detail
  if (pokemonError) {
    return (
      <div className="pokemon-detail-error">
        <h2>Pokémon not found</h2>
        <p>{pokemonError.message}</p>
        <div className="navigation-buttons">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Go Back
          </button>
          <Link to="/" className="home-button">
            🏠 Home
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedPokemon) {
    return (
      <div className="pokemon-detail-error">
        <h2>Pokémon not found</h2>
        <p>The Pokémon with ID {id} was not found.</p>
        <div className="navigation-buttons">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Go Back
          </button>
          <Link to="/" className="home-button">
            🏠 Home
          </Link>
        </div>
      </div>
    );
  }

  // Find previous and next Pokemon for navigation
  const currentIndex = pokemonData?.findIndex(pokemon => pokemon.id.toString() === id) ?? -1;
  const previousPokemon = currentIndex > 0 && pokemonData ? pokemonData[currentIndex - 1] : null;
  const nextPokemon =
    currentIndex < pokemonData?.length - 1 && pokemonData ? pokemonData[currentIndex + 1] : null;

  return (
    <div className="pokemon-detail">
      <div className="navigation-bar">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <Link to="/" className="home-button">
          🏠 Home
        </Link>
      </div>

      <div className="pokemon-navigation">
        {previousPokemon && (
          <Link
            to={`/pokemon/${previousPokemon.id}`}
            className="nav-pokemon prev-pokemon"
            title={capitalizeFirstLetter(previousPokemon.name)}
          >
            ← #{previousPokemon.id}
          </Link>
        )}

        <span className="current-pokemon-indicator">
          #{selectedPokemon.id} of {pokemonData?.length || '...'}
        </span>

        {nextPokemon && (
          <Link
            to={`/pokemon/${nextPokemon.id}`}
            className="nav-pokemon next-pokemon"
            title={capitalizeFirstLetter(nextPokemon.name)}
          >
            #{nextPokemon.id} →
          </Link>
        )}
      </div>

      <div className="pokemon-detail-content">
        <h2>{capitalizeFirstLetter(selectedPokemon.name)}</h2>
        <h3>#{selectedPokemon.id}</h3>
        <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
        <div className="pokemon-info">
          <p>
            <strong>Type:</strong>{' '}
            {selectedPokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}
          </p>
          <p>
            <strong>Height:</strong> {selectedPokemon.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {selectedPokemon.weight / 10} kg
          </p>
          <p>
            <strong>Abilities:</strong>{' '}
            {selectedPokemon.abilities
              .map(ability => capitalizeFirstLetter(ability.ability.name))
              .join(', ')}
          </p>
        </div>
      </div>

      <StatsChart pokemon={selectedPokemon} />
      <EvolutionChain pokemonId={selectedPokemon.id} />
    </div>
  );
};

export default PokemonDetail;
