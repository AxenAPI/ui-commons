import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Steps } from 'antd';

import { NSteppers } from './models.ts';

const items = [
  {
    title: 'title 1',
    description: 'description 1',
  },
  {
    title: 'title 2',
    description: 'description 2',
  },
  {
    title: 'title 3',
    description: 'description 3',
  },
];

const defaultProps: NSteppers.TProps = {
  current: 1,
  items,
};

const renderSteps = (props?: NSteppers.TProps) => {
  return render(<Steps {...props} />);
};

describe('/ui/steppers/Steps.tsx', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  test('steps unmount', () => {
    const { unmount } = renderSteps(defaultProps);

    expect(() => unmount()).not.toThrow();
  });

  test('steps title', () => {
    renderSteps(defaultProps);

    expect(screen.getByText('title 1')).toBeInTheDocument();
    expect(screen.getByText('title 2')).toBeInTheDocument();
    expect(screen.getByText('title 3')).toBeInTheDocument();
  });

  test('steps description', () => {
    renderSteps(defaultProps);

    expect(screen.getByText('description 1')).toBeInTheDocument();
    expect(screen.getByText('description 2')).toBeInTheDocument();
    expect(screen.getByText('description 3')).toBeInTheDocument();
  });

  test('renders the current step correctly', () => {
    const { container } = renderSteps(defaultProps);

    const steps = container.querySelectorAll('.ant-steps-item');

    expect(steps[1]).toHaveClass('ant-steps-item-active');
  });

  test('renders the current step finish', () => {
    const { container } = renderSteps(defaultProps);

    const steps = container.querySelectorAll('.ant-steps-item');

    expect(steps[0]).toHaveClass('ant-steps-item-finish');
  });

  test('steps error', () => {
    const { container } = renderSteps({
      ...defaultProps,
      status: 'error',
    });

    const steps = container.querySelectorAll('.ant-steps-item');

    expect(steps[1]).toHaveClass('ant-steps-item-error');
  });

  test('steps progressDot', () => {
    const { container } = renderSteps({
      ...defaultProps,
      progressDot: true,
    });

    const steps = container.querySelector('.ant-steps');

    expect(steps).toHaveClass('ant-steps-dot');
  });

  test('steps percent', () => {
    const { container } = renderSteps({
      percent: 60,
      ...defaultProps,
    });

    const progress = container.querySelector('.ant-progress');

    expect(progress).toHaveAttribute('aria-valuenow', '60');
  });

  test('steps direction vertical', () => {
    const { container } = renderSteps({
      direction: 'vertical',
      ...defaultProps,
    });

    const progress = container.querySelector('.ant-steps');

    expect(progress).toHaveClass('ant-steps-vertical');
  });
});
