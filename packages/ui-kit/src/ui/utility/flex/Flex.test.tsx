import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Flex } from './Flex';

const MOCK_TEXT = 'MOCK_TEXT';

test('unmounts without errors', () => {
  const { unmount } = render(<Flex>{MOCK_TEXT}</Flex>);
  expect(() => unmount()).not.toThrow();
});

test('renders with custom className', () => {
  const customClass = 'it-custom-class';
  render(<Flex className={customClass}>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveClass('it-custom-class');
});

test('renders with custom styles', () => {
  const styles = { backgroundColor: 'red' };
  render(<Flex style={styles}>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ backgroundColor: 'red' });
});

test('renders with prop flex', () => {
  render(<Flex flex={1}>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ flex: '1' });
});

test('renders with prop vertical', () => {
  render(<Flex vertical>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ flexDirection: 'column' });
});

test('renders with prop prefixCls', () => {
  render(
    <Flex vertical prefixCls="zhopa">
      {MOCK_TEXT}
    </Flex>
  );
  expect(screen.getByText(MOCK_TEXT)).toHaveClass('zhopa-vertical');
});

test('renders with prop wrap', () => {
  render(<Flex wrap>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ flexWrap: 'wrap' });
});

test('renders with prop justify', () => {
  render(<Flex justify="center">{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ justifyContent: 'center' });
});

test('renders with prop align', () => {
  render(<Flex align="center">{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ alignItems: 'center' });
});

test('renders with prop gap', () => {
  render(<Flex gap={2}>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ gap: '2px' });
});

test('renders with prop gap', () => {
  render(<Flex gap={2}>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toHaveStyle({ gap: '2px' });
});

test('renders without props', () => {
  render(<Flex>{MOCK_TEXT}</Flex>);
  expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
});

test('does not throw an error when children as null are passed', () => {
  expect(() => render(<Flex>{null}</Flex>)).not.toThrow();
});
