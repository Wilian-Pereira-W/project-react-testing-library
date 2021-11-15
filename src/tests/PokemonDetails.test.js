import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa componente PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do Pokémon é mostradas na tela', () => {
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

    const textoDetalhe = screen.getByText('Pikachu Details');
    expect(textoDetalhe).toBeInTheDocument();

    expect(detalheLink).not.toBeInTheDocument();

    const headingEl = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(headingEl).toBeInTheDocument();

    const paragrafo = screen
      .getByText(/This intelligent Pokémon roasts hard/);
    expect(paragrafo).toBeInTheDocument();
  });
  test('Teste se tem seção com os mapas contendo as localizações do pokémon', () => {
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

    const headingEl = screen.getByRole('heading', { level: 2,
      name: 'Game Locations of Pikachu' });
    expect(headingEl).toBeInTheDocument();

    const todasAsImagens = screen.getAllByRole(/img/i);
    const quantidadeDeImagem = 3;
    expect(todasAsImagens).toHaveLength(quantidadeDeImagem);

    const primeiraImgLocalizacao = todasAsImagens[1];
    expect(primeiraImgLocalizacao).toBeInTheDocument();
    const primeiroNomeLocalizacao = screen.getByText('Kanto Viridian Forest');
    expect(primeiroNomeLocalizacao).toBeInTheDocument();

    const segundaImgLocalizacao = todasAsImagens[2];
    expect(segundaImgLocalizacao).toBeInTheDocument();
    const segundoNomeLocalizacao = screen.getByText('Kanto Power Plant');
    expect(segundoNomeLocalizacao).toBeInTheDocument();

    expect(primeiraImgLocalizacao).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(primeiraImgLocalizacao)
      .toHaveAttribute('alt', 'Pikachu location');

    expect(segundaImgLocalizacao).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(segundaImgLocalizacao)
      .toHaveAttribute('alt', 'Pikachu location');
  });

  test('Teste se o usuário pode favoritar um pokémon pela página de detalhes', () => {
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
    const textoFavorito = screen.getByAltText('Pikachu is marked as favorite');
    expect(textoFavorito).toBeInTheDocument();

    userEvent.click(checkboxFavorito);
    expect(textoFavorito).not.toBeInTheDocument();

    const nomeLabel = screen.getByText('Pokémon favoritado?');
    expect(nomeLabel).toBeInTheDocument();
  });
});
