import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Verifica se o elemento com as informações do filtro funciona corretamente', () => {
  it('Verifica se o div filter possui um parágrafo com as informações do filtro aplicado e um button button-remove-filters', () => {
    render(<App />);

    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButtonElement = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilterSelect, 'population');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '1000000');
    userEvent.click(filterButtonElement);

    const filterElement = screen.getByTestId('filter');
    expect(filterElement).toBeInTheDocument();
    
    expect(filterElement.children.length).toBe(1);
    expect(filterElement.children[0].children[0].tagName).toBe('P');
    expect(filterElement.children[0].children[0].innerHTML).toBe('Population maior que 1000000 ');
    expect(filterElement.children[0].children[1].tagName).toBe('BUTTON');
  });

  it('Verifica se as informações de mais de um filtro são exibidas corretamente', () => {
    render(<App />);

    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButtonElement = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilterSelect, 'population');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '1000000');
    userEvent.click(filterButtonElement);

    userEvent.selectOptions(columnFilterSelect, 'orbital_period');
    userEvent.selectOptions(comparisonFilterSelect, 'menor que');
    userEvent.type(valueFilterInput, '400');
    userEvent.click(filterButtonElement);

    const filterElement = screen.getByTestId('filter');
    expect(filterElement).toBeInTheDocument();
    
    expect(filterElement.children.length).toBe(2);
    expect(filterElement.children[0].children[0].tagName).toBe('P');
    expect(filterElement.children[0].children[0].innerHTML).toBe('Population maior que 1000000 ');
    expect(filterElement.children[0].children[1].tagName).toBe('BUTTON');
    expect(filterElement.children[1].children[0].tagName).toBe('P');
    expect(filterElement.children[1].children[0].innerHTML).toBe('Orbital Period menor que 400 ');
    expect(filterElement.children[1].children[1].tagName).toBe('BUTTON');
  });

  it('Verifica se o button button-remove-filters funciona corretamente', () => {
    render(<App />);

    const columnFilterSelect = screen.getByTestId('column-filter');
    const comparisonFilterSelect = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButtonElement = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilterSelect, 'population');
    userEvent.selectOptions(comparisonFilterSelect, 'maior que');
    userEvent.type(valueFilterInput, '1000000');
    userEvent.click(filterButtonElement);

    const filterElement = screen.getByTestId('filter');
    expect(filterElement).toBeInTheDocument();
    
    expect(filterElement.children.length).toBe(1);
    expect(filterElement.children[0].children[0].tagName).toBe('P');
    expect(filterElement.children[0].children[0].innerHTML).toBe('Population maior que 1000000 ');

    const removeFiltersButton = screen.getAllByTestId('button-remove-filters');
    userEvent.click(removeFiltersButton[0]);

    expect(filterElement.children.length).toBe(0);
  });
});
