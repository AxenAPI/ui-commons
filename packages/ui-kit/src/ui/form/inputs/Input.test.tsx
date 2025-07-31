import React, { LegacyRef } from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { InputRef } from 'antd';

import { Input } from './Input.tsx';
import { NInput } from './models';

const renderInput = (props?: NInput.TProps) => {
  return render(<Input {...props} />);
};

describe('/ui/form/inputs/Input.tsx', () => {
  test('input exist', () => {
    renderInput({ value: 'InputExist' });

    expect(screen.getByDisplayValue('InputExist')).toBeInTheDocument();
  });

  test('input disabled', () => {
    renderInput({ value: 'InputDisabled', isDisabled: true });

    expect(screen.getByDisplayValue('InputDisabled')).toBeDisabled();
  });

  test('input max length', () => {
    renderInput({ value: 'InputMaxLength', maxLength: 10 });

    expect(screen.getByDisplayValue('InputMaxLength')).toHaveAttribute('maxlength', '10');
  });

  test('input placeholder', () => {
    renderInput({ placeholder: 'InputPlaceholder' });

    expect(screen.getByPlaceholderText('InputPlaceholder')).toBeInTheDocument();
  });

  test('input error', () => {
    renderInput({ value: 'InputError', status: 'error' });

    expect(screen.getByDisplayValue('InputError')).toHaveClass('ant-input-status-error');
  });

  test('input warning', () => {
    renderInput({ value: 'InputWarning', status: 'warning' });

    expect(screen.getByDisplayValue('InputWarning')).toHaveClass('ant-input-status-warning');
  });

  test('input small', () => {
    renderInput({ value: 'InputSmall', size: 'small' });

    expect(screen.getByDisplayValue('InputSmall')).toHaveClass('ant-input-sm');
  });

  test('input large', () => {
    renderInput({ value: 'InputLarge', size: 'large' });

    expect(screen.getByDisplayValue('InputLarge')).toHaveClass('ant-input-lg');
  });

  test('input style', () => {
    renderInput({ value: 'InputStyle', style: { background: 'red', color: 'white', padding: '20px' } });

    expect(screen.getByDisplayValue('InputStyle')).toHaveStyle({
      backgroundColor: 'red',
      color: 'white',
      padding: '20px',
    });
  });

  test('input focus ref', () => {
    const InputFocus = () => {
      const inputRef: LegacyRef<InputRef> = React.createRef();

      const handleFocus = () => {
        inputRef.current?.focus();
      };

      return (
        <div>
          <Input ref={inputRef} type="text" />
          <button onClick={handleFocus}>Сфокусироваться</button>
        </div>
      );
    };

    const { getByRole, getByText } = render(<InputFocus />);

    const inputField = getByRole('textbox');
    const button = getByText('Сфокусироваться');

    fireEvent.click(button);

    expect(document.activeElement).toBe(inputField);
  });

  test('input unmounts without errors', () => {
    const { unmount } = renderInput();

    expect(() => unmount()).not.toThrow();
  });
});
