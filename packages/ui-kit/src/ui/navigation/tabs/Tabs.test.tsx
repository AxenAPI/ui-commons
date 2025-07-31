import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs } from './Tabs';

const defaultProps = {
  items: [
    { key: 'tab1', label: 'Tab 1' },
    { key: 'tab2', label: 'Tab 2' },
    { key: 'tab3', label: 'Tab 3', isDisabled: true },
  ],
  defaultActiveKey: 'tab1',
};

let user: ReturnType<typeof userEvent.setup>;

beforeAll(() => {
  user = userEvent.setup();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders all tabs', () => {
  // Arrange
  render(<Tabs {...defaultProps} />);

  // Act & Assert
  expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /tab 3/i })).toBeInTheDocument();
});

test('changes active tab on click', async () => {
  // Arrange
  render(<Tabs {...defaultProps} />);
  const tab1 = screen.getByRole('tab', { name: /tab 1/i });
  const tab2 = screen.getByRole('tab', { name: /tab 2/i });

  expect(tab1).toHaveAttribute('aria-selected', 'true');
  expect(tab2).toHaveAttribute('aria-selected', 'false');

  // Act
  await user.click(tab2);

  // Assert
  expect(tab1).toHaveAttribute('aria-selected', 'false');
  expect(tab2).toHaveAttribute('aria-selected', 'true');
});

test('calls onChange when switching tabs', async () => {
  // Arrange
  const onChange = jest.fn();
  render(<Tabs {...defaultProps} onChange={onChange} />);
  const tab2 = screen.getByRole('tab', { name: /tab 2/i });

  // Act
  await user.click(tab2);

  // Assert
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('tab2');
});

test('does not activate disabled tabs', async () => {
  // Arrange
  render(<Tabs {...defaultProps} />);
  const tab1 = screen.getByRole('tab', { name: /tab 1/i });
  const tab3 = screen.getByRole('tab', { name: /tab 3/i });

  expect(tab3).toHaveAttribute('aria-disabled', 'true');

  // Act
  await user.click(tab3);

  // Assert
  expect(tab1).toHaveAttribute('aria-selected', 'true');
  expect(tab3).toHaveAttribute('aria-selected', 'false');
});

test('respects controlled activeKey prop', () => {
  // Arrange
  render(<Tabs {...defaultProps} activeKey="tab2" />);
  const tab1 = screen.getByRole('tab', { name: /tab 1/i });
  const tab2 = screen.getByRole('tab', { name: /tab 2/i });

  // Act & Assert
  expect(tab1).toHaveAttribute('aria-selected', 'false');
  expect(tab2).toHaveAttribute('aria-selected', 'true');
});

test('renders badge if provided', () => {
  const itemsWithBadge = [
    { key: 'tab1', label: 'Tab 1', hasBadge: true, badgeCount: 5 },
    { key: 'tab2', label: 'Tab 2' },
  ];
  render(<Tabs {...defaultProps} items={itemsWithBadge} />);

  const badgeNumber = screen.getByText('5'); // Число внутри бейджа
  const badgeContainer = badgeNumber.closest('.ant-badge-count');

  expect(badgeContainer).toBeInTheDocument();
});

test('unmounts component correctly', () => {
  const { unmount, container } = render(<Tabs {...defaultProps} />);

  // Проверяем, что компонент отрендерился
  expect(container).toBeInTheDocument();

  // Удаляем компонент
  unmount();

  // Проверяем, что компонент больше не в DOM
  expect(container).toBeEmptyDOMElement();
});
