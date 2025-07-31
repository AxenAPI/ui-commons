import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Card } from './Card';
import { NCard } from './model';

const Grid = () => (
  <Card.Grid>
    <Card.Meta title="Meta title" description="Meta description" />
  </Card.Grid>
);
const renderCard = (props: NCard.TProps) => render(<Card {...props} />);

describe('Card stories', () => {
  test('renders Card with text content', () => {
    renderCard({ children: 'Default card' });
    expect(screen.getByText('Default card')).toBeInTheDocument();
  });

  test('renders Card with loading indicator', () => {
    const { container } = renderCard({ children: 'Loading card', isLoading: true });
    const cardElement = container.querySelector('.ant-card');
    expect(cardElement).toHaveClass('ant-card-loading');
  });

  test('renders Card with hover effect', () => {
    const { container } = renderCard({ children: 'Loading card', isHoverable: true });
    const cardElement = container.querySelector('.ant-card');
    expect(cardElement).toHaveClass('ant-card-hoverable');
  });

  test('renders Card with border', () => {
    const { container } = renderCard({ children: 'Loading card', isBordered: true });
    const cardElement = container.querySelector('.ant-card');
    expect(cardElement).toHaveClass('ant-card-bordered');
  });

  test('renders Card with inner style', () => {
    const { container } = renderCard({ children: 'Loading card', isInnerStyle: true });
    const cardElement = container.querySelector('.ant-card');
    expect(cardElement).toHaveClass('innerStyle');
  });

  test('renders Grid story with grid and meta components', () => {
    const { getByText } = render(<Grid />);
    expect(getByText('Meta title')).toBeInTheDocument();
    expect(getByText('Meta description')).toBeInTheDocument();
  });

  test('card unmount', () => {
    const { unmount } = renderCard({ children: 'Default card' });
    expect(screen.getByText('Default card')).toBeInTheDocument();

    unmount();

    expect(screen.queryByText('Default card')).not.toBeInTheDocument();
  });
});
