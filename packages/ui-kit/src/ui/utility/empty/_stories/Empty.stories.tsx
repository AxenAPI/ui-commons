import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { Empty, TProps } from '../index';

export default {
  title: 'Axenix UI/Empty/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    description: { control: 'text' },
    image: { control: 'object' },
    imageStyle: { control: 'text' },
  },
} as Meta<typeof Empty>;

export const DefaultEmpty = (argTypes: TProps): ReactNode => {
  return <Empty {...argTypes} />;
};
DefaultEmpty.storyName = 'Default empty';
