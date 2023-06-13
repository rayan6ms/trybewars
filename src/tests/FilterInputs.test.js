import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Componente FilterInputs', () => {
  it('Verifica se o input name-filter funciona corretamente', () => {
    render(<App />);
    const filterInputElement = screen.getByTestId('name-filter');
    userEvent.type(filterInputElement, 'Alderaan');
    
    waitFor(() => {
      const filteredPlanet = screen.getByTestId('planet-name');
      expect(filteredPlanet).toBeInTheDocument();
    });
  });

  it('Verifica se o select column-filter possui 5 opções', () => {
    render(<App />);
    const selectElement = screen.getByTestId('column-filter');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.children.length).toBe(5);
  });

  it('Verifica se o input value-filter aceita apenas números e se quando clicado o text dentro do input é apagado', () => {
    render(
      <App />,
    );
    const inputElement = screen.getByTestId('value-filter');
    userEvent.type(inputElement, '123');
    expect(inputElement.value).toBe('123');

    userEvent.type(inputElement, 'abc');
    expect(inputElement.value).toBe('');

    userEvent.click(inputElement);
    expect(inputElement.value).toBe('');
  });

  it('Verifica se os inputs radio-button funcionam corretamente', () => {
    render(<App />);
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(2);

    userEvent.click(radioButtons[0]);
    expect(radioButtons[0]).toBeChecked();
    expect(radioButtons[1]).not.toBeChecked();

    userEvent.click(radioButtons[1]);
    expect(radioButtons[0]).not.toBeChecked();
    expect(radioButtons[1]).toBeChecked();
  });
});
