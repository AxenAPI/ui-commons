import { ReactNode } from 'react';

import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FloatInput } from '../index.ts';
import { NInput } from '../models';

export default {
  title: 'Axenix UI/Form/Inputs/FloatInput',
  component: FloatInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: fn(),
  },
  args: { onClick: fn(), isAllowClear: true },
} as Meta<typeof FloatInput>;

export const SmallFloatInput = (argTypes: NInput.TProps): ReactNode => {
  return <FloatInput {...argTypes} />;
};

export const MiddleFloatInput = (argTypes: NInput.TProps): ReactNode => {
  return <FloatInput {...argTypes} />;
};

export const LargeFloatInput = (argTypes: NInput.TProps): ReactNode => {
  return <FloatInput {...argTypes} />;
};

SmallFloatInput.args = { size: 'small', placeholder: 'Введите email', title: 'email' };

MiddleFloatInput.args = { title: 'email', placeholder: 'Введите email' };

LargeFloatInput.args = { size: 'large', placeholder: 'Введите email', title: 'email' };
