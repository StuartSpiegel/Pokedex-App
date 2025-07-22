import React from 'react';
import './Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  getPageNumbers,
  totalItems,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {startItem}-{endItem} of {totalItems} Pokémon
      </div>

      <div className="pagination">
        <button className="pagination-btn" onClick={onPrevPage} disabled={!hasPrevPage}>
          ← Previous
        </button>

        <div className="pagination-numbers">
          {pageNumbers[0] > 1 && (
            <>
              <button className="pagination-number" onClick={() => onPageChange(1)}>
                1
              </button>
              {pageNumbers[0] > 2 && <span className="pagination-ellipsis">...</span>}
            </>
          )}

          {pageNumbers.map(page => (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="pagination-ellipsis">...</span>
              )}
              <button className="pagination-number" onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button className="pagination-btn" onClick={onNextPage} disabled={!hasNextPage}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
