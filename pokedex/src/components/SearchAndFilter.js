import React, { useState, useMemo } from 'react';
import './SearchAndFilter.css';

const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

const SORT_OPTIONS = [
  { value: 'id', label: 'Pokédex Number' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'type', label: 'Primary Type' },
  { value: 'height', label: 'Height' },
  { value: 'weight', label: 'Weight' },
];

const SearchAndFilter = ({
  pokemonData,
  onFilteredDataChange,
  searchTerm,
  onSearchChange,
  selectedTypes,
  onTypesChange,
  sortBy,
  onSortChange,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');

  const filteredAndSortedData = useMemo(() => {
    if (!pokemonData || pokemonData.length === 0) return [];

    let filtered = pokemonData.filter(pokemon => {
      // Text search
      const matchesSearch =
        !searchTerm ||
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm);

      // Type filter
      const matchesType =
        selectedTypes.length === 0 ||
        pokemon.types.some(type => selectedTypes.includes(type.type.name));

      // Height filter
      const pokemonHeight = pokemon.height / 10; // Convert to meters
      const matchesHeight =
        (!minHeight || pokemonHeight >= parseFloat(minHeight)) &&
        (!maxHeight || pokemonHeight <= parseFloat(maxHeight));

      // Weight filter
      const pokemonWeight = pokemon.weight / 10; // Convert to kg
      const matchesWeight =
        (!minWeight || pokemonWeight >= parseFloat(minWeight)) &&
        (!maxWeight || pokemonWeight <= parseFloat(maxWeight));

      return matchesSearch && matchesType && matchesHeight && matchesWeight;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'type':
          return a.types[0]?.type.name.localeCompare(b.types[0]?.type.name || '');
        case 'height':
          return a.height - b.height;
        case 'weight':
          return a.weight - b.weight;
        case 'id':
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [pokemonData, searchTerm, selectedTypes, sortBy, minHeight, maxHeight, minWeight, maxWeight]);

  // Update parent component when filtered data changes
  React.useEffect(() => {
    onFilteredDataChange(filteredAndSortedData);
  }, [filteredAndSortedData, onFilteredDataChange]);

  const handleTypeToggle = type => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypesChange(newTypes);
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onTypesChange([]);
    onSortChange('id');
    setMinHeight('');
    setMaxHeight('');
    setMinWeight('');
    setMaxWeight('');
  };

  const activeFiltersCount = [
    searchTerm,
    selectedTypes.length > 0,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    sortBy !== 'id',
  ].filter(Boolean).length;

  return (
    <div className="search-and-filter">
      <div className="search-header">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="🔍 Search Pokémon by name or number... (e.g. Pikachu, 25)"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="sort-select"
          >
            <option value="">Sort by...</option>
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`filter-toggle-btn ${showAdvancedFilters ? 'active' : ''}`}
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          {activeFiltersCount > 0 && (
            <button onClick={clearAllFilters} className="clear-filters-btn">
              Clear All
            </button>
          )}
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="filter-section">
            <h4>Types</h4>
            <div className="type-filters">
              {POKEMON_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeToggle(type)}
                  className={`type-filter-btn type-${type} ${
                    selectedTypes.includes(type) ? 'selected' : ''
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Size Ranges</h4>
            <div className="range-filters">
              <div className="range-group">
                <label>Height (m)</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minHeight}
                    onChange={e => setMinHeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxHeight}
                    onChange={e => setMaxHeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="range-group">
                <label>Weight (kg)</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minWeight}
                    onChange={e => setMinWeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxWeight}
                    onChange={e => setMaxWeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="results-summary">
        Showing {filteredAndSortedData.length} of {pokemonData?.length || 0} Pokémon
        {activeFiltersCount > 0 && (
          <span className="filter-indicator">
            ({activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active)
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
