import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { NScrollArea } from './models';
import { ScrollArea } from './ScrollArea';

const defaultProps: NScrollArea.TProps = {
  className: 'default-classname',
  children: <div>Default content</div>,
};

const renderScrollArea = (props?: Partial<NScrollArea.TProps>) => {
  return render(<ScrollArea {...defaultProps} {...props} />);
};

describe('ScrollArea Component', () => {
  test('renders with default props', () => {
    renderScrollArea();
    expect(screen.getByText('Default content')).toBeInTheDocument();
  });

  test('renders vertical scroll when orientation is vertical', () => {
    const { container } = renderScrollArea({ orientation: 'vertical' });

    const scrollElement = container.querySelector('.os-scrollbar-vertical');

    expect(scrollElement).toBeInTheDocument();
    expect(scrollElement).toHaveClass('os-theme-light');
  });

  test('renders horizontal scroll when orientation is horizontal', () => {
    const { container } = renderScrollArea({ orientation: 'horizontal' });

    const scrollElement = container.querySelector('.os-scrollbar-horizontal');

    expect(scrollElement).toBeInTheDocument();
    expect(scrollElement).toHaveClass('os-theme-light');
  });

  test('accepts custom className', () => {
    const { container } = renderScrollArea({ className: 'custom-classname' });

    const scrollAreaElement = container.querySelector('.custom-classname');
    expect(scrollAreaElement).toBeInTheDocument();
  });

  test('applies custom scrollbar styles', () => {
    const { container } = renderScrollArea();

    const scrollbarHandle = container.querySelector('.os-scrollbar-handle');
    expect(scrollbarHandle).toHaveStyle('background: var(--os-handle-bg)');
  });

  test('correctly passes children', () => {
    renderScrollArea({ children: <div data-testid="test-child">Test Content</div> });

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  test('unmounts correctly', () => {
    const { unmount, container } = renderScrollArea();

    const scrollElement = container.querySelector('.default-classname');
    expect(scrollElement).toBeInTheDocument();

    unmount();
    expect(scrollElement).not.toBeInTheDocument();
  });
});
