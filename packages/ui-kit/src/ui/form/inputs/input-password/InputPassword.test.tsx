import { IconMaximize, IconMaximizeOff } from '@tabler/icons-react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NInput } from '../models';
import { InputPassword } from './InputPassword';

const defaultProps: NInput.TInputPasswordProps = {
  placeholder: 'inputPassword',
};

const renderInput = (props?: Partial<NInput.TInputPasswordProps>) => {
  return render(<InputPassword {...defaultProps} {...props} />);
};

describe('/ui/form/inputs/InputPassword.tsx', () => {
  test('input exist', () => {
    renderInput();
    expect(screen.getByPlaceholderText('inputPassword')).toBeInTheDocument();
  });

  test('input disable on prop', () => {
    renderInput({ isDisabled: true });
    expect(screen.getByPlaceholderText('inputPassword')).toBeDisabled();
  });

  test('input controls max length', async () => {
    renderInput({ maxLength: 3 });
    const input = screen.getByPlaceholderText('inputPassword');
    expect(input).toHaveAttribute('maxlength', '3');

    await userEvent.type(input, `1234`);
    expect(input).toHaveValue('123');
  });

  test('input applies statuses', () => {
    renderInput({ placeholder: 'errorInput', status: 'error' });
    renderInput({ placeholder: 'warningInput', status: 'warning' });
    const errorInputWrap = screen.getByPlaceholderText('errorInput').parentElement;
    const warningInputWrap = screen.getByPlaceholderText('warningInput').parentElement;

    expect(errorInputWrap).toHaveClass('ant-input-status-error');
    expect(warningInputWrap).toHaveClass('ant-input-status-warning');
  });

  test('input type password by default', () => {
    renderInput();
    const input = screen.getByPlaceholderText('inputPassword');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('input type changes on visibility change', () => {
    renderInput();

    const input = screen.getByPlaceholderText('inputPassword');
    expect(input).toHaveAttribute('type', 'password');

    const visibilityToggle = input.parentElement?.getElementsByClassName('ant-input-password-icon')?.[0];
    expect(visibilityToggle).toBeInTheDocument();

    visibilityToggle && fireEvent.click(visibilityToggle);
    expect(input).toHaveAttribute('type', 'text');
  });

  test('custom styles applies on inputs wrap', () => {
    renderInput({ style: { margin: '10px' } });
    const inputWrap = screen.getByPlaceholderText('inputPassword').parentElement;
    expect(inputWrap).toHaveStyle({ margin: '10px' });
  });

  test('custom classname applies on inputs wrap', () => {
    renderInput({ className: 'custom-class' });
    const inputWrap = screen.getByPlaceholderText('inputPassword').parentElement;
    expect(inputWrap).toHaveClass('custom-class');
  });

  test('custom icons render in visibility button', () => {
    renderInput({
      iconRender: (isVisible: boolean) => (isVisible ? <IconMaximize /> : <IconMaximizeOff />),
    });
    const input = screen.getByPlaceholderText('inputPassword');
    const visibileStateIcon = input.parentElement?.getElementsByClassName('tabler-icon-maximize-off')?.[0];

    expect(visibileStateIcon).toBeInTheDocument();

    visibileStateIcon && fireEvent.click(visibileStateIcon);

    const invisibileStateIcon = input.parentElement?.getElementsByClassName('tabler-icon-maximize')?.[0];
    expect(invisibileStateIcon).toBeInTheDocument();
  });

  test('handles onVisibleChange fn when visibility change button is clicked', async () => {
    const handleVisibleChange = jest.fn();
    renderInput({ visibilityToggle: { onVisibleChange: handleVisibleChange } });

    const input = screen.getByPlaceholderText('inputPassword');
    const visibilityToggle = input.parentElement?.getElementsByClassName('ant-input-password-icon')?.[0];

    if (visibilityToggle) {
      await userEvent.click(visibilityToggle);
      expect(handleVisibleChange).toHaveBeenCalledTimes(1);
    }
  });

  test('input unmounts without errors', () => {
    const { unmount } = renderInput();
    expect(() => unmount()).not.toThrow();
  });

  test('renders floating label when floatLabel props is true', () => {
    const { container } = renderInput({ floatLabel: true });
    const labelElement = container.querySelector('.label');
    expect(labelElement).toBeInTheDocument();
  });
});
