import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { useComponentTokens, useTheme } from '@/providers';

import { TimePicker } from './TimePicker';

const mockTheme = {
  components: {
    Icon: {
      primaryColor: 'blue',
      defaultColor: 'black',
    },
  },
};

jest.mock('@/providers', () => ({
  useComponentTokens: jest.fn(),
  useTheme: jest.fn(),
}));

beforeAll(() => {
  (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });
});

beforeEach(() => {
  (useComponentTokens as jest.Mock).mockReturnValue({
    fontSize: 16,
    fontSizeIcon: 16,
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
  });
});

test('renders TimePicker component', () => {
  // Arrange & Act
  render(<TimePicker />);

  // Assert
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('applies disabled prop', () => {
  // Arrange & Act
  render(<TimePicker isDisabled />);

  // Assert
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('renders with suffix icon', () => {
  // Arrange & Act
  const { container } = render(<TimePicker />);

  // Assert
  const icon = container.querySelector('.ant-picker-suffix svg');
  expect(icon).toBeInTheDocument();
});

test('unmounts TimePicker without errors', () => {
  // Arrange
  const { unmount } = render(<TimePicker />);

  // Act & Assert
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  unmount();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});

test('applies custom className', () => {
  // Arrange & Act
  render(<TimePicker className="custom-class" />);
  const timePicker = screen.getByRole('textbox');

  // Assert
  expect(timePicker.closest('.ant-picker')).toHaveClass('custom-class');
});

test('renders floating label when floatLabel props is true', () => {
  const { container } = render(<TimePicker floatLabel />);
  const label = container.querySelector('.label');
  expect(label).toBeInTheDocument();
});
