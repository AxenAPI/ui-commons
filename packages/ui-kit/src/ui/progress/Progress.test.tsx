import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { NProgress } from './models';
import { Progress } from './Progress';

const defaultProps: NProgress.TProps = {
  failureCount: 2,
  failurePercent: 20,
  successCount: 8,
  successPercent: 80,
  totalCount: 10,
  isShowInfo: true,
  withCounting: true,
  failureStrokeColor: 'red',
  successStrokeColor: 'green',
};

const renderProgress = (props: Partial<NProgress.TProps> = {}) => {
  return render(<Progress {...defaultProps} {...props} />);
};

describe('Progress Component', () => {
  test('renders progress with default props', () => {
    renderProgress();

    expect(screen.getByText('10/10')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('shows percentage info when "isShowInfo" is true and "withCounting" is false', () => {
    renderProgress({ withCounting: false });

    const progressInner = screen.getByRole('progressbar').querySelector('.ant-progress-text') as HTMLElement;

    expect(progressInner).toHaveAttribute('title', '100%');
  });

  test('renders custom failure stroke color', () => {
    renderProgress({ failureStrokeColor: 'blue' });

    const progress = screen.getByRole('progressbar').querySelector('.ant-progress-bg');
    expect(progress).toHaveStyle('background: blue');
  });

  test('renders counting info correctly when "withCounting" is true', () => {
    renderProgress();

    expect(screen.getByText('10/10')).toBeInTheDocument();
  });

  test('does not show counting info when "withCounting" is false', () => {
    renderProgress({ withCounting: false });

    expect(screen.queryByText('10/10')).not.toBeInTheDocument();
  });

  test('unmounts correctly', () => {
    const { unmount } = renderProgress();

    unmount();

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
