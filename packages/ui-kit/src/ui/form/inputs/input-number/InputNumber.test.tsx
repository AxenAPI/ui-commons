import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { InputNumber } from './InputNumber';
import { TInputNumberProps } from './models';

const renderInput = (props?: TInputNumberProps, dataTestId?: string) => {
  return render(<InputNumber {...props} data-testid={dataTestId} />);
};

describe('InputNumber component', () => {
  it('renders correctly', () => {
    renderInput();
  });

  it('accepts and displays input value', async () => {
    const { getByRole } = renderInput();
    const input = getByRole('spinbutton') as HTMLInputElement;
    if (input) {
      fireEvent.change(input, { target: { value: '10' } });
      await waitFor(() => expect(input.value).toBe('10'));
    }
  });

  it('calls onChange callback when value changes', () => {
    const onChange = jest.fn();
    const { getByRole } = renderInput({ onChange });
    const input = getByRole('spinbutton');

    fireEvent.change(input, { target: { value: '20' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders with custom class', () => {
    const props = {
      value: 10,
      className: 'custom-class',
    };
    const { container } = renderInput({ ...props });

    expect(container.querySelector('.custom-class')).not.toBeNull();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByTestId } = renderInput({ disabled: true }, 'input-number');
    const input = getByTestId('input-number');

    expect(input).toHaveProperty('disabled', true);
  });

  it('is read-only when readOnly prop is true', () => {
    const { getByTestId } = renderInput({ readOnly: true }, 'input-number');
    const input = getByTestId('input-number');

    expect(input).toHaveProperty('readOnly', true);
  });

  it('renders with correct value when value prop changes', () => {
    const { rerender, getByTestId } = renderInput({ value: 10 }, 'input-number');
    const input = getByTestId('input-number');

    expect(input).toHaveProperty('value', '10');

    rerender(<InputNumber data-testid="input-number" value={20} />);

    expect(input).toHaveProperty('value', '20');
  });

  test('input unmounts without errors', () => {
    const { unmount } = renderInput();

    expect(() => unmount()).not.toThrow();
  });

  // Дополнительные тесты на новый функционал

  it('hides controls when controls is false', () => {
    const { container } = renderInput({ controls: false });
    const controlsElement = container.querySelector('.ant-input-number-handler-wrap');
    expect(controlsElement).toBeNull();
  });

  it('renders with different sizes', () => {
    const { container } = renderInput({ size: 'large' });
    const inputNumber = container.querySelector('.ant-input-number-lg');
    expect(inputNumber).not.toBeNull();
  });

  it('accepts min and max values', () => {
    const { getByRole } = renderInput({ min: 0, max: 100 });
    const input = getByRole('spinbutton');
    expect(input.getAttribute('aria-valuemin')).toBe('0');
    expect(input.getAttribute('aria-valuemax')).toBe('100');
  });

  it('supports step increment', () => {
    const { getByRole } = renderInput({ step: 5 });
    const input = getByRole('spinbutton');
    expect(input.getAttribute('step')).toBe('5');
  });

  it('handles large numbers formatting', async () => {
    const { getByRole } = renderInput({ value: 12345 });
    const input = getByRole('spinbutton') as HTMLInputElement;

    // Проверяем что значение корректно отображается с разделителем тысяч
    expect(input.value).toBe('12 345');
  });

  it('renders floating label when floatLabel props is true', () => {
    const { container } = renderInput({ floatLabel: true });
    const labelElement = container.querySelector('.label');
    expect(labelElement).toBeInTheDocument();
  });
});
