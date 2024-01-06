import { render, screen } from '@testing-library/react';

import Footer from '@/components/footer/footer';

describe('components/footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('render footer component correctly', () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('render school link', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/react/');
  });

  it('should display the copyright', () => {
    const copyright = screen.getByText(
      '© 2023 GraphiQL | ApiFinder'
    );
    expect(copyright).toBeInTheDocument();
  });
});
