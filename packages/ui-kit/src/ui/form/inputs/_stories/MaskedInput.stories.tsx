import { ReactNode } from 'react';

import type { Meta } from '@storybook/react';

import { MaskedInput } from '../MaskedInput';
import { NInput } from '../models';

const meta = {
  title: 'Axenix UI/Form/Inputs/MaskedInput',
  component: MaskedInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mask: { control: 'object' },
    placeholder: { control: 'text' },
  },
  args: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    placeholder: 'Введите индекс',
  },
} as Meta<typeof MaskedInput>;

export default meta;

// Базовая история с маской в виде массива
export const DefaultInput = (argTypes: NInput.TMaskedProps): ReactNode => {
  return <MaskedInput {...argTypes} />;
};

// История с кастомной маской в виде массива
export const CustomMaskInput = (argTypes: NInput.TMaskedProps): ReactNode => {
  return <MaskedInput {...argTypes} />;
};

CustomMaskInput.args = {
  mask: ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  placeholder: 'Введите номер телефона',
};

// История с динамической маской в виде функции
export const DynamicMaskInput = (argTypes: NInput.TMaskedProps): ReactNode => {
  return <MaskedInput {...argTypes} />;
};

DynamicMaskInput.args = {
  mask: (value: string) => {
    if (value.startsWith('+')) {
      return ['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    }
    return ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  },
  placeholder: 'Введите номер телефона (+7...)',
};

// История с маской для ввода даты
export const DateMaskInput = (argTypes: NInput.TMaskedProps): ReactNode => {
  return <MaskedInput {...argTypes} />;
};

DateMaskInput.args = {
  mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  placeholder: 'Введите дату (дд/мм/гггг)',
};
