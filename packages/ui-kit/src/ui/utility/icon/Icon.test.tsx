import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { useTheme } from '@/providers/theme-provider';

import { Icon } from './Icon';

const mockTheme = {
  components: {
    Icon: {
      primaryColor: 'blue',
      defaultColor: 'black',
    },
  },
};

jest.mock('@/providers/theme-provider', () => ({
  useTheme: jest.fn(),
}));

describe('/ui/utility/icon/Icon.tsx', () => {
  test('renders correctly when an empty theme is provided', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: {} });
    render(<Icon icon="⭐" />);

    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  test('does not throw an error when no icon is provided', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: {} });
    expect(() => render(<Icon icon="" />)).not.toThrow();
  });

  test('renders with default props', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });
    render(<Icon icon="⭐" />);
    const iconElement = screen.getByText('⭐');

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveStyle({
      width: '24px',
      height: '24px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: 'black',
    });
  });

  test('renders with custom size and style', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });
    const customStyle = { color: 'red', margin: '10px' };
    render(<Icon icon="⭐" size={32} style={customStyle} type="primary" />);
    const iconElement = screen.getByText('⭐');

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveStyle({
      width: '32px',
      height: '32px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      color: 'red',
      margin: '10px',
    });
  });

  test('renders with custom className', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: {} });
    render(<Icon icon="⭐" className="custom-class" />);

    expect(screen.getByText('⭐')).toHaveClass('custom-class');
  });

  test('unmounts without errors', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: {} });
    const { unmount } = render(<Icon icon="⭐" />);

    expect(() => unmount()).not.toThrow();
  });
});
