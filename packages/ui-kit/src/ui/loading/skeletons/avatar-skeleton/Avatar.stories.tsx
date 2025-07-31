import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { AvatarSkeleton } from './AvatarSkeleton';
import { NAvatarSkeleton } from './models';

export default {
  title: 'Axenix UI/Loading/Skeleton/AvatarSkeleton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: { control: 'boolean' },
  },
  component: AvatarSkeleton,
  tags: ['autodocs'],
} as Meta<typeof AvatarSkeleton>;

export const DefaultAvatar = (argTypes: NAvatarSkeleton.TProps): ReactNode => {
  return <AvatarSkeleton {...argTypes} />;
};

DefaultAvatar.args = {
  isActive: false,
};
