import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/header/header';

jest.mock('next/navigation');

describe('components/header', () => {
  beforeEach(() => {
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );
  });

  it('render header component correctly', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('render header-language component correctly', () => {
    expect(screen.getByTestId('header-language')).toBeInTheDocument();
  });

  it('render header-auth-btns component correctly', () => {
    expect(
      screen.getByTestId('header-auth-btns')
    ).toBeInTheDocument();
  });
});
