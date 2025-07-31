import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NCommonAccordion } from '../_common';
import { Collapse } from './Collapse';
import { NCollapse } from './models';

const renderCollapse = (props?: NCollapse.TProps) => {
  render(<Collapse {...props} />);
};

export const TEST_ITEMS: NCommonAccordion.TCollapseItem[] = [
  {
    key: '1',
    label: 'Panel 1',
    children: 'Content 1...',
  },
  {
    key: '2',
    label: 'Panel 2',
    children: 'Content 2...',
  },
];

describe('/ui/collapses/Collapse.tsx', () => {
  test('renders with provided items', () => {
    renderCollapse({ items: TEST_ITEMS });

    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  test('toggles panel content on click', async () => {
    const onChange = jest.fn();
    renderCollapse({ items: TEST_ITEMS, defaultActiveKey: ['1'], onChange });

    expect(screen.getByText('Content 1...')).toBeVisible();
    await userEvent.click(screen.getByText('Panel 2'));

    waitFor(() => {
      expect(screen.getByText('Content 1...')).not.toBeVisible();
      expect(screen.getByText('Content 2...')).toBeVisible();
    });

    expect(onChange).toHaveBeenCalled();
  });

  test('displayed content by defaultActiveKey if there is defaultActiveKey', () => {
    renderCollapse({ items: TEST_ITEMS, defaultActiveKey: ['1'] });
    expect(screen.getByText('Content 1...')).toBeVisible();
  });

  test('it is not expanded if collapsible is disabled', async () => {
    const onChange = jest.fn();
    renderCollapse({ items: TEST_ITEMS, collapsible: 'disabled', onChange });

    await userEvent.click(screen.getByText('Panel 1'));
    waitFor(() => {
      expect(screen.getByText('Content 1...')).not.toBeVisible();
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  test('if collapsible is header', async () => {
    renderCollapse({ items: TEST_ITEMS, collapsible: 'header' });

    const headerElement = screen.getByText('Panel 1', { selector: '.ant-collapse-header-text' });
    await userEvent.click(headerElement);
    waitFor(() => {
      expect(screen.getByText('Content 1...')).toBeVisible();
    });
  });

  test('if collapsible is icon', async () => {
    renderCollapse({ items: TEST_ITEMS, collapsible: 'icon' });

    const headerElement = screen.getByText('Panel 1', { selector: '.ant-collapse-header-text' });
    await userEvent.click(headerElement);

    waitFor(() => {
      expect(screen.getByText('Content 1...')).not.toBeVisible();
    });
  });

  test('applies custom styles', () => {
    const style = { width: '200px' };
    renderCollapse({ items: TEST_ITEMS, style: style });

    const collapseElement = screen.getByText('Panel 1');
    const collapseElementWraper = collapseElement.closest('.ant-collapse');
    expect(collapseElementWraper).toHaveStyle({ width: '200px' });
  });

  test('should have border when isBordered prop is true', () => {
    renderCollapse({ items: TEST_ITEMS, isBordered: true });
    const collapseElement = screen.getByText('Panel 1');
    const collapseElementWraper = collapseElement.closest('.ant-collapse');
    expect(collapseElementWraper).not.toHaveClass('ant-collapse-borderless');
  });

  test('provide size props', () => {
    const size = 'small';
    renderCollapse({ items: TEST_ITEMS, size: size });
    const collapseElement = screen.getByText('Panel 1');
    const collapseElementWraper = collapseElement.closest('.ant-collapse');
    expect(collapseElementWraper).toHaveClass(`ant-collapse-${size}`);
  });

  test('should be ghost when isGhost prop is true', () => {
    renderCollapse({ items: TEST_ITEMS, isGhost: true });
    const collapseElement = screen.getByText('Panel 1');
    const collapseElementWraper = collapseElement.closest('.ant-collapse');
    expect(collapseElementWraper).toHaveClass('ant-collapse-ghost');
  });
});
