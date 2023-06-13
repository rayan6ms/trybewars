import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import PlanetContext from '../context/PlanetContext';
import FilterButtons from '../components/FilterButtons';

describe('Componente FilterButtons', () => {
  it('Verifica se o button button-filter funciona corretamente', () => {
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
      const filteredPlanet = screen.getByTestId('planet-name');
      expect(filteredPlanet).toBeInTheDocument();
    });
  });

  it('Verifica se o button column-sort-button funciona corretamente', () => {
    render(<App />);
    const sortButtonElement = screen.getByTestId('column-sort-button');
    userEvent.click(sortButtonElement);

    waitFor(() => {
      const sortedPlanet = screen.getAllByTestId('planet-name');
      expect(sortedPlanet[0].innerHTML).toBe('Yavin IV');
    });
  });

  it('Verifica se o button button-remove-filters funciona corretamente', () => {
    render(<App />);
    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButtonElement = screen.getByTestId('button-filter');
    const removeFilterButtonElement = screen.getByTestId('button-remove-filters');

    userEvent.selectOptions(columnFilterSelect, 'population');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '1000000');
    userEvent.click(filterButtonElement);

    waitFor(() => {
      const filteredPlanet = screen.getByTestId('planet-name');
      expect(filteredPlanet).toBeInTheDocument();
    });

    userEvent.click(removeFilterButtonElement);

    waitFor(() => {
      const filteredPlanet = screen.queryByTestId('planet-name');
      expect(filteredPlanet).not.toBeInTheDocument();
    });
  });

  it('Verifica se após adicionado um filtro e clicado no button delete-filter-button a div filter possui 0 children', () => {
    render(<App />);
    const filterButtonElement = screen.getByTestId('button-filter');
    userEvent.click(filterButtonElement);

    waitFor(() => {
      expect(deleteFilterButtonElement).toBeInTheDocument();
    });
    
    const deleteFilterButtonElement = screen.getByTestId('delete-filter-button');
    userEvent.click(deleteFilterButtonElement);

    waitFor(() => {
      const filterDiv = screen.getByTestId('filter');
      expect(filterDiv.children.length).toBe(0);
    });
  });

  it('Verifica se a ordem muda corretamente', () => {
    const applyOrder = jest.fn();

    render(
      <PlanetContext.Provider value={ { applyOrder } }>
        <FilterButtons />
      </PlanetContext.Provider>,
    );

    userEvent.selectOptions(screen.getByTestId('column-sort'), ['diameter']);

    userEvent.click(screen.getByTestId('column-sort-input-desc'));

    userEvent.click(screen.getByTestId('column-sort-button'));

    expect(applyOrder).toHaveBeenCalledWith({ column: 'diameter', direction: 'DESC' });
  });
});
