import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MaskedAutoComplete } from './MaskedAutoComplete';
import { NAutoComplete } from './models';

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
const phoneMaskPlusSign = ['+', '7', ' ', ...phoneMask];
const dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
const numberMask = [/\d/];

const defaultProps: NAutoComplete.TMaskedProps = {
  placeholder: 'maskedAutoComplete',
  mask: numberMask,
};

const renderMaskedAutoComplete = (props?: Partial<NAutoComplete.TMaskedProps>) => {
  return render(<MaskedAutoComplete {...defaultProps} {...props} />);
};

describe('/ui/form/auto-complete/MaskedAutoComplete.tsx', () => {
  test('masked maskedAutoComplete exist', () => {
    const { container } = renderMaskedAutoComplete();
    expect(container.querySelector('.ant-select-auto-complete')).toBeInTheDocument();
  });

  test('maskedAutoComplete mask control value length', () => {
    const { container } = renderMaskedAutoComplete({ value: '123' });
    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    expect(maskedInput).toHaveValue('1');
  });

  test('mask prevent user from typing invalid value', () => {
    const { container } = renderMaskedAutoComplete({ value: 'abcDE!/.[$' });
    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    expect(maskedInput).toHaveValue('');
  });

  test('phone mask applies correctly', () => {
    const { container } = renderMaskedAutoComplete({
      value: '9991113232',
      mask: phoneMaskPlusSign,
    });
    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    expect(maskedInput).toHaveValue('+7 (999) 111-32-32');
  });

  test('date mask applies correctly', () => {
    const { container } = renderMaskedAutoComplete({
      value: '05032025',
      mask: dateMask,
    });
    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    expect(maskedInput).toHaveValue('05.03.2025');
  });

  test('dynamic mask applies correctly', () => {
    const dynamicMask = (value: string) => (value.startsWith('+') ? phoneMaskPlusSign : phoneMask);

    const { container: containerStartsWithNumber } = renderMaskedAutoComplete({
      value: '9991113232',
      mask: dynamicMask,
    });

    const startsWithNumberMaskedAutoComplete = containerStartsWithNumber.querySelector('.ant-select-auto-complete');
    const startsWithNumberMaskedInput = startsWithNumberMaskedAutoComplete?.querySelector('input');
    expect(startsWithNumberMaskedInput).toHaveValue('(999) 111-32-32');

    const { container: containerStartsWithPlusSign } = renderMaskedAutoComplete({
      placeholder: 'startsWithPlusSign',
      value: '+9991113232',
      mask: dynamicMask,
    });
    const startsWithPlusSignMaskedAutoComplete = containerStartsWithPlusSign.querySelector('.ant-select-auto-complete');
    const startsWithPlusSignMaskedInput = startsWithPlusSignMaskedAutoComplete?.querySelector('input');
    expect(startsWithPlusSignMaskedInput).toHaveValue('+7 (999) 111-32-32');
  });

  test('maskedAutoComplete value is correctly deleted using backspace', async () => {
    const initialValue = '9991113232';
    const expectedValue = '+7 (999) 111-32-32';

    const { container } = renderMaskedAutoComplete({
      value: initialValue,
      mask: phoneMaskPlusSign,
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    expect(maskedInput).toHaveValue(expectedValue);

    if (maskedInput) {
      await userEvent.type(maskedInput, `{backspace>${expectedValue.length}/}`);
    }
    expect(maskedInput).toHaveValue('');
  });

  test('phone mask applies again correctly after deletion', async () => {
    const initialValue = '9991113232';
    const expectedValue = '+7 (999) 111-32-32';

    const { container } = renderMaskedAutoComplete({
      value: initialValue,
      mask: phoneMaskPlusSign,
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    expect(maskedInput).toHaveValue(expectedValue);

    if (maskedInput) {
      await userEvent.type(maskedInput, `{backspace>${expectedValue.length}/}`);
      await userEvent.type(maskedInput, initialValue);
    }

    expect(maskedInput).toHaveValue(expectedValue);
  });

  test('phone mask applies correctly if user type invalid character', async () => {
    const { container } = renderMaskedAutoComplete({
      value: '',
      mask: phoneMaskPlusSign,
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    if (maskedInput) {
      await userEvent.type(maskedInput, `abc`);
      expect(['', '+7 (']).toContain(maskedInput.getAttribute('value'));
    }
  });

  test('phone mask applies correctly after typing invalid character', async () => {
    const phoneNumber = '9991113232';
    const expectedValue = '+7 (999) 111-32-32';

    const { container } = renderMaskedAutoComplete({
      value: '',
      mask: phoneMaskPlusSign,
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    if (maskedInput) {
      await userEvent.type(maskedInput, `abc`);
      await userEvent.type(maskedInput, phoneNumber);
    }
    expect(maskedInput).toHaveValue(expectedValue);
  });

  test('dropdown renders if options passed as props', async () => {
    const { container } = renderMaskedAutoComplete({
      value: '',
      mask: phoneMaskPlusSign,
      options: [{ value: '+7' }, { value: '928' }],
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    maskedInput && (await userEvent.click(maskedInput));

    const dropdown = document.querySelector('.ant-select-dropdown');
    expect(dropdown).toBeInTheDocument();
  });

  test('dropdown change visibility after input click', async () => {
    const { container } = renderMaskedAutoComplete({
      value: '',
      mask: phoneMaskPlusSign,
      options: [{ value: '+7' }, { value: '928' }],
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    maskedInput && (await userEvent.click(maskedInput));

    const dropdown = document.querySelector('.ant-select-dropdown');
    expect(dropdown).not.toHaveClass('ant-select-dropdown-hidden');
  });

  test('dropdown options renders correctly', async () => {
    const { container } = renderMaskedAutoComplete({
      value: '',
      mask: phoneMaskPlusSign,
      options: [{ value: '+7' }, { value: '928' }],
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    maskedInput && (await userEvent.click(maskedInput));

    const dropdown = document.querySelector('.ant-select-dropdown');
    const options = dropdown?.querySelectorAll('.ant-select-item-option-content');
    const optionValues = Array.from(options || []).map(el => el.textContent);
    expect(optionValues).toEqual(['+7', '928']);
  });

  test('click on dropdown option leads value to be correctly applied to input', async () => {
    const { container } = renderMaskedAutoComplete({
      value: '',
      mask: phoneMaskPlusSign,
      options: [{ value: '+7' }, { value: '928' }],
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    maskedInput && (await userEvent.click(maskedInput));

    const dropdown = document.querySelector('.ant-select-dropdown');
    const firstOption = dropdown?.querySelectorAll('.ant-select-item-option-content')?.[0];
    firstOption && (await userEvent.click(firstOption));
    expect(maskedInput).toHaveValue('+7');
  });

  test('callback fn onSelect to have been called on option select', async () => {
    const handleSelect = jest.fn();

    const { container } = renderMaskedAutoComplete({
      value: '',
      mask: phoneMaskPlusSign,
      options: [{ value: '+7' }, { value: '928' }],
      onSelect: handleSelect,
    });

    const maskedAutoComplete = container.querySelector('.ant-select-auto-complete');
    const maskedInput = maskedAutoComplete?.querySelector('input');
    maskedInput && (await userEvent.click(maskedInput));

    const dropdown = document.querySelector('.ant-select-dropdown');
    const firstOption = dropdown?.querySelectorAll('.ant-select-item-option-content')?.[0];
    firstOption && (await userEvent.click(firstOption));
    expect(handleSelect).toHaveBeenCalled();
  });

  test('maskedAutoComplete unmounts without errors', () => {
    const { unmount } = renderMaskedAutoComplete();

    expect(() => unmount()).not.toThrow();
  });
});
