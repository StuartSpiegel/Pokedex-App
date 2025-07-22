import React from 'react';
import { useComparison } from '../contexts/ComparisonContext';
import './ComparisonPanel.css';

const ComparisonPanel = () => {
  const {
    selectedPokemon,
    showComparison,
    toggleComparison,
    clearComparison,
    removeFromComparison,
  } = useComparison();

  if (selectedPokemon.length === 0) return null;

  return (
    <div className={`comparison-panel ${showComparison ? 'expanded' : 'collapsed'}`}>
      <div className="panel-header" onClick={toggleComparison}>
        <div className="panel-title">
          <span className="comparison-icon">⚖️</span>
          <span>Compare ({selectedPokemon.length})</span>
        </div>
        <div className="panel-actions">
          <button
            onClick={e => {
              e.stopPropagation();
              clearComparison();
            }}
            className="clear-all-btn"
            title="Clear all comparisons"
          >
            Clear All
          </button>
          <button
            className="toggle-btn"
            title={showComparison ? 'Hide comparison' : 'Show comparison'}
          >
            {showComparison ? '▼' : '▲'}
          </button>
        </div>
      </div>

      <div className="panel-content">
        <div className="selected-pokemon-list">
          {selectedPokemon.map(pokemon => (
            <div key={pokemon.id} className="selected-pokemon-item">
              <img src={pokemon.image} alt={pokemon.name} className="mini-pokemon-image" />
              <div className="mini-pokemon-info">
                <span className="mini-pokemon-name">{pokemon.name}</span>
                <span className="mini-pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
              </div>
              <button
                onClick={() => removeFromComparison(pokemon.id)}
                className="mini-remove-btn"
                title={`Remove ${pokemon.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {selectedPokemon.length >= 2 && (
          <div className="comparison-help-text">
            <p>Click to {showComparison ? 'hide' : 'show'} detailed comparison</p>
            {selectedPokemon.length < 4 && (
              <p className="add-more">Add up to {4 - selectedPokemon.length} more Pokémon</p>
            )}
          </div>
        )}

        {selectedPokemon.length === 1 && (
          <div className="comparison-help-text">
            <p>Select one more Pokémon to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPanel;
