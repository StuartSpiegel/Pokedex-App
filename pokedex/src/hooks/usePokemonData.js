import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemonList = async (limit = 100) => {
  const baseUrl = process.env.REACT_APP_POKEMON_API_URL || 'https://pokeapi.co/api/v2';

  try {
    const response = await axios.get(`${baseUrl}/pokemon?limit=${limit}`);
    const pokemonList = response.data.results;

    // Fetch detailed data for each Pokemon in parallel
    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon, index) => {
        try {
          const detailedResponse = await axios.get(pokemon.url);
          return {
            ...detailedResponse.data,
            index: index + 1, // Add index for original order
          };
        } catch (error) {
          console.warn(`Failed to fetch details for ${pokemon.name}:`, error);
          // Return minimal data if individual fetch fails
          return {
            id: index + 1,
            name: pokemon.name,
            sprites: { front_default: null },
            types: [],
            height: 0,
            weight: 0,
            abilities: [],
            index: index + 1,
            error: true,
          };
        }
      })
    );

    // Sort by original Pokedex order (by index/id)
    return detailedPokemonList.sort((a, b) => a.index - b.index);
  } catch (error) {
    throw new Error(`Failed to fetch Pokemon data: ${error.message}`);
  }
};

export const usePokemonData = limit => {
  return useQuery({
    queryKey: ['pokemon', 'list', limit],
    queryFn: () => fetchPokemonList(limit),
    staleTime: 30 * 60 * 1000, // 30 minutes - increased for large dataset
    gcTime: 60 * 60 * 1000, // 60 minutes - keep in cache longer
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook for fetching individual Pokemon data
const fetchPokemonById = async id => {
  const baseUrl = process.env.REACT_APP_POKEMON_API_URL || 'https://pokeapi.co/api/v2';

  try {
    const response = await axios.get(`${baseUrl}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`Pokémon with ID ${id} not found`);
    }
    throw new Error(`Failed to fetch Pokémon data: ${error.message}`);
  }
};

export const usePokemonById = id => {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemonById(id),
    enabled: !!id, // Only run if id is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
};

// Hook for prefetching Pokemon data
export const usePrefetchPokemon = () => {
  const queryClient = useQueryClient();

  return id => {
    queryClient.prefetchQuery({
      queryKey: ['pokemon', 'detail', id],
      queryFn: () => fetchPokemonById(id),
      staleTime: 10 * 60 * 1000,
    });
  };
};
