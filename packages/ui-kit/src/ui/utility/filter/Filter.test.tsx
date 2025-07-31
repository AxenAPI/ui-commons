import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Filter } from './Filter';
import { NFilter } from './models';

const defaultProps: NFilter.TProps = {
  label: 'Категория',
  items: ['Тег 1', 'Тег 2', 'Тег 3'],
  isClosable: true,
  controlMaxWidth: 100,
  onLabelClick: jest.fn(),
  filterId: 'filter-1',
};

const renderFilter = (props: Partial<NFilter.TProps> = {}) => {
  const element = <Filter {...defaultProps} {...props} />;
  return render(element);
};

const expectItemsToBeInTheDocument = (items: string[]) => {
  items.forEach(item => {
    expect(screen.getByText(content => content.includes(item))).toBeInTheDocument();
  });
};

test('renders filter label and items', () => {
  // Arrange
  renderFilter();

  // Act & Assert
  expect(screen.getByText('Категория:')).toBeInTheDocument();
  expectItemsToBeInTheDocument(defaultProps.items);
});

test('calls onLabelClick when label is clicked', async () => {
  // Arrange
  renderFilter();

  const label = screen.getByText('Категория:');

  // Act
  await userEvent.click(label);

  // Assert
  expect(defaultProps.onLabelClick).toHaveBeenCalledWith('filter-1');
});

test('displays tooltip with all items when hovered', async () => {
  // Arrange
  renderFilter();

  const filter = screen.getByText('Категория:');

  // Act
  await userEvent.hover(filter);

  // Assert
  expectItemsToBeInTheDocument(defaultProps.items);
});

test('does not render close icon when isClosable is false', () => {
  // Arrange
  renderFilter({ isClosable: false });

  // Act & Assert
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('renders custom close icon if provided', () => {
  renderFilter({
    closeIcon: <span>X</span>,
  });
  expect(screen.getByText('X')).toBeInTheDocument();
});

test('renders "Значение" when no items are provided', () => {
  // Arrange
  renderFilter({ items: [] });

  // Act & Assert
  expect(screen.getByText('Значение')).toBeInTheDocument();
});

test('unmounts without errors', () => {
  // Arrange
  const { unmount } = renderFilter();

  // Act & Assert
  expect(() => unmount()).not.toThrow();
  cleanup();
});

test('applies custom className and styles', () => {
  // Arrange
  renderFilter({
    className: 'custom-filter-class',
    style: { backgroundColor: 'red' },
  });

  // Act & Assert
  const filterElement = document.querySelector('[filterid]');
  expect(filterElement).toHaveClass('custom-filter-class');
  expect(filterElement).toHaveStyle({ backgroundColor: 'red' });
});
