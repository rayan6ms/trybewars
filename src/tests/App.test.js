import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Componente App', () => {
  it('Renderiza o componente Table', () => {
    render(<App />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});