import { ReactNode } from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Button } from '@/ui';

import { NSpace } from './models';
import { Space } from './Space';

const content = (
  <>
    <Button key="primary" type="primary">
      Primary
    </Button>
    <Button key="default">Default</Button>
  </>
);

const renderSpace = (children: ReactNode, props?: NSpace.TProps) => {
  return render(
    <Space {...props} data-testid="space">
      {children}
    </Space>
  );
};

describe('ui/utility/space/Space.tsx', () => {
  test('unmounts without errors', () => {
    const { unmount } = renderSpace(content);

    expect(() => unmount()).not.toThrow();
  });

  test('renders two buttons correctly', () => {
    renderSpace(content);

    expect(screen.getByText(/Primary/i)).toBeInTheDocument();
    expect(screen.getByText(/Default/i)).toBeInTheDocument();
  });

  test('applies custom class when className prop is provided', () => {
    renderSpace(content, { children: content, className: 'custom-class' });
    const spaceElement = screen.getByTestId('space');

    expect(spaceElement).toHaveClass('custom-class');
  });

  test('applies correct direction when direction prop is provided', () => {
    renderSpace(content, { children: content, direction: 'vertical' });
    const spaceElement = screen.getByTestId('space');

    expect(spaceElement).toHaveClass('ant-space-vertical');
  });

  test('applies correct size when size prop is provided', () => {
    const size = 'large';
    renderSpace(content, { children: content, size: 'large' });
    const spaceElement = screen.getByTestId('space');

    expect(spaceElement).toHaveClass(`ant-space-gap-row-${size} ant-space-gap-col-${size}`);
  });

  test('applies correct align when align prop is provided', () => {
    const align = 'center';
    renderSpace(content, { children: content, align: align });
    const spaceElement = screen.getByTestId('space');

    expect(spaceElement).toHaveClass(`ant-space-align-${align}`);
  });

  test('renders split element when split prop is provided', () => {
    renderSpace(content, { children: content, split: '|' });
    const splitElement = screen.getByText('|');

    expect(splitElement).toBeInTheDocument();
  });

  test('applies correct style when style prop is provided', () => {
    renderSpace(content, { children: content, style: { backgroundColor: 'red' } });
    const spaceElement = screen.getByTestId('space');

    expect(spaceElement).toHaveStyle('background-color: red');
  });
});
