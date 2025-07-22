import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import './RandomPokemonGenerator.css';

const RandomPokemonGenerator = () => {
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const MAX_POKEMON_ID = 1010; // Current number of Pokemon in API

  const generateRandomPokemon = async () => {
    setLoading(true);
    setError(null);

    try {
      const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon #${randomId}`);
      }

      const pokemonData = await response.json();

      // Fetch species data for flavor text
      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`);
      let flavorText = null;

      if (speciesResponse.ok) {
        const speciesData = await speciesResponse.json();
        const englishFlavor = speciesData.flavor_text_entries?.find(
          entry => entry.language.name === 'en'
        );
        flavorText = englishFlavor?.flavor_text.replace(/\f/g, ' ');
      }

      const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default,
        shinySprite: pokemonData.sprites.front_shiny,
        types: pokemonData.types,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities,
        stats: pokemonData.stats,
        flavorText,
        timestamp: Date.now(),
      };

      setRandomPokemon(pokemon);

      // Add to history (keep last 5)
      setHistory(prev => [pokemon, ...prev.slice(0, 4)]);
    } catch (err) {
      console.error('Error generating random Pokemon:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTypeColor = typeName => {
    const colors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return colors[typeName] || '#68A090';
  };

  return (
    <div className="random-pokemon-generator">
      <div className="generator-header">
        <h2>🎲 Random Pokémon Generator</h2>
        <p>Discover new Pokémon with the click of a button!</p>
      </div>

      <div className="generator-controls">
        <button onClick={generateRandomPokemon} disabled={loading} className="generate-btn">
          {loading ? (
            <>
              <LoadingSpinner size="small" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span className="dice-icon">🎲</span>
              <span>Generate Random Pokémon</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="generator-error">
          <p>❌ {error}</p>
          <button onClick={generateRandomPokemon} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {randomPokemon && (
        <div className="random-pokemon-display">
          <div className="pokemon-showcase">
            <div className="pokemon-images">
              <div className="sprite-container main-sprite">
                <img
                  src={randomPokemon.sprite}
                  alt={randomPokemon.name}
                  className="pokemon-sprite"
                />
                <span className="sprite-label">Normal</span>
              </div>
              {randomPokemon.shinySprite && (
                <div className="sprite-container shiny-sprite">
                  <img
                    src={randomPokemon.shinySprite}
                    alt={`Shiny ${randomPokemon.name}`}
                    className="pokemon-sprite"
                  />
                  <span className="sprite-label">✨ Shiny</span>
                </div>
              )}
            </div>

            <div className="pokemon-info">
              <div className="pokemon-header">
                <h3>{capitalizeFirstLetter(randomPokemon.name)}</h3>
                <span className="pokemon-id">#{randomPokemon.id.toString().padStart(3, '0')}</span>
              </div>

              <div className="pokemon-types">
                {randomPokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="type-badge"
                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                  >
                    {capitalizeFirstLetter(type.type.name)}
                  </span>
                ))}
              </div>

              {randomPokemon.flavorText && (
                <div className="flavor-text">
                  <p>"{randomPokemon.flavorText}"</p>
                </div>
              )}

              <div className="pokemon-physical-stats">
                <div className="physical-stat">
                  <span className="stat-label">Height:</span>
                  <span className="stat-value">{(randomPokemon.height / 10).toFixed(1)}m</span>
                </div>
                <div className="physical-stat">
                  <span className="stat-label">Weight:</span>
                  <span className="stat-value">{(randomPokemon.weight / 10).toFixed(1)}kg</span>
                </div>
              </div>

              <div className="pokemon-abilities">
                <h4>Abilities:</h4>
                <div className="abilities-list">
                  {randomPokemon.abilities.map((ability, index) => (
                    <span key={index} className="ability-badge">
                      {capitalizeFirstLetter(ability.ability.name.replace('-', ' '))}
                      {ability.is_hidden && ' (Hidden)'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pokemon-actions">
                <Link to={`/pokemon/${randomPokemon.id}`} className="view-details-btn">
                  View Full Details
                </Link>
                <button onClick={generateRandomPokemon} className="generate-another-btn">
                  🎲 Generate Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="generation-history">
          <h3>Recent Generations</h3>
          <div className="history-grid">
            {history.map(pokemon => (
              <Link
                key={`${pokemon.id}-${pokemon.timestamp}`}
                to={`/pokemon/${pokemon.id}`}
                className="history-item"
              >
                <img src={pokemon.sprite} alt={pokemon.name} className="history-sprite" />
                <div className="history-info">
                  <span className="history-name">{capitalizeFirstLetter(pokemon.name)}</span>
                  <span className="history-id">#{pokemon.id.toString().padStart(3, '0')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomPokemonGenerator;
