import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlanetContext from '../context/PlanetContext';
import Table from '../components/Table';
import '@testing-library/jest-dom';
import App from '../App';

describe('Componente Table', () => {
  it('Renderiza o componente Table com todas suas subpartes', () => {
    render(<App />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const filterInputElement = screen.getByTestId('name-filter');
    expect(filterInputElement).toBeInTheDocument();

    const filterButtonElement = screen.getByTestId('button-filter');
    expect(filterButtonElement).toBeInTheDocument();

    const inputElements = [...screen.getAllByRole('textbox'), ...screen.getAllByRole('radio'), ...screen.getAllByRole('spinbutton')];
    expect(inputElements.length).toBe(4);

    const buttonElements = screen.getAllByRole('button');
    expect(buttonElements.length).toBe(3);

    const selectElements = screen.getAllByRole('combobox');
    expect(selectElements.length).toBe(3);
    
    waitFor(() => {
      const tableRowElements = screen.getAllByRole('row');
      expect(tableRowElements.length).toBe(11);
    } );
  });

  it('Verifica se no th Population não existe um td com o valor "unknown" após ser aplicado um filtro', () => {
    render(<App />);
    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButtonElement = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilterSelect, 'population');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '1000000');
    userEvent.click(filterButtonElement);

    waitFor(() => {
      const filteredPlanet = screen.getAllByTestId('table-row');
      
      filteredPlanet.forEach((planet) => {
        const planetPopulation = planet.children[8];
        expect(planetPopulation.innerHTML).not.toBe('unknown');
      });
    });
  });

  it('Verifica se quando o button column-sort-button for clicado, o primeiro valor de população é menor que o segundo', () => {
    render(<App />);
    const sortButtonElement = screen.getByTestId('column-sort-button');
    userEvent.click(sortButtonElement);

    waitFor(() => {
      const sortedPlanet = screen.getAllByTestId('table-row');
      expect(Number(sortedPlanet[0].children[8].innerHTML) 
      < Number(sortedPlanet[1].children[8].children[0].innerHTML)).toBe(true);
    });
  });

  it('Verifica se a filtragem dos planetas funciona corretamente', () => {
    render(
      <PlanetContext.Provider value={{
        planets: [
          { name: 'Earth', population: '7500000000' },
          { name: 'Mars', population: 'unknown' },
          { name: 'Jupiter', population: 'unknown' },
          { name: 'Venus', population: 'unknown' },
        ],
        order: { column: 'name', direction: 'ASC' },
        formatColumnName: (name) => name,
        nameFilter: 'ar',
        columnFilters: [
          { column: 'population', operator: 'maior que', value: '1000' },
        ],
      }}>
        <Table />
      </PlanetContext.Provider>
    );

    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.queryByText('Mars')).not.toBeInTheDocument();
    expect(screen.queryByText('Jupiter')).not.toBeInTheDocument();
    expect(screen.queryByText('Venus')).not.toBeInTheDocument();
  });

  it('Verifica se a ordenação dos planetas funciona corretamente', () => {
    render(
      <PlanetContext.Provider value={{
        planets: [
          { name: 'Earth', population: '7500000000', films: ['A', 'B'] },
          { name: 'Mars', population: '5000000', films: ['C', 'D'] },
          { name: 'Jupiter', population: '3000000', films: ['E', 'F'] },
          { name: 'Venus', population: 'unknown', films: ['G', 'H'] },
        ],
        order: { column: 'population', direction: 'DESC' },
        formatColumnName: (name) => name,
        nameFilter: '',
        columnFilters: [],
      }}>
        <Table />
      </PlanetContext.Provider>
    );

    const rows = screen.getAllByTestId('table-row');
    expect(rows[0].firstChild.textContent).toBe('Earth');
    expect(rows[1].firstChild.textContent).toBe('Mars');
    expect(rows[2].firstChild.textContent).toBe('Jupiter');
  });

  it('Renderiza corretamente as linhas e colunas da tabela', () => {
    render(
      <PlanetContext.Provider value={{
        planets: [
          { name: 'Earth', population: '7500000000', films: ['A', 'B'] },
        ],
        order: { column: 'name', direction: 'ASC' },
        formatColumnName: (name) => name.toUpperCase(),
        nameFilter: '',
        columnFilters: [],
      }}>
        <Table />
      </PlanetContext.Provider>
    );

    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells[0].textContent).toBe('NAME');
    expect(headerCells[1].textContent).toBe('POPULATION');
    expect(headerCells[2].textContent).toBe('FILMS');

    const row = screen.getByTestId('table-row');
    const cells = within(row).getAllByRole('cell');
    expect(cells[0].textContent).toBe('Earth');
    expect(cells[1].textContent).toBe('7500000000');
    expect(cells[2].textContent).toContain('A');
  });

  const renderTable = (columnFilters, nameFilter) => render(
    <PlanetContext.Provider value={{
      planets: [
        { name: 'Earth', population: '7500000000' },
        { name: 'Mars', population: '7000000' },
        { name: 'Jupiter', population: '6000000' },
        { name: 'Venus', population: '5000000' },
      ],
      order: { column: 'name', direction: 'ASC' },
      formatColumnName: (name) => name,
      nameFilter,
      columnFilters,
    }}>
      <Table />
    </PlanetContext.Provider>
  );

  it('Venus, menor que', () => {
    renderTable([{ column: 'population', operator: 'menor que', value: '7000000' }], 'enu');
    expect(screen.getByText('Venus')).toBeInTheDocument();
    expect(screen.queryByText('Earth')).not.toBeInTheDocument();
    expect(screen.queryByText('Mars')).not.toBeInTheDocument();
    expect(screen.queryByText('Jupiter')).not.toBeInTheDocument();
  });

  it('Mars, igual a', () => {
    renderTable([{ column: 'population', operator: 'igual a', value: '7000000' }], 'ars');
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.queryByText('Earth')).not.toBeInTheDocument();
    expect(screen.queryByText('Venus')).not.toBeInTheDocument();
    expect(screen.queryByText('Jupiter')).not.toBeInTheDocument();
  });

  it('All, não suportado', () => {
    renderTable([{ column: 'population', operator: 'não suportado', value: '7000000' }], '');
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('Venus')).toBeInTheDocument();
    expect(screen.getByText('Jupiter')).toBeInTheDocument();
  });

  it('Sem filtro, ordenação', () => {
    renderTable([], '');
    const sortedPlanets = screen.getAllByTestId('planet-name');
    expect(sortedPlanets[0]).toHaveTextContent('Earth');
    expect(sortedPlanets[1]).toHaveTextContent('Jupiter');
    expect(sortedPlanets[2]).toHaveTextContent('Mars');
    expect(sortedPlanets[3]).toHaveTextContent('Venus');
  });
});
