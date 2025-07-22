import React from 'react';
import { useComparison } from '../contexts/ComparisonContext';
import './CompareButton.css';

const CompareButton = ({ pokemon }) => {
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison();
  const isSelected = isInComparison(pokemon.id);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if (isSelected) {
      removeFromComparison(pokemon.id);
    } else if (canAddMore()) {
      addToComparison(pokemon);
    }
  };

  const getButtonText = () => {
    if (isSelected) return 'Remove';
    if (!canAddMore()) return 'Max (4)';
    return 'Compare';
  };

  const getButtonClass = () => {
    let className = 'compare-button';
    if (isSelected) className += ' selected';
    if (!canAddMore() && !isSelected) className += ' disabled';
    return className;
  };

  return (
    <button
      onClick={handleClick}
      className={getButtonClass()}
      disabled={!canAddMore() && !isSelected}
      title={
        isSelected ? `Remove ${pokemon.name} from comparison` : `Add ${pokemon.name} to comparison`
      }
      aria-label={
        isSelected ? `Remove ${pokemon.name} from comparison` : `Add ${pokemon.name} to comparison`
      }
    >
      <span className="compare-icon">{isSelected ? '✓' : '⚖️'}</span>
      <span className="compare-text">{getButtonText()}</span>
    </button>
  );
};

export default CompareButton;
