import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import FilterButtons from './FilterButtons';

const FILTER_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterInputs() {
  const {
    handleAddColumnFilter,
    handleRemoveAllFilters,
    columnFilters,
    nameFilter,
    handleNameFilterChange,
  } = useContext(PlanetContext);

  const [columnFilter, setColumnFilter] = useState(
    { column: FILTER_COLUMNS[0], operator: 'maior que', value: 0 },
  );

  const handleColumnFilterChange = (field, value) => {
    setColumnFilter({ ...columnFilter, [field]: value });
  };

  const availableColumns = FILTER_COLUMNS.filter((column) => (
    !columnFilters.some((filter) => filter.column === column)
  ));

  return (
    <>
      <div className="name-filter">
        <label htmlFor="name-filter" className="label-name-filter">
          Projeto Star Wars - Trybe
          <input
            data-testid="name-filter"
            id="name-filter"
            type="text"
            placeholder="Pesquisar"
            value={ nameFilter }
            onChange={ handleNameFilterChange }
          />
        </label>
      </div>
      <div className="filters">
        <select
          data-testid="column-filter"
          value={ columnFilter.column }
          onChange={ ({ target }) => (
            handleColumnFilterChange('column', target.value)
          ) }
        >
          {availableColumns.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ columnFilter.operator }
          onChange={ ({ target }) => (
            handleColumnFilterChange('operator', target.value)
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ columnFilter.value }
          placeholder="0"
          onClick={ ({ target }) => {
            target.value = '';
          } }
          onChange={ ({ target }) => (
            handleColumnFilterChange('value', target.value)
          ) }
        />
        <button
          data-testid="button-filter"
          onClick={ () => {
            handleAddColumnFilter(columnFilter);
            setColumnFilter(
              { column: availableColumns[1], operator: 'maior que', value: 0 },
            );
          } }
        >
          FILTRAR
        </button>
        <FilterButtons />
        <button
          data-testid="button-remove-filters"
          onClick={ handleRemoveAllFilters }
        >
          REMOVER FILTROS
        </button>
      </div>
    </>
  );
}

export default FilterInputs;
