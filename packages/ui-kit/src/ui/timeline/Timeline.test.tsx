import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { NTimeline } from './models';
import { Timeline } from './Timeline';

// Хелпер для генерации items
const createItem = (overrides: Partial<NTimeline.TItem> = {}): NTimeline.TItem => ({
  children: <span>Content</span>,
  ...overrides,
});

describe('/ui/timeline/Timeline.tsx', () => {
  it('renders timeline in left mode by default', () => {
    const items = [createItem(), createItem()];
    render(<Timeline items={items} />);
    expect(screen.getAllByTestId('timeline-item').every(el => el.getAttribute('data-position') === 'left')).toBe(true);
  });

  it('renders timeline in right mode', () => {
    const items = [createItem(), createItem()];
    render(<Timeline items={items} mode="right" />);
    expect(screen.getAllByTestId('timeline-item').every(el => el.getAttribute('data-position') === 'right')).toBe(true);
  });

  it('renders timeline in alternate mode with correct positions', () => {
    const items = [createItem({ label: 'A' }), createItem({ label: 'B' }), createItem({ label: 'C' })];
    render(<Timeline items={items} mode="alternate" />);
    const nodes = screen.getAllByTestId('timeline-item');
    expect(nodes[0].getAttribute('data-position')).toBe('left');
    expect(nodes[1].getAttribute('data-position')).toBe('right');
    expect(nodes[2].getAttribute('data-position')).toBe('left');
  });

  it('renders custom dot and label', () => {
    const items = [createItem({ dot: <span data-testid="custom-dot">*</span>, label: 'Label' })];
    render(<Timeline items={items} mode="alternate" />);
    expect(screen.getByTestId('custom-dot')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    const items = [createItem({ color: 'red' })];
    render(<Timeline items={items} />);
    // Проверяем, что svg circle имеет stroke="red"
    const circle = screen.getByTestId('timeline-dot').querySelector('circle');
    expect(circle).toHaveAttribute('stroke', 'red');
  });

  it('renders correctly in alternate mode without label', () => {
    const items = [createItem(), createItem()];
    render(<Timeline items={items} mode="alternate" />);
    const timelineItems = screen.getAllByTestId('timeline-item');
    timelineItems.forEach(item => {
      expect(item.querySelector('[class*="headTailContainer"]')).toBeInTheDocument();
    });
    expect(screen.queryByText('Label')).toBeNull();
  });

  it('mounts and unmounts without errors', () => {
    const items = [createItem(), createItem()];
    const { unmount, container } = render(<Timeline items={items} />);
    expect(container.querySelectorAll('[data-testid="timeline-item"]').length).toBe(2);
    expect(() => unmount()).not.toThrow();
    expect(container.querySelector('[data-testid="timeline-item"]')).toBeNull();
  });
});
