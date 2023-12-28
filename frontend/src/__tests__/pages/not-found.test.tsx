import { render, screen } from '@testing-library/react';

import NotFound from '@/app/not-found';

describe('Pages/Not-Found', () => {
  it('Render Not-Found correctly', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Not Found Page');
  });
});
