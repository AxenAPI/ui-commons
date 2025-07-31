import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Layout } from './Layout';

test('renders Layout with children', () => {
  // Arrange
  render(
    <Layout>
      <h1>Test Content</h1>
    </Layout>
  );

  // Assert
  expect(screen.getByRole('heading', { name: /test content/i })).toBeInTheDocument();
});

test('passes props to AntdLayout', () => {
  // Arrange
  render(<Layout className="custom-class" />);

  // Assert
  expect(document.querySelector('.custom-class')).toBeInTheDocument();
});

test('supports custom attributes', () => {
  // Arrange
  render(<Layout data-testid="custom-layout" />);

  // Assert
  expect(screen.getByTestId('custom-layout')).toBeInTheDocument();
});

test('renders multiple children', () => {
  // Arrange
  render(
    <Layout>
      <p>First child</p>
      <p>Second child</p>
    </Layout>
  );

  // Assert
  expect(screen.getByText('First child')).toBeInTheDocument();
  expect(screen.getByText('Second child')).toBeInTheDocument();
});

test('renders with default styles', () => {
  // Arrange
  render(<Layout className="default-styles" />);

  // Assert
  const layoutElement = document.querySelector('.ant-layout.default-styles');
  expect(layoutElement).toBeInTheDocument();
});

test('unmounts Layout correctly', () => {
  // Arrange
  const { unmount } = render(
    <Layout>
      <h1>Test Content</h1>
    </Layout>
  );

  // Act
  unmount();

  // Assert
  expect(() => screen.getByRole('heading', { name: /test content/i })).toThrow();
});

test('renders Layout with different props', () => {
  // Arrange
  const { container } = render(<Layout style={{ backgroundColor: 'red' }} />);

  // Assert
  expect(container.firstChild).toHaveStyle('background-color: red');
});

test('handles interactions inside Layout', async () => {
  // Arrange
  const user = userEvent.setup();
  const handleClick = jest.fn(); // Mock function to test interaction

  render(
    <Layout>
      <button onClick={handleClick}>Click me</button>
    </Layout>
  );

  // Act
  await user.click(screen.getByRole('button', { name: /click me/i }));

  // Assert
  expect(handleClick).toHaveBeenCalledTimes(1); // Verify the button click triggers the function
});
