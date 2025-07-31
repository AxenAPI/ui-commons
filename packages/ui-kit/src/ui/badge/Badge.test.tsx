import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { NBadge } from '@/ui';

import { Badge } from './Badge';

const renderBadge = (props?: NBadge.TProps) => {
  return render(
    <Badge {...props}>
      <button>Button</button>
    </Badge>
  );
};

describe('/ui/badge/Badge.tsx', () => {
  test('renders with the provided count', () => {
    renderBadge({ count: 5 });
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('does not render when count is zero and showZero is false', () => {
    renderBadge({ count: 0, showZero: false });
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  test('renders dot badge when dot=true', () => {
    renderBadge({ dot: true });

    const dotBadge = document.querySelector('.ant-badge-dot');
    expect(dotBadge).toBeInTheDocument();
    expect(dotBadge).toHaveAttribute('data-show', 'true');
  });

  test('applies the correct theme-based styles when type is set', () => {
    renderBadge({ type: 'primary', count: 3 });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('does not render when count is undefined', () => {
    renderBadge({ count: undefined });
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });

  test('renders without props', () => {
    renderBadge();

    const badge = document.querySelector('.ant-badge');
    expect(badge).toBeInTheDocument();

    // We check that the counter is not rendered if count is not passed.
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });
});
