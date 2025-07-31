import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useComponentTokens, useTheme } from '@/providers';

import { RangePicker } from './RangePicker';

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

// to avoid error TypeError: window.matchMedia is not a function
beforeAll(() => {
  (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });
  (useComponentTokens as jest.Mock).mockReturnValue({});
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

describe('/ui/RangePicker/RangePicker.tsx', () => {
  test('should render', () => {
    render(<RangePicker placeholder={['Select start', 'Select end']} />);

    expect(screen.getByPlaceholderText('Select start')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select end')).toBeInTheDocument();
  });

  test('should type values to inputs', async () => {
    render(<RangePicker placeholder={['Select start', 'Select end']} />);

    const startRangeInput = screen.getByPlaceholderText('Select start');
    await userEvent.type(startRangeInput, '01/25/2024');
    expect(startRangeInput).toHaveValue('01/25/2024');

    const endRangeInput = screen.getByPlaceholderText('Select end');
    await userEvent.type(endRangeInput, '02/25/2024');
    expect(endRangeInput).toHaveValue('02/25/2024');
  });

  test('should be disabled when isDisabled prop is true', () => {
    render(<RangePicker isDisabled={true} data-testid="range-picker" />);

    const inputs = screen.getAllByRole('textbox');

    expect(inputs.length).toBe(2);

    expect(inputs[0]).toBeDisabled();
    expect(inputs[1]).toBeDisabled();
  });

  test('should unmounts without errors', () => {
    const { unmount } = render(<RangePicker />);

    expect(() => unmount()).not.toThrow();
  });

  test('renders floating label when floatLabel props is true', () => {
    const { container } = render(<RangePicker floatLabel />);
    const label = container.querySelector('.label');
    expect(label).toBeInTheDocument();
  });
});
