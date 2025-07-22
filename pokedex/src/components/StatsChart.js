import React from 'react';
import './StatsChart.css';

const StatsChart = ({ pokemon, showComparison = false }) => {
  const statNames = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    speed: 'Speed',
  };

  const getStatColor = (statName, value) => {
    const maxStatValue = 255; // Max possible stat value in Pokemon
    const percentage = (value / maxStatValue) * 100;

    // Color based on stat type
    switch (statName) {
      case 'hp':
        return '#e74c3c';
      case 'attack':
        return '#e67e22';
      case 'defense':
        return '#f39c12';
      case 'special-attack':
        return '#9b59b6';
      case 'special-defense':
        return '#3498db';
      case 'speed':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  const calculateStatTotal = stats => {
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
  };

  const getStatRating = value => {
    if (value >= 150) return 'Excellent';
    if (value >= 120) return 'Very Good';
    if (value >= 90) return 'Good';
    if (value >= 60) return 'Average';
    if (value >= 30) return 'Below Average';
    return 'Poor';
  };

  if (!pokemon || !pokemon.stats) {
    return null;
  }

  const totalStats = calculateStatTotal(pokemon.stats);
  const averageStat = Math.round(totalStats / pokemon.stats.length);

  return (
    <div className="stats-chart">
      <div className="stats-header">
        <h3>Base Stats</h3>
        <div className="stats-summary">
          <span className="total-stats">Total: {totalStats}</span>
          <span className="average-stat">Average: {averageStat}</span>
        </div>
      </div>

      <div className="stats-visualization">
        <div className="stats-bars">
          {pokemon.stats.map(stat => {
            const statName = stat.stat.name;
            const statValue = stat.base_stat;
            const percentage = Math.min((statValue / 255) * 100, 100);
            const color = getStatColor(statName, statValue);

            return (
              <div key={statName} className="stat-row">
                <div className="stat-info">
                  <span className="stat-name">{statNames[statName] || statName}</span>
                  <span className="stat-value">{statValue}</span>
                  <span className="stat-rating">{getStatRating(statValue)}</span>
                </div>
                <div
                  style={{
                    height: '30px',
                    background: '#e9ecef',
                    borderRadius: '15px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #ccc',
                    display: 'block',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(percentage, 5)}%`,
                      height: '100%',
                      backgroundColor: color,
                      borderRadius: '15px',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      display: 'block',
                      boxShadow: `inset 0 0 10px ${color}80`,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      color: '#333',
                      zIndex: 2,
                    }}
                  >
                    {Math.round(percentage)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="stats-radar">
          <div className="radar-chart">
            <svg viewBox="0 0 200 200" className="radar-svg">
              {/* Radar grid */}
              <g className="radar-grid">
                {[1, 2, 3, 4, 5].map(level => (
                  <polygon
                    key={level}
                    points="100,20 173,60 173,140 100,180 27,140 27,60"
                    fill="none"
                    stroke="var(--border-gray)"
                    strokeWidth="1"
                    opacity={0.3}
                    transform={`scale(${level * 0.2}) translate(${100 - level * 20}, ${100 - level * 20})`}
                  />
                ))}

                {/* Radar lines */}
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <line
                    key={angle}
                    x1="100"
                    y1="100"
                    x2={100 + 80 * Math.cos(((angle - 90) * Math.PI) / 180)}
                    y2={100 + 80 * Math.sin(((angle - 90) * Math.PI) / 180)}
                    stroke="var(--border-gray)"
                    strokeWidth="1"
                    opacity={0.3}
                  />
                ))}
              </g>

              {/* Stats polygon */}
              <polygon
                points={pokemon.stats
                  .map((stat, index) => {
                    const angle = ((index * 60 - 90) * Math.PI) / 180;
                    const distance = (stat.base_stat / 255) * 80;
                    const x = 100 + distance * Math.cos(angle);
                    const y = 100 + distance * Math.sin(angle);
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill={`${getStatColor('hp', 0)}40`}
                stroke={getStatColor('hp', 0)}
                strokeWidth="2"
              />

              {/* Stat points */}
              {pokemon.stats.map((stat, index) => {
                const angle = ((index * 60 - 90) * Math.PI) / 180;
                const distance = (stat.base_stat / 255) * 80;
                const x = 100 + distance * Math.cos(angle);
                const y = 100 + distance * Math.sin(angle);

                return (
                  <circle
                    key={stat.stat.name}
                    cx={x}
                    cy={y}
                    r="3"
                    fill={getStatColor(stat.stat.name, stat.base_stat)}
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* Stat labels */}
            <div className="radar-labels">
              {pokemon.stats.map((stat, index) => {
                const angle = ((index * 60 - 90) * Math.PI) / 180;
                const x = 50 + 45 * Math.cos(angle);
                const y = 50 + 45 * Math.sin(angle);

                return (
                  <div
                    key={stat.stat.name}
                    className="radar-label"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {statNames[stat.stat.name]}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="stats-insights">
        <div className="stat-highlights">
          <div className="highest-stat">
            <strong>Highest:</strong>{' '}
            {
              statNames[
                pokemon.stats.reduce((max, stat) => (stat.base_stat > max.base_stat ? stat : max))
                  .stat.name
              ]
            }{' '}
            (
            {pokemon.stats.reduce(
              (max, stat) => (stat.base_stat > max.base_stat ? stat.base_stat : max),
              0
            )}
            )
          </div>
          <div className="lowest-stat">
            <strong>Lowest:</strong>{' '}
            {
              statNames[
                pokemon.stats.reduce((min, stat) => (stat.base_stat < min.base_stat ? stat : min))
                  .stat.name
              ]
            }{' '}
            (
            {pokemon.stats.reduce(
              (min, stat) => (stat.base_stat < min.base_stat ? stat.base_stat : min),
              255
            )}
            )
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;
