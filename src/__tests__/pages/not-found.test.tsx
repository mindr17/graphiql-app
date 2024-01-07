import { render, screen } from '@testing-library/react';

import NotFound from '@/app/not-found';

describe('pages/not-found', () => {
  it('render not-found page correctly', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Not Found Page');
  });
});
