/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa componente Pokemon.js', () => {
  test('Teste o nome correto do Pokémon deve ser mostrado na tela;', () => {
    render(
      <MemoryRouter>
        <App />
        ,
      </MemoryRouter>,
    );

    const nomePokemon = screen
      .getByTestId('pokemon-name');
    expect(nomePokemon).toHaveTextContent('Pikachu');
  });
  test('Teste o tipo correto do pokémon deve ser mostrado na tela', () => {
    render(
      <MemoryRouter>
        <App />
        ,
      </MemoryRouter>,
    );

    const tipoPokemon = screen
      .getByTestId('pokemon-type');
    expect(tipoPokemon).toHaveTextContent('Electric');
  });
  test('Teste o formato do peso médio do pokémon deve ser exibido', () => {
    render(
      <MemoryRouter>
        <App />
        ,
      </MemoryRouter>,
    );

    const pesoPokemon = screen
      .getByTestId('pokemon-weight');
    expect(pesoPokemon).toHaveTextContent('Average weight: 6.0 kg');
  });
  test('Teste o formato do peso médio do pokémon deve ser exibido', () => {
    render(
      <MemoryRouter>
        <App />
        ,
      </MemoryRouter>,
    );

    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém link de navegação', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
        ,
      </Router>,
    );

    const detalheLink = screen.getByRole('link', { name: /More details/ });
    expect(detalheLink).toBeInTheDocument();
    expect(detalheLink).toHaveAttribute('href', '/pokemons/25');
  });
  test('Teste se ao clicar no link de navegação do Pokémon, muda de página', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
        ,
      </Router>,
    );

    const detalheLink = screen.getByRole('link', { name: 'More details' });
    expect(detalheLink).toBeInTheDocument();
    userEvent.click(detalheLink);
    expect(customHistory.location.pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
        ,
      </Router>,
    );
    const detalheLink = screen.getByRole('link', { name: 'More details' });
    expect(detalheLink).toBeInTheDocument();
    userEvent.click(detalheLink);
    expect(customHistory.location.pathname).toBe('/pokemons/25');

    const checkboxFavorito = screen.getByRole('checkbox');
    expect(checkboxFavorito).toBeInTheDocument();
    userEvent.click(checkboxFavorito);

    const imgFavorito = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgFavorito).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFavorito).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
