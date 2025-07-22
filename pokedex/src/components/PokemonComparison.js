import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import './PokemonComparison.css';

const PokemonComparison = ({ selectedPokemon = [], onClose, onRemovePokemon }) => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (selectedPokemon.length === 0) return;

      setLoading(true);
      const data = {};

      for (const pokemon of selectedPokemon) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
          const details = await response.json();
          data[pokemon.id] = details;
        } catch (error) {
          console.error(`Failed to fetch ${pokemon.name}:`, error);
        }
      }

      setPokemonData(data);
      setLoading(false);
    };

    fetchPokemonDetails();
  }, [selectedPokemon]);

  const getStatColor = (stat, value) => {
    const maxValue = Math.max(
      ...selectedPokemon.map(
        p => pokemonData[p.id]?.stats?.find(s => s.stat.name === stat)?.base_stat || 0
      )
    );
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

    if (percentage >= 90) return '#e74c3c';
    if (percentage >= 70) return '#f39c12';
    if (percentage >= 50) return '#f1c40f';
    return '#3498db';
  };

  const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  const statDisplayNames = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    speed: 'Speed',
  };

  if (selectedPokemon.length === 0) {
    return (
      <div className="comparison-empty">
        <h3>Select Pokémon to Compare</h3>
        <p>
          Choose 2-4 Pokémon from the grid to see a detailed comparison of their stats, types, and
          abilities.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="comparison-loading">
        <LoadingSpinner />
        <p>Loading Pokémon details...</p>
      </div>
    );
  }

  return (
    <div className="pokemon-comparison">
      <div className="comparison-header">
        <h2>Pokémon Comparison</h2>
        <button onClick={onClose} className="close-btn" aria-label="Close comparison">
          ✕
        </button>
      </div>

      <div className="comparison-grid">
        {selectedPokemon.map(pokemon => {
          const details = pokemonData[pokemon.id];
          if (!details) return null;

          return (
            <div key={pokemon.id} className="comparison-card">
              <div className="comparison-card-header">
                <img
                  src={details.sprites?.front_default || pokemon.image}
                  alt={pokemon.name}
                  className="comparison-image"
                />
                <div className="comparison-info">
                  <h3>{pokemon.name}</h3>
                  <p className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</p>
                  <button
                    onClick={() => onRemovePokemon(pokemon.id)}
                    className="remove-btn"
                    aria-label={`Remove ${pokemon.name} from comparison`}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="comparison-details">
                <div className="detail-section">
                  <h4>Types</h4>
                  <div className="types-list">
                    {details.types?.map((type, index) => (
                      <span key={index} className={`type-badge ${type.type.name}`}>
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Physical</h4>
                  <div className="physical-stats">
                    <div className="stat-item">
                      <span>Height:</span>
                      <span>{(details.height / 10).toFixed(1)}m</span>
                    </div>
                    <div className="stat-item">
                      <span>Weight:</span>
                      <span>{(details.weight / 10).toFixed(1)}kg</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Abilities</h4>
                  <div className="abilities-list">
                    {details.abilities?.map((ability, index) => (
                      <span key={index} className="ability-badge">
                        {ability.ability.name.replace('-', ' ')}
                        {ability.is_hidden && ' (Hidden)'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Base Stats</h4>
                  <div className="stats-comparison">
                    {statNames.map(statName => {
                      const statValue =
                        details.stats?.find(s => s.stat.name === statName)?.base_stat || 0;
                      const color = getStatColor(statName, statValue);

                      return (
                        <div key={statName} className="stat-row">
                          <span className="stat-name">{statDisplayNames[statName]}</span>
                          <div className="stat-bar-container">
                            <div
                              className="stat-bar"
                              style={{
                                width: `${(statValue / 255) * 100}%`,
                                backgroundColor: color,
                              }}
                            />
                            <span className="stat-value">{statValue}</span>
                          </div>
                        </div>
                      );
                    })}
                    <div className="stat-total">
                      <strong>
                        Total: {details.stats?.reduce((sum, stat) => sum + stat.base_stat, 0) || 0}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedPokemon.length < 4 && (
        <div className="comparison-help">
          <p>
            You can compare up to 4 Pokémon. Select more from the grid to add them to this
            comparison.
          </p>
        </div>
      )}
    </div>
  );
};

export default PokemonComparison;
