import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import './EvolutionChain.css';

const EvolutionChain = ({ pokemonId }) => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!pokemonId) return;

      setLoading(true);
      setError(null);

      try {
        // First, get the pokemon species to get the evolution chain URL
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        if (!speciesResponse.ok) throw new Error('Failed to fetch species');
        const speciesData = await speciesResponse.json();

        // Get the evolution chain
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        if (!evolutionResponse.ok) throw new Error('Failed to fetch evolution chain');
        const evolutionData = await evolutionResponse.json();

        // Process the evolution chain
        const processedChain = await processEvolutionChain(evolutionData.chain);
        setEvolutionChain(processedChain);
      } catch (err) {
        console.error('Error fetching evolution chain:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonId]);

  const processEvolutionChain = async chain => {
    const evolutionSteps = [];

    const processStage = async stage => {
      // Extract pokemon ID from the species URL
      const speciesId = stage.species.url.split('/').slice(-2, -1)[0];

      // Fetch pokemon data for sprite
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesId}`);
        const pokemonData = await pokemonResponse.json();

        const stageData = {
          id: parseInt(speciesId),
          name: stage.species.name,
          sprite: pokemonData.sprites?.front_default || null,
          evolutionDetails: stage.evolution_details || [],
        };

        evolutionSteps.push(stageData);

        // Process evolves_to recursively
        if (stage.evolves_to && stage.evolves_to.length > 0) {
          for (const evolution of stage.evolves_to) {
            await processStage(evolution);
          }
        }
      } catch (error) {
        console.error(`Failed to fetch data for ${stage.species.name}:`, error);
        // Add stage without sprite if pokemon data fails
        evolutionSteps.push({
          id: parseInt(speciesId),
          name: stage.species.name,
          sprite: null,
          evolutionDetails: stage.evolution_details || [],
        });
      }
    };

    await processStage(chain);
    return evolutionSteps;
  };

  const getEvolutionTriggerText = details => {
    if (!details || details.length === 0) return null;

    const detail = details[0]; // Use the first evolution detail
    let text = '';

    switch (detail.trigger?.name) {
      case 'level-up':
        if (detail.min_level) {
          text = `Level ${detail.min_level}`;
        } else {
          text = 'Level up';
        }

        // Add additional conditions
        if (detail.time_of_day) {
          text += ` (${detail.time_of_day})`;
        }
        if (detail.location) {
          text += ` at ${detail.location.name}`;
        }
        if (detail.held_item) {
          text += ` holding ${detail.held_item.name}`;
        }
        if (detail.known_move) {
          text += ` knowing ${detail.known_move.name}`;
        }
        break;

      case 'use-item':
        if (detail.item) {
          text = `Use ${detail.item.name}`;
        }
        break;

      case 'trade':
        text = 'Trade';
        if (detail.held_item) {
          text += ` holding ${detail.held_item.name}`;
        }
        if (detail.trade_species) {
          text += ` for ${detail.trade_species.name}`;
        }
        break;

      case 'shed':
        text = 'Evolves from Nincada';
        break;

      default:
        text = detail.trigger?.name || 'Unknown';
    }

    return text;
  };

  if (loading) {
    return (
      <div className="evolution-chain">
        <h3>Evolution Chain</h3>
        <div className="evolution-loading">
          <LoadingSpinner />
          <p>Loading evolution chain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="evolution-chain">
        <h3>Evolution Chain</h3>
        <div className="evolution-error">
          <p>Failed to load evolution chain: {error}</p>
        </div>
      </div>
    );
  }

  if (!evolutionChain || evolutionChain.length <= 1) {
    return (
      <div className="evolution-chain">
        <h3>Evolution Chain</h3>
        <div className="no-evolution">
          <p>This Pokémon doesn't evolve.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="evolution-chain">
      <h3>Evolution Chain</h3>
      <div className="evolution-stages">
        {evolutionChain.map((pokemon, index) => (
          <React.Fragment key={pokemon.id}>
            <div className="evolution-stage">
              <Link to={`/pokemon/${pokemon.id}`} className="evolution-pokemon">
                <div className="evolution-sprite-container">
                  {pokemon.sprite ? (
                    <img src={pokemon.sprite} alt={pokemon.name} className="evolution-sprite" />
                  ) : (
                    <div className="evolution-sprite-placeholder">
                      <span>?</span>
                    </div>
                  )}
                </div>
                <div className="evolution-info">
                  <h4>{pokemon.name}</h4>
                  <p>#{pokemon.id.toString().padStart(3, '0')}</p>
                </div>
              </Link>
            </div>

            {index < evolutionChain.length - 1 && (
              <div className="evolution-arrow">
                <div className="arrow-container">
                  <div className="arrow">→</div>
                  <div className="evolution-requirement">
                    {getEvolutionTriggerText(evolutionChain[index + 1].evolutionDetails) ||
                      'Evolution'}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
