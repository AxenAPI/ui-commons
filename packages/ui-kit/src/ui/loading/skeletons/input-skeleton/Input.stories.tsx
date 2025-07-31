import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { InputSkeleton } from './InputSkeleton';
import { NInputSkeleton } from './models';

export default {
  title: 'Axenix UI/Loading/Skeleton/InputSkeleton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: { control: 'boolean' },
    isBlock: { control: 'boolean' },
  },
  component: InputSkeleton,
  tags: ['autodocs'],
} as Meta<typeof InputSkeleton>;

export const DefaultInput = (argTypes: NInputSkeleton.TProps): ReactNode => {
  return <InputSkeleton {...argTypes} />;
};

DefaultInput.args = {
  isActive: false,
  isBlock: false,
};
