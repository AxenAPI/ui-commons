import { ReactNode } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button, Space } from 'antd';

import { Input } from '../Input';
import { NInput } from '../models';

export default {
  title: 'Axenix UI/Form/Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: fn(),
  },
  args: { onClick: fn(), isAllowClear: true },
} as Meta<typeof Input>;

export const DefaultInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const DisabledInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const ReadOnlyInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const ErrorInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input placeholder="Введите email" {...argTypes} />;
};

export const WarningInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const SmallInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const MiddleInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const LargeInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const CountingInput = (argTypes: NInput.TProps): ReactNode => {
  return <Input {...argTypes} />;
};

export const InputWithSpaceCompact = (): ReactNode => {
  return (
    <Space.Compact style={{ width: 300 }}>
      <Input placeholder="Введите email" />
      <Button type="primary">Отправить</Button>
    </Space.Compact>
  );
};

DisabledInput.args = { isDisabled: true };

ReadOnlyInput.args = { isReadOnly: true, value: 'Read Only value' };

ErrorInput.args = { status: 'error' };

WarningInput.args = { status: 'warning' };

SmallInput.args = { size: 'small' };

MiddleInput.args = { size: 'middle' };

LargeInput.args = { size: 'large' };

CountingInput.args = {
  maxLength: 10,
  showCount: true,
};
