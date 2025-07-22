import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('pokemon-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.warn('Failed to load favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = pokemon => {
    setFavorites(prev => {
      // Avoid duplicates
      if (prev.find(fav => fav.id === pokemon.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprites?.front_default,
          types: pokemon.types,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const removeFromFavorites = pokemonId => {
    setFavorites(prev => prev.filter(fav => fav.id !== pokemonId));
  };

  const isFavorite = pokemonId => {
    return favorites.some(fav => fav.id === pokemonId);
  };

  const toggleFavorite = pokemon => {
    if (isFavorite(pokemon.id)) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const getFavoritesSorted = (sortBy = 'addedAt') => {
    return [...favorites].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'id':
          return a.id - b.id;
        case 'addedAt':
        default:
          return new Date(b.addedAt) - new Date(a.addedAt); // Most recent first
      }
    });
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    getFavoritesSorted,
    favoritesCount: favorites.length,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
