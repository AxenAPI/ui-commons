import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { FileInput } from './FileInput';

const defaultProps = {
  shouldShowUploadList: true,
  shouldOpenFileDialogOnClick: true,
  isMultiple: false,
  isDisabled: false,
  isDirectory: false,
};

afterEach(() => {
  jest.clearAllMocks();
});

test('renders FileInput component', () => {
  // Arrange

  render(
    <FileInput {...defaultProps}>
      <button>Upload</button>
    </FileInput>
  );

  const button = screen.getByRole('button', { name: /upload/i });
  // Act

  // Assert
  expect(button).toBeInTheDocument();
});

test('renders FileInputDragger component', () => {
  // Arrange
  render(<FileInput.Dragger {...defaultProps} />);

  // Act
  const button = screen.getByRole('button');

  // Assert
  expect(button).toBeInTheDocument();
});

test('disables input when isDisabled is true', () => {
  render(<FileInput {...defaultProps} isDisabled={true} />);

  const input = document.querySelector('input[name="file"]');
  expect(input).toBeDisabled();
});

test('supports multiple file uploads', () => {
  // Arrange
  render(<FileInput {...defaultProps} isMultiple={true} />);

  // Act
  const input = document.querySelector('input[name="file"]');

  // Assert
  expect(input).toHaveAttribute('multiple');
});

test('supports directory selection', () => {
  // Arrange
  render(<FileInput {...defaultProps} isDirectory={true} />);

  // Act
  const input = document.querySelector('input[name="file"]');

  // Assert
  expect(input).toHaveAttribute('directory');
});

test('applies custom styles', () => {
  // Arrange
  render(<FileInput {...defaultProps} className="custom-class" />);

  // Act
  const wrapper = document.querySelector('.ant-upload-wrapper');

  // Assert
  expect(wrapper).toHaveClass('custom-class');
});

test('applies disabled styles when isDisabled is true', () => {
  render(
    <FileInput.Dragger
      shouldShowUploadList={false}
      shouldOpenFileDialogOnClick={false}
      isMultiple={false}
      isDisabled={true}
      isDirectory={false}
      titleFile="Test Title"
      descriptionFile="Test Description"
    />
  );

  const wrapper = document.querySelector('.ant-upload-disabled');
  expect(wrapper).toBeInTheDocument();

  const title = screen.getByText('Test Title');
  const description = screen.getByText('Test Description');

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('input unmounts without errors', () => {
  const { unmount } = render(<FileInput {...defaultProps} />);

  expect(() => unmount()).not.toThrow();
});
