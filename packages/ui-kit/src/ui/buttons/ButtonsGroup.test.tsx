import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ButtonsGroup } from './ButtonsGroup';

const buttonsConfigMock = [
  { buttonKey: 'btn1', children: 'Button 1', className: 'custom-btn-1', style: { color: 'red' } },
  {
    buttonKey: 'btn2',
    children: 'Button 2',
    className: 'custom-btn-2',
    style: { backgroundColor: 'blue' },
    isDisabled: true,
  },
  { buttonKey: 'btn3', children: 'Button 3', onClick: jest.fn(), 'aria-label': 'Third button' },
];

const renderButtonsGroup = (props = {}) => {
  return render(<ButtonsGroup buttonsConfig={buttonsConfigMock} {...props} />);
};

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// ✅ **Rendering Tests**
test('renders all buttons from config', () => {
  // Arrange
  renderButtonsGroup();

  // Assert
  expect(screen.getByRole('button', { name: /button 1/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /button 2/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /third button/i })).toBeInTheDocument(); // Исправлено
});

test('renders empty container when buttonsConfig is empty', () => {
  // Arrange
  render(<ButtonsGroup buttonsConfig={[]} />);

  // Assert
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

// ✅ **Class & Style Tests**
test('applies additional className to container', () => {
  // Arrange
  const customClassName = 'custom-container';
  renderButtonsGroup({ className: customClassName });

  // Assert
  const container = document.querySelector('.buttonsGroupContainer');

  expect(container).toHaveClass(customClassName);
});

test('applies custom className and styles to buttons', () => {
  // Arrange
  renderButtonsGroup();

  // Assert
  expect(screen.getByRole('button', { name: /button 1/i })).toHaveClass('custom-btn-1');
  expect(screen.getByRole('button', { name: /button 2/i })).toHaveClass('custom-btn-2');
  expect(screen.getByRole('button', { name: /button 1/i })).toHaveStyle('color: red');
  expect(screen.getByRole('button', { name: /button 2/i })).toHaveStyle('background-color: blue');
});

// ✅ **Accessibility (AA) Tests**
test('sets correct aria-label for accessibility', () => {
  // Arrange
  renderButtonsGroup();

  // Assert
  expect(screen.getByRole('button', { name: /third button/i })).toBeInTheDocument();
});

// ✅ **Behavior Tests**
test('handles button click correctly', async () => {
  // Arrange
  renderButtonsGroup();
  const user = userEvent.setup();
  const button = screen.getByRole('button', { name: /third button/i });

  // Act
  await user.click(button);

  // Assert
  expect(buttonsConfigMock[2].onClick).toHaveBeenCalledTimes(1);
});

test('disables button when isDisabled is true', async () => {
  // Arrange
  const user = userEvent.setup();
  renderButtonsGroup();
  const disabledButton = screen.getByRole('button', { name: /button 2/i });

  // Assert
  expect(disabledButton).toBeDisabled();

  // Act
  await user.click(disabledButton);

  // Assert
  expect(buttonsConfigMock[1].onClick).toBeUndefined();
});

// ✅ **Unmount Test**
test('cleans up correctly on unmount', () => {
  // Arrange
  const { unmount } = renderButtonsGroup();

  // Act
  unmount();

  // Assert
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
