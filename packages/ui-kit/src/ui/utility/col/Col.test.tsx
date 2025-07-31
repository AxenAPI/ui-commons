import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Col } from './Col';

describe('ui/utility/col/Col.tsx', () => {
  test('unmounts without errors', () => {
    const text = 'Text';
    const { unmount } = render(<Col>{text}</Col>);

    expect(() => unmount()).not.toThrow();
  });

  test('renders with custom className', () => {
    const text = 'Text';
    const customClass = 'it-custom-class';
    render(<Col className={customClass}>{text}</Col>);

    expect(screen.getByText(text)).toHaveClass('it-custom-class');
  });

  test('renders with custom styles', () => {
    const text = 'Text';
    const styles = { backgroundColor: 'red' };
    render(<Col style={styles}>{text}</Col>);

    expect(screen.getByText(text)).toHaveStyle({ backgroundColor: 'red' });
  });

  test('renders with prop flex', () => {
    const text = 'Text';
    render(<Col flex={1}>{text}</Col>);

    expect(screen.getByText(text)).toHaveStyle({ flex: '1 1 auto' });
  });

  test('renders with prop offset', () => {
    const text = 'Text';
    render(<Col offset={2}>{text}</Col>);

    expect(screen.getByText(text)).toHaveClass('ant-col-offset-2');
  });

  test('renders with prop order', () => {
    const text = 'Text';
    render(<Col order={3}>{text}</Col>);

    expect(screen.getByText(text)).toHaveClass('ant-col-order-3');
  });

  test('renders with prop pull', () => {
    const text = 'Text';
    render(<Col pull={4}>{text}</Col>);

    expect(screen.getByText(text)).toHaveClass('ant-col-pull-4');
  });

  test('renders without props', () => {
    const text = 'Text';
    render(<Col>{text}</Col>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test('does not throw an error when children as null are passed', () => {
    expect(() => render(<Col>{null}</Col>)).not.toThrow();
  });
});
