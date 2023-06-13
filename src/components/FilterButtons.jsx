import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

const FILTER_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterButtons() {
  const {
    applyOrder,
  } = useContext(PlanetContext);

  const [pendingOrder, setPendingOrder] = useState(
    { column: FILTER_COLUMNS[0],
      direction: 'ASC',
    },
  );

  const handleOrderChange = (field, value) => {
    setPendingOrder({ ...pendingOrder, [field]: value });
  };

  return (
    <>
      <select
        data-testid="column-sort"
        value={ pendingOrder.column }
        onChange={ ({ target }) => handleOrderChange('column', target.value) }
      >
        {FILTER_COLUMNS.map((columnName) => (
          <option key={ columnName } value={ columnName }>
            {columnName}
          </option>
        ))}
      </select>
      <div className="inputs-radio">
        <label htmlFor="ASC">
          <input
            type="radio"
            id="ASC"
            data-testid="column-sort-input-asc"
            name="direction"
            value="ASC"
            checked={ pendingOrder.direction === 'ASC' }
            onChange={ ({ target }) => handleOrderChange('direction', target.value) }
          />
          Crescente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            id="DESC"
            data-testid="column-sort-input-desc"
            name="direction"
            value="DESC"
            checked={ pendingOrder.direction === 'DESC' }
            onChange={ ({ target }) => handleOrderChange('direction', target.value) }
          />
          Decrescente
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        onClick={ () => applyOrder(pendingOrder) }
      >
        ORDENAR
      </button>
    </>
  );
}

export default FilterButtons;
