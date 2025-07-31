import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { ImageSkeleton } from './ImageSkeleton';
import { NImageSkeleton } from './models';

export default {
  title: 'Axenix UI/Loading/Skeleton/ImageSkeleton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: { control: 'boolean' },
  },
  component: ImageSkeleton,
  tags: ['autodocs'],
} as Meta<typeof ImageSkeleton>;

export const DefaultImage = (argTypes: NImageSkeleton.TProps): ReactNode => {
  return <ImageSkeleton {...argTypes} />;
};

DefaultImage.storyName = 'Default image';
DefaultImage.args = {
  isActive: false,
};
