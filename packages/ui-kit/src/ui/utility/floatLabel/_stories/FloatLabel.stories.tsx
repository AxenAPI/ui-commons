import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { SizeType } from 'antd/es/config-provider/SizeContext';

import { InputNumber } from '@/ui/form';

import { FloatLabel, TProps } from '../index';

export default {
  title: 'Axenix UI/FloatLabel/FloatLabel',
  component: FloatLabel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    children: { control: 'object' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    value: { control: 'object' },
  },
} as Meta<typeof FloatLabel>;

export const FloatingLabel: StoryFn<TProps<number, SizeType>> = args => {
  const [value, setValue] = useState<number | string | null>(null);

  return (
    <FloatLabel {...args} title="номер" placeholder="Введите номер">
      <InputNumber style={{ width: 200 }} onChange={val => setValue(val)} value={value} size="large" />
    </FloatLabel>
  );
};
FloatingLabel.storyName = 'Float label';
