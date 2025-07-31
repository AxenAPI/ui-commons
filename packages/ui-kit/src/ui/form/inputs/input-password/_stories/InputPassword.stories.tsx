import { ReactNode, useState } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconMaximize, IconMaximizeOff } from '@tabler/icons-react';

import { NInput } from '@/ui';

import { InputPassword } from '../InputPassword';

const meta = {
  title: 'Axenix UI/Form/Inputs/InputPassword',
  component: InputPassword,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
    isDisabled: { control: 'boolean' },
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'select' },
    },
    visibilityToggle: { control: 'boolean' },
    onClick: fn(),
  },
  args: { onClick: fn(), visibilityToggle: { onVisibleChange: fn() } },
} satisfies Meta<typeof InputPassword>;

export const Default = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

export const Disabled = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

export const Small = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

export const Middle = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

export const Large = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

export const WithoutToggle = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

export const CustomIcon = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

export const VisibilityControls = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  return <InputPassword {...argTypes} />;
};

type TValuePropType = NInput.TInputPasswordProps['value'];

export const FloatingLabel = (argTypes: NInput.TInputPasswordProps): ReactNode => {
  const [value, setValue] = useState<TValuePropType>(undefined);

  return (
    <InputPassword title="пароль" floatLabel onChange={e => setValue(e.target.value)} value={value} {...argTypes} />
  );
};

Default.args = { placeholder: 'Введите пароль' };
Disabled.args = { ...Default.args, isDisabled: true };
Small.args = { ...Default.args, size: 'small' };
Middle.args = { ...Default.args, size: 'middle' };
Large.args = { ...Default.args, size: 'large' };
WithoutToggle.args = { ...Default.args, visibilityToggle: false };
CustomIcon.args = {
  ...Default.args,
  iconRender: (isVisible: boolean) =>
    isVisible ? (
      <IconMaximize style={{ width: '1rem', height: '1rem' }} />
    ) : (
      <IconMaximizeOff style={{ width: '1rem', height: '1rem' }} />
    ),
};
VisibilityControls.args = {
  ...Default.args,
  visibilityToggle: {
    onVisibleChange: (isVisible: boolean) =>
      alert(`Состояние InputPassword: ${isVisible ? 'password visible' : 'password invisible'}`),
  },
};

export default meta;
