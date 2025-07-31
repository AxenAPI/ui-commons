import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { NSkeleton } from './models';
import { Skeleton } from './Skeleton';

export default {
  title: 'Axenix UI/Loading/Skeleton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
  component: Skeleton,
  tags: ['autodocs'],
} as Meta<typeof Skeleton>;

export const DefaultSkeleton = (argTypes: NSkeleton.TProps): ReactNode => {
  return (
    <div style={{ width: '100vh' }}>
      <Skeleton {...argTypes} />
    </div>
  );
};

DefaultSkeleton.args = {
  isActive: true,
  isLoading: true,
};
