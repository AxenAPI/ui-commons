import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { ButtonSkeleton } from './ButtonSkeleton';
import { NButtonSkeleton } from './models';

export default {
  title: 'Axenix UI/Loading/Skeleton/ButtonSkeleton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: { control: 'boolean' },
  },
  component: ButtonSkeleton,
  tags: ['autodocs'],
} as Meta<typeof ButtonSkeleton>;

export const DefaultButton = (argTypes: NButtonSkeleton.TProps): ReactNode => {
  return <ButtonSkeleton {...argTypes} />;
};

DefaultButton.args = {
  isActive: false,
};
