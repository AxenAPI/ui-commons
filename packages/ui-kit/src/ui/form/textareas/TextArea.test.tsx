import { createRef } from 'react';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextAreaRef } from 'antd/es/input/TextArea';

import { NTextArea } from './models';
import { TextArea } from './TextArea';

const renderTextArea = (props: NTextArea.TProps = {}) => {
  return render(<TextArea {...props} />);
};

describe('/ui/form/textareas/TextArea.tsx', () => {
  test('render with placeholder', () => {
    renderTextArea({ placeholder: 'Введите значение' });

    expect(screen.getByPlaceholderText('Введите значение')).toBeInTheDocument();
  });

  test('render with passed value', () => {
    renderTextArea({ placeholder: 'Введите значение', value: 'Заданное значение' });

    expect(screen.getByDisplayValue('Заданное значение')).toBeInTheDocument();
  });

  test('calls onFocus when the field is focused', async () => {
    const onFocus = jest.fn();

    renderTextArea({ placeholder: 'Введите значение', onFocus });

    await userEvent.click(screen.getByPlaceholderText('Введите значение'));

    waitFor(() => expect(onFocus).toHaveBeenCalledTimes(1));
  });

  test('calls onBlur when focus is lost', async () => {
    const onBlur = jest.fn();

    renderTextArea({ placeholder: 'Введите значение', onBlur });

    await userEvent.click(screen.getByPlaceholderText('Введите значение'));
    await userEvent.tab();

    waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  test('calls onChange when the value changes', async () => {
    const onChange = jest.fn();

    renderTextArea({ placeholder: 'Введите значение', onChange });

    await userEvent.type(screen.getByPlaceholderText('Введите значение'), 'Новое значение');

    waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });

  test('render disabled if passed isDisabled=true', () => {
    renderTextArea({ placeholder: 'Введите значение', isDisabled: true });

    expect(screen.getByPlaceholderText('Введите значение')).toBeDisabled();
  });

  test('render with inputPosition class if passed isTopContent=true', () => {
    renderTextArea({ placeholder: 'Введите значение', isTopContent: true });

    expect(screen.getByPlaceholderText('Введите значение')).toHaveClass('inputPosition');
  });

  test('unmounts textArea component correctly', () => {
    const { unmount } = renderTextArea({ placeholder: 'Введите значение' });

    expect(() => unmount()).not.toThrow();
  });

  test('параметр ref передается корректно', () => {
    const ref = createRef<TextAreaRef>();
    render(<TextArea placeholder="Введите значение" ref={ref} />);
    expect(ref.current).toBeInstanceOf(Object);
  });

  test('параметр ref вызывает методы textarea', () => {
    const ref = createRef<TextAreaRef>();
    render(<TextArea placeholder="Введите значение" ref={ref} />);
    const textarea = ref.current;
    expect(textarea?.focus).toBeInstanceOf(Function);
    expect(textarea?.blur).toBeInstanceOf(Function);
  });

  test('параметр ref работает с методами AntdInput.TextArea', () => {
    const ref = createRef<TextAreaRef>();
    render(<TextArea placeholder="Введите значение" ref={ref} />);
    const textarea = ref.current;
    expect(textarea?.focus).toBeInstanceOf(Function);
    expect(textarea?.blur).toBeInstanceOf(Function);
  });

  test('renders floating label when floatLabel props is true', () => {
    const ref = createRef<TextAreaRef>();
    const { container } = render(<TextArea placeholder="Введите значение" ref={ref} floatLabel />);
    const labelElement = container.querySelector('.label');
    expect(labelElement).toBeInTheDocument();
  });
});
