import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MaskedInput } from './MaskedInput';
import { NInput } from './models';

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
const phoneMaskPlusSign = ['+', '7', ' ', ...phoneMask];
const dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
const numberMask = [/\d/];

const defaultProps: NInput.TMaskedProps = {
  placeholder: 'maskedInput',
  mask: numberMask,
};

const renderInput = (props?: Partial<NInput.TMaskedProps>) => {
  return render(<MaskedInput {...defaultProps} {...props} />);
};

describe('/ui/form/inputs/MaskedInput.tsx', () => {
  test('masked input exist', () => {
    renderInput();
    expect(screen.getByPlaceholderText('maskedInput')).toBeInTheDocument();
  });

  test('input mask control value length', () => {
    renderInput({ value: '123' });
    const maskedInput = screen.getByPlaceholderText('maskedInput');
    expect(maskedInput).toHaveValue('1');
  });

  test('mask prevent user from typing invalid value', () => {
    renderInput({ value: 'abcDE!/.[$' });
    const maskedInput = screen.getByPlaceholderText('maskedInput');
    expect(maskedInput).toHaveValue('');
  });

  test('phone mask applies correctly', () => {
    renderInput({
      value: '9991113232',
      mask: phoneMaskPlusSign,
    });
    const maskedInput = screen.getByPlaceholderText('maskedInput');
    expect(maskedInput).toHaveValue('+7 (999) 111-32-32');
  });

  test('date mask applies correctly', () => {
    renderInput({
      value: '05032025',
      mask: dateMask,
    });
    const maskedInput = screen.getByPlaceholderText('maskedInput');
    expect(maskedInput).toHaveValue('05.03.2025');
  });

  test('dynamic mask applies correctly', () => {
    const dynamicMask = (value: string) => (value.startsWith('+') ? phoneMaskPlusSign : phoneMask);

    renderInput({
      placeholder: 'startsWithNumber',
      value: '9991113232',
      mask: dynamicMask,
    });
    renderInput({
      placeholder: 'startsWithPlusSign',
      value: '+9991113232',
      mask: dynamicMask,
    });
    const startsWithNumberInput = screen.getByPlaceholderText('startsWithNumber');
    const startsWithPlusSignInput = screen.getByPlaceholderText('startsWithPlusSign');

    expect(startsWithNumberInput).toHaveValue('(999) 111-32-32');
    expect(startsWithPlusSignInput).toHaveValue('+7 (999) 111-32-32');
  });

  test('input value is correctly deleted using backspace', async () => {
    const initialValue = '9991113232';
    const expectedValue = '+7 (999) 111-32-32';

    renderInput({
      value: initialValue,
      mask: phoneMaskPlusSign,
    });

    const maskedInput = screen.getByPlaceholderText('maskedInput');
    expect(maskedInput).toHaveValue(expectedValue);

    // Simulate backspace keydown event to delete the value
    await userEvent.type(maskedInput, `{backspace>${expectedValue.length}/}`);

    expect(maskedInput).toHaveValue('');
  });

  test('phone mask applies again correctly after deletion', async () => {
    const initialValue = '9991113232';
    const expectedValue = '+7 (999) 111-32-32';

    renderInput({
      value: initialValue,
      mask: phoneMaskPlusSign,
    });

    const maskedInput = screen.getByPlaceholderText('maskedInput');
    expect(maskedInput).toHaveValue(expectedValue);

    await userEvent.type(maskedInput, `{backspace>${expectedValue.length}/}`);
    // Simulate user type initial value again
    await userEvent.type(maskedInput, initialValue);

    expect(maskedInput).toHaveValue(expectedValue);
  });

  test('phone mask applies correctly if user type invalid character', async () => {
    renderInput({
      value: '',
      mask: phoneMaskPlusSign,
    });

    const maskedInput = screen.getByPlaceholderText('maskedInput');

    // Simulate user type invalid character
    await userEvent.type(maskedInput, `abc`);

    expect(['', '+7 (']).toContain(maskedInput.getAttribute('value'));
  });

  test('phone mask applies correctly after typing invalid character', async () => {
    const phoneNumber = '9991113232';
    const expectedValue = '+7 (999) 111-32-32';

    renderInput({
      value: '',
      mask: phoneMaskPlusSign,
    });

    const maskedInput = screen.getByPlaceholderText('maskedInput');

    // Simulate user type invalid character
    await userEvent.type(maskedInput, `abc`);
    // Simulate user type phone number
    await userEvent.type(maskedInput, phoneNumber);

    expect(maskedInput).toHaveValue(expectedValue);
  });

  test('input unmounts without errors', () => {
    const { unmount } = renderInput();

    expect(() => unmount()).not.toThrow();
  });
});
