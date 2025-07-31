import { ReactNode, useState } from 'react';

import type { Meta } from '@storybook/react';

import { InputNumber } from '../InputNumber';
import { TInputNumberProps } from '../models';

const meta = {
  title: 'Axenix UI/Form/Inputs/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currency: {
      control: 'select',
      options: [undefined, 'RUB', 'USD', 'EUR'],
    },
    currencyPosition: {
      control: 'select',
      options: ['prefix', 'suffix'],
    },
    decimalPlaces: {
      control: 'number',
      min: 0,
      max: 4,
    },
    thousandSeparator: {
      control: 'text',
    },
    decimalSeparator: {
      control: 'text',
    },
    controlArrows: {
      control: 'boolean',
    },
    floatLabel: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
  },
  args: {
    placeholder: 'Введите число',
    controlArrows: false,
    floatLabel: false,
    size: 'large',
  },
} as Meta<typeof InputNumber>;

export default meta;

// Базовый InputNumber.
export const DefaultInput = (args: TInputNumberProps): ReactNode => {
  const [value, setValue] = useState<number | string | null>(null);

  return <InputNumber {...args} value={value} onChange={val => setValue(val)} style={{ width: 200 }} />;
};

// InputNumber с контролами.
export const ControlsNumber = (args: TInputNumberProps): ReactNode => {
  const [value, setValue] = useState<number | string | null>(null);

  return (
    <InputNumber
      {...args}
      controlArrows={true}
      value={value}
      onChange={val => setValue(val)}
      placeholder="Введите число"
      style={{ width: 200 }}
    />
  );
};

// Валюта с суффиксом
export const PrefixInput = (args: TInputNumberProps): ReactNode => {
  const [value, setValue] = useState<number | string | null>(null);

  return (
    <InputNumber
      {...args}
      currency="RUB"
      currencyPosition="suffix"
      value={value}
      decimalPlaces={2}
      placeholder="Введите сумму в рублях"
      onChange={val => setValue(val)}
      style={{ width: 220 }}
    />
  );
};

// Валюта с префиксом
export const SuffixInput = (args: TInputNumberProps): ReactNode => {
  const [value, setValue] = useState<number | string | null>(null);

  return (
    <InputNumber
      {...args}
      currency="RUB"
      currencyPosition="prefix"
      value={value}
      decimalPlaces={2}
      placeholder="Введите сумму в рублях"
      onChange={val => setValue(val)}
      style={{ width: 220 }}
    />
  );
};

// Валюта без десятичных знаков
export const InputNoDecimals = (args: TInputNumberProps): ReactNode => {
  const [value, setValue] = useState<number | string | null>(null);

  return (
    <InputNumber
      {...args}
      currency="EUR"
      decimalPlaces={0}
      value={value}
      placeholder="Enter amount"
      onChange={val => setValue(val)}
      style={{ width: 200 }}
    />
  );
};

// С floating label
export const FloatingLabel = (args: TInputNumberProps): ReactNode => {
  const [value, setValue] = useState<number | string | null>(null);

  return (
    <InputNumber
      {...args}
      currency="RUB"
      floatLabel={true}
      title="Сумма в рублях"
      placeholder="Введите сумму"
      value={value}
      onChange={val => setValue(val)}
      style={{ width: 200 }}
    />
  );
};
