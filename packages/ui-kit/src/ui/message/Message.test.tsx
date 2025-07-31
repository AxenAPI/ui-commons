import { IconCircleCheckFilled } from '@tabler/icons-react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

import { Message } from './Message';

jest.useFakeTimers();

describe('Message', () => {
  it('renders with default (normal) type', () => {
    render(<Message content="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with all types', () => {
    const types = ['normal', 'success', 'error', 'warning', 'loading'] as const;
    types.forEach(type => {
      render(<Message type={type} content={`Type: ${type}`} />);
      expect(screen.getByText(`Type: ${type}`)).toBeInTheDocument();
    });
  });

  it('renders custom content (ReactNode)', () => {
    render(<Message content={<span data-testid="custom-content">Custom</span>} />);
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    render(<Message content="With icon" icon={<IconCircleCheckFilled data-testid="custom-icon" />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('calls onClose after duration', () => {
    const onClose = jest.fn();
    render(<Message content="Auto close" duration={1000} onClose={onClose} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount', () => {
    const onClose = jest.fn();
    const { unmount } = render(<Message content="Unmount test" duration={1000} onClose={onClose} />);
    unmount();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});
