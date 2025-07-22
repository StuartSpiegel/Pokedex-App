import React, { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const maxComparisons = 4;

  const addToComparison = pokemon => {
    setSelectedPokemon(prev => {
      // Don't add if already in comparison
      if (prev.find(p => p.id === pokemon.id)) {
        return prev;
      }

      // Don't add if at max capacity
      if (prev.length >= maxComparisons) {
        return prev;
      }

      const newSelection = [...prev, pokemon];

      // Auto-show comparison when we have 2 or more Pokemon
      if (newSelection.length >= 2) {
        setShowComparison(true);
      }

      return newSelection;
    });
  };

  const removeFromComparison = pokemonId => {
    setSelectedPokemon(prev => {
      const newSelection = prev.filter(p => p.id !== pokemonId);

      // Auto-hide comparison if we have less than 2 Pokemon
      if (newSelection.length < 2) {
        setShowComparison(false);
      }

      return newSelection;
    });
  };

  const clearComparison = () => {
    setSelectedPokemon([]);
    setShowComparison(false);
  };

  const toggleComparison = () => {
    setShowComparison(prev => !prev);
  };

  const isInComparison = pokemonId => {
    return selectedPokemon.some(p => p.id === pokemonId);
  };

  const canAddMore = () => {
    return selectedPokemon.length < maxComparisons;
  };

  const value = {
    selectedPokemon,
    showComparison,
    maxComparisons,
    addToComparison,
    removeFromComparison,
    clearComparison,
    toggleComparison,
    isInComparison,
    canAddMore,
    setShowComparison,
  };

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};
