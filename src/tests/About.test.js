import React from 'react';
import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('Testa componente about.js', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <About />,
    );
    const h2El = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(h2El).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <About />,
    );
    const primeiroParagrafo = screen
      .getByText(/This application simulates a Pokédex/);
    expect(primeiroParagrafo).toBeInTheDocument();
    const segundoParagrafo = screen
      .getByText(/One can filter Pokémons by type/);
    expect(segundoParagrafo).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(
      <About />,
    );
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
