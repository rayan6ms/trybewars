import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);
  const [order, setOrder] = useState({ column: 'name', direction: 'ASC' });

  useEffect(() => {
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((data) => setPlanets(data.results.filter((el) => delete el.residents)));
  }, []);

  const handleNameFilterChange = ({ target }) => {
    setNameFilter(target.value);
  };

  const handleAddColumnFilter = (columnFilter) => {
    setColumnFilters([...columnFilters, columnFilter]);
  };

  const handleRemoveColumnFilter = (index) => {
    const newColumnFilters = [...columnFilters];
    newColumnFilters.splice(index, 1);
    setColumnFilters(newColumnFilters);
  };

  const handleRemoveAllFilters = () => {
    setColumnFilters([]);
    setNameFilter('');
    setOrder({ column: '', direction: '' });
  };

  const applyOrder = (pendingOrder) => {
    setOrder(pendingOrder);
  };

  function formatColumnName(columnName) {
    return columnName.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  const context = {
    planets,
    nameFilter,
    setNameFilter,
    columnFilters,
    setColumnFilters,
    order,
    setOrder,
    formatColumnName,
    handleAddColumnFilter,
    handleRemoveColumnFilter,
    applyOrder,
    handleRemoveAllFilters,
    handleNameFilterChange,
  };

  return (
    <PlanetContext.Provider value={ context }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
