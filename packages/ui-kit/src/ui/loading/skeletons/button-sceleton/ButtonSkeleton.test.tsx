import { render } from '@testing-library/react';

import { ButtonSkeleton } from './ButtonSkeleton';

describe('ButtonSkeleton', () => {
  it('renders correctly', () => {
    render(<ButtonSkeleton />);
    const button = document.querySelector('.ant-skeleton-button');

    expect(button).toBeTruthy();
  });

  it('accepts isActive prop', () => {
    render(<ButtonSkeleton isActive={true} />);
    const button = document.querySelector('.ant-skeleton-active');

    expect(button).toBeTruthy();
  });

  it('accepts isBlock prop', () => {
    render(<ButtonSkeleton isBlock={true} />);
    const button = document.querySelector('.ant-skeleton-block');

    expect(button).toBeTruthy();
  });

  it('renders with custom size', () => {
    render(<ButtonSkeleton size="large" />);
    const button = document.querySelector('.ant-skeleton-button-lg');

    expect(button).toBeTruthy();
  });

  test('input unmounts without errors', () => {
    const { unmount } = render(<ButtonSkeleton />);

    expect(() => unmount()).not.toThrow();
  });
});
