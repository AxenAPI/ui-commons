import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown } from './Dropdown';
import { NDropdown } from './models';

const defaultProps: NDropdown.TProps = {
  isArrow: true,
  isAutoAdjustOverflow: true,
  isDisabled: false,
  isOpen: false,
  shouldDestroyPopupOnHide: true,
  menu: {
    items: [
      { key: '1', label: 'Item 1' },
      {
        key: '2',
        label: 'Item 2',
        children: [{ key: '2-1', label: 'Sub Item' }],
      },
    ],
  },
  children: <button>Open Dropdown</button>,
};

const renderDropdown = (props: Partial<NDropdown.TProps> = {}) => {
  const element = <Dropdown {...defaultProps} {...props} />;
  return render(element);
};

const createDropdown = (props: Partial<NDropdown.TProps> = {}) => {
  return <Dropdown {...defaultProps} {...props} />;
};

test('renders dropdown trigger button', () => {
  // Arrange
  renderDropdown();

  // Act & Assert
  expect(screen.getByRole('button', { name: /open dropdown/i })).toBeInTheDocument();
});

test('displays menu when dropdown is open', () => {
  // Arrange
  renderDropdown({ isOpen: true });

  // Act & Assert
  expect(screen.getByRole('menu')).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /item 1/i })).toBeInTheDocument();
  expect(screen.getByRole('menuitem', { name: /item 2/i })).toBeInTheDocument();
});

test('renders a badge when countBadge is provided', () => {
  // Arrange
  renderDropdown({ countBadge: 5 });

  // Act & Assert
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('renders a disabled dropdown when isDisabled is true', () => {
  // Arrange
  renderDropdown({ isDisabled: true });

  // Act & Assert
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('renders submenu with custom icon', () => {
  // Arrange
  act(() => {
    renderDropdown({ isOpen: true });
  });

  // Act & Assert
  expect(screen.getByRole('menuitem', { name: /item 2/i })).toBeInTheDocument();
  expect(document.querySelector('svg')).toBeInTheDocument();
});

test('unmounts dropdown component correctly', () => {
  const { unmount } = renderDropdown();

  unmount();

  expect(screen.queryByRole('button', { name: /open dropdown/i })).not.toBeInTheDocument();
});

test('closes dropdown when an item is clicked', async () => {
  let isOpen = true;

  const handleOpenChange = (open: boolean) => {
    isOpen = open;
    rerender(createDropdown({ isOpen, onOpenChange: handleOpenChange }));
  };

  const { rerender } = render(createDropdown({ isOpen, onOpenChange: handleOpenChange }));

  const item = screen.getByRole('menuitem', { name: /item 1/i });

  await act(async () => {
    await userEvent.click(item);
  });

  // Проверка, что меню закрылось
  await waitFor(() => {
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
