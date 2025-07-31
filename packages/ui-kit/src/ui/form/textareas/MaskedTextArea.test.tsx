import { createRef } from 'react';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextAreaRef } from 'antd/es/input/TextArea';

import { MaskedTextArea } from './MaskedTextArea';
import { NTextArea } from './models';

const defaultProps = {
  mask: ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};
const renderMaskedTextArea = (props: Partial<NTextArea.TMaskedProps>, ref?: React.ForwardedRef<TextAreaRef>) => {
  return render(<MaskedTextArea {...defaultProps} {...props} ref={ref} />);
};

describe('/ui/form/textareas/TextArea.tsx', () => {
  test('render with placeholder', () => {
    renderMaskedTextArea({ placeholder: 'Введите значение' });

    expect(screen.getByPlaceholderText('Введите значение')).toBeInTheDocument();
  });

  test('render with passed value with mask applied', () => {
    renderMaskedTextArea({ placeholder: 'Введите значение', value: '9110001111' });

    expect(screen.getByDisplayValue('+7(911) 000-1111')).toBeInTheDocument();
  });

  test('calls onFocus when the field is focused', async () => {
    const onFocus = jest.fn();

    renderMaskedTextArea({ placeholder: 'Введите значение', onFocus });

    await userEvent.click(screen.getByPlaceholderText('Введите значение'));

    waitFor(() => expect(onFocus).toHaveBeenCalledTimes(1));
  });

  test('calls onBlur when focus is lost', async () => {
    const onBlur = jest.fn();

    renderMaskedTextArea({ placeholder: 'Введите значение', onBlur });

    await userEvent.click(screen.getByPlaceholderText('Введите значение'));
    await userEvent.tab();

    waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  test('calls onChange when the value changes', async () => {
    const onChange = jest.fn();

    renderMaskedTextArea({ placeholder: 'Введите значение', onChange });

    await userEvent.type(screen.getByPlaceholderText('Введите значение'), 'Новое значение');

    waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });

  test('render disabled if passed isDisabled=true', () => {
    renderMaskedTextArea({ placeholder: 'Введите значение', isDisabled: true });

    expect(screen.getByPlaceholderText('Введите значение')).toBeDisabled();
  });

  test('render with inputPosition class if passed isTopContent=true', () => {
    renderMaskedTextArea({ placeholder: 'Введите значение', isTopContent: true });

    expect(screen.getByPlaceholderText('Введите значение')).toHaveClass('inputPosition');
  });

  test('unmounts textArea component correctly', () => {
    const { unmount } = renderMaskedTextArea({ placeholder: 'Введите значение' });

    expect(() => unmount()).not.toThrow();
  });

  test('параметр ref передается корректно', () => {
    const ref = createRef<TextAreaRef>();
    renderMaskedTextArea({ placeholder: 'Введите значение' }, ref);
    expect(ref.current).toBeInstanceOf(Object);
  });

  test('параметр ref вызывает методы textarea', () => {
    const ref = createRef<TextAreaRef>();
    renderMaskedTextArea({ placeholder: 'Введите значение' }, ref);
    const textarea = ref.current;
    expect(textarea?.focus).toBeInstanceOf(Function);
    expect(textarea?.blur).toBeInstanceOf(Function);
  });

  test('параметр ref работает с методами AntdInput.TextArea', () => {
    const ref = createRef<TextAreaRef>();
    renderMaskedTextArea({ placeholder: 'Введите значение' }, ref);
    const textarea = ref.current;
    expect(textarea?.focus).toBeInstanceOf(Function);
    expect(textarea?.blur).toBeInstanceOf(Function);
  });
});
