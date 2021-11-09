import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa componente notfound.js', () => {
  test('Teste se página contém um heading h2 com o texto Page requested notfound', () => {
    render(
      <NotFound />,
    );
    const headingEl = screen.getByRole('heading',
      { level: 2,
        name: /Page requested not found/,
      });
    expect(headingEl).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem:', () => {
    render(
      <NotFound />,
    );
    const imgNotFound = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
