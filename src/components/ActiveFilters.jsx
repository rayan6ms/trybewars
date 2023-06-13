import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function ActiveFilters() {
  const {
    columnFilters,
    handleRemoveColumnFilter,
    formatColumnName,
  } = useContext(PlanetContext);

  return (
    <div className="filter-info">
      {columnFilters.map((filter, index) => (
        <div key={ index } className="filter-info-item" data-testid="filter">
          <p>
            {`${formatColumnName(filter.column)} ${filter.operator} ${filter.value} `}
          </p>
          <button
            type="button"
            className="delete-filter-button"
            data-testid="delete-filter-button"
            onClick={ () => handleRemoveColumnFilter(index) }
          >
            <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="" width="22px" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ActiveFilters;
