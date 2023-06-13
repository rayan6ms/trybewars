import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import '../styles/Table.css';
import FilterInputs from './FilterInputs';
import ActiveFilters from './ActiveFilters';

function Table() {
  const {
    planets,
    order,
    formatColumnName,
    nameFilter,
    columnFilters,
  } = useContext(PlanetContext);

  const filteredPlanets = planets
    .filter((planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((planet) => columnFilters.every((filter) => {
      const columnValue = Number(planet[filter.column]);
      const filterValue = Number(filter.value);
      if (Number.isNaN(columnValue) || Number.isNaN(filterValue)) return false;
      switch (filter.operator) {
      case 'maior que':
        return columnValue > filterValue;
      case 'menor que':
        return columnValue < filterValue;
      case 'igual a':
        return columnValue === filterValue;
      default:
        return true;
      }
    }));

  const sortedPlanets = filteredPlanets.sort((a, b) => {
    const columnA = Number(a[order.column]);
    const columnB = Number(b[order.column]);
    if (Number.isNaN(columnA) || Number.isNaN(columnB)) return 0;
    if (order.direction === 'ASC') {
      return columnA - columnB;
    }
    return columnB - columnA;
  }).filter((planet) => planet[order.column] !== 'unknown');

  const columnNames = planets[0] ? Object.keys(planets[0]) : [];
  let isAfterFilms = false;

  return (
    <>
      <FilterInputs />
      <ActiveFilters />
      <table>
        <thead>
          <tr className="header-row">
            {columnNames.map((columnName, index) => (
              <th key={ index }>{formatColumnName(columnName)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedPlanets.map((planet, index) => (
            <tr key={ index } className="table-row" data-testid="table-row">
              {columnNames.map((columnName, subIndex) => {
                if (columnName === 'films') isAfterFilms = true;
                return (
                  <td
                    key={ subIndex }
                    data-testid={ subIndex === 0 && 'planet-name' }
                  >
                    {isAfterFilms
                      ? <p className={ `td-${columnName}` }>{planet[columnName]}</p>
                      : planet[columnName]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
