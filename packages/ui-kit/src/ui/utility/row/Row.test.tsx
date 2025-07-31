import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Col } from '../col';
import { Row, TRowProps } from './index';

const ROW_TEST_ID = 'row';
const COLUMN_TEST_ID = 'column';

const renderRow = (props?: Omit<TRowProps, 'children'>) =>
  render(
    <Row {...props} data-testId={ROW_TEST_ID}>
      <Col data-testId={COLUMN_TEST_ID}>First column</Col>
      <Col>Second column</Col>
    </Row>
  );

describe('ui/utility/row/Row.tsx', () => {
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

  test('mounts without errors', () => {
    const { getByTestId } = renderRow();

    expect(getByTestId(ROW_TEST_ID)).toHaveClass('ant-row');
  });

  test('renders with custom class', () => {
    const className = 'custom-class';
    const { getByTestId } = renderRow({ className });

    expect(getByTestId(ROW_TEST_ID)).toHaveClass(className);
  });

  test('renders with wrap prop', () => {
    const { getByTestId } = renderRow({ wrap: true });

    expect(getByTestId(ROW_TEST_ID)).toHaveStyle({ flexFlow: 'row wrap' });
  });

  test('renders with gutter prop', () => {
    const gutter = 10;
    const { getByTestId } = renderRow({ gutter });

    expect(getByTestId(COLUMN_TEST_ID)).toHaveStyle({ paddingLeft: gutter / 2, paddingRight: gutter / 2 });
  });

  test('renders with style prop', () => {
    const style = { background: 'red' };
    const { getByTestId } = renderRow({ style });

    expect(getByTestId(ROW_TEST_ID)).toHaveStyle(style);
  });

  test('renders with justify prop', () => {
    const justifyContent = 'space-between';
    const { getByTestId } = renderRow({ justify: justifyContent });

    expect(getByTestId(ROW_TEST_ID)).toHaveStyle({ justifyContent });
  });

  test('renders with align prop', () => {
    const align = 'middle';
    const alignItems = 'center';
    const { getByTestId } = renderRow({ align });

    expect(getByTestId(ROW_TEST_ID)).toHaveStyle({ alignItems });
  });

  test('unmounts without errors', () => {
    const { unmount } = renderRow();

    expect(() => unmount()).not.toThrow();
  });
});
