import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testa componente app.js', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const primeiroLink = screen.getByRole('link', { name: /home/i });
      expect(primeiroLink).toBeInTheDocument();

      const segundoLink = screen.getByRole('link', { name: /about/i });
      expect(segundoLink).toBeInTheDocument();

      const terceiroLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(terceiroLink).toBeInTheDocument();
    });
  test('Teste se é redirecionado para a home, na URL / ao clicar no link Home', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(customHistory.location.pathname).toBe('/');
  });
  test('Teste se é redirecionado para a About, ao clicar no link About', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(customHistory.location.pathname).toBe('/about');
  });
  test('Teste se é redirecionado para os Favoritados, ao clicar no link favorito', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    const favoritoLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritoLink).toBeInTheDocument();
    userEvent.click(favoritoLink);
    expect(customHistory.location.pathname).toBe('/favorites');
  });
  test('Navega para uma rota não existente e renderiza o NotFound', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );
    customHistory.push('/page-not-found');

    const imgPikachuTristeEl = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(imgPikachuTristeEl).toBeInTheDocument();

    const notFoundTextEl = screen.getByText(/Page requested not found/);
    expect(notFoundTextEl).toBeInTheDocument();
  });
});
