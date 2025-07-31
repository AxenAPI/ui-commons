import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Radio } from './Radio';

describe('Radio component', () => {
  it('renders the radio button with the correct label', () => {
    //Arrange
    const { getByText } = render(<Radio>Test Radio</Radio>);

    //Assert
    expect(getByText('Test Radio')).toBeInTheDocument();
  });

  it('renders the radio button with the correct name', () => {
    //Arrange
    const { getByRole } = render(<Radio name="test-radio" />);
    const radioButton = getByRole('radio');

    //Assert
    expect(radioButton).toHaveAttribute('name', 'test-radio');
  });

  it('renders the radio button with the correct value', () => {
    //Arrange
    const { getByRole } = render(<Radio value="test-value" />);
    const radioButton = getByRole('radio');

    //Assert
    expect(radioButton).toHaveAttribute('value', 'test-value');
  });

  it('renders with checked attributes', () => {
    //Arrange
    const { getByRole } = render(<Radio isChecked />);
    const radioButton = getByRole('radio');
    const container = radioButton.parentElement;

    //Assert
    expect(container).toHaveClass('ant-radio-checked');
  });

  it('calls the onChange callback when the radio button is clicked', async () => {
    //Arrange
    const onChangeMock = jest.fn();
    const { getByRole } = render(<Radio onChange={onChangeMock} />);
    const radioButton = getByRole('radio');

    //Act
    await userEvent.click(radioButton);

    //Assert
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('unmounts without errors', () => {
    //Arrange
    const { unmount } = render(<Radio title="Test Radio" />);

    //Assert
    expect(() => unmount()).not.toThrow();
  });
});
