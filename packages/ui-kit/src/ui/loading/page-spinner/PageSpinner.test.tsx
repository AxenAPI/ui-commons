import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PageSpinner } from './PageSpinner';

// Mocking Ant Spin component
jest.mock('antd', () => ({
  Spin: jest.fn(({ spinning, fullscreen, tip, className }) => (
    <div
      data-spinning={spinning}
      data-fullscreen={fullscreen}
      data-tip={tip || ''}
      className={className}
      role={'status'}
    />
  )),
}));

describe('/ui/spinners/PageSpinner.tsx', () => {
  test('renders with spinning enabled', () => {
    render(<PageSpinner isSpinning={true} isFullscreen={false} />);
    const spinner = screen.getByRole('status');

    expect(spinner).toHaveAttribute('data-spinning', 'true');
    expect(spinner).toHaveAttribute('data-fullscreen', 'false');
  });

  test('renders in fullscreen mode', () => {
    render(<PageSpinner isSpinning={true} isFullscreen={true} />);
    const spinner = screen.getByRole('status');

    expect(spinner).toHaveAttribute('data-spinning', 'true');
    expect(spinner).toHaveAttribute('data-fullscreen', 'true');
  });

  test('disables spinning when isSpinning is false', () => {
    render(<PageSpinner isSpinning={false} isFullscreen={false} />);
    const spinner = screen.getByRole('status');

    expect(spinner).toHaveAttribute('data-spinning', 'false');
  });

  test('renders with custom tip', () => {
    const tipText = 'Loading...';
    render(<PageSpinner isSpinning={true} isFullscreen={false} tip={tipText} />);

    const spinner = screen.getByRole('status');

    expect(spinner).toHaveAttribute('data-tip', tipText);
  });

  test('applies custom styles', () => {
    const customClass = 'custom-spinner';
    render(<PageSpinner isSpinning={true} isFullscreen={false} className={customClass} />);
    const spinner = screen.getByRole('status');

    expect(spinner).toHaveClass(customClass);
  });

  test('unmounts without errors', () => {
    const { unmount } = render(<PageSpinner isSpinning={true} isFullscreen={false} />);

    expect(() => unmount()).not.toThrow();
  });
});
