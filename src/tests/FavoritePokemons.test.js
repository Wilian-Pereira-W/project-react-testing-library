import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Testa componente FavoritePokemon.js', () => {
  test('Teste se não tiver pokémon favorito, exibir No favorite pokemon found', () => {
    render(
      <FavoritePokemons />,
    );
    const noFavorite = screen
      .getByText(/No favorite pokemon found/);
    expect(noFavorite).toBeInTheDocument();
  });
});
