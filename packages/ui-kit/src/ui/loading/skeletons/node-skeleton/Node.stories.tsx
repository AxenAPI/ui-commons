import { ReactNode } from 'react';

import { Meta } from '@storybook/react';

import { NNodeSkeleton } from './models';
import { NodeSkeleton } from './NodeSkeleton';

export default {
  title: 'Axenix UI/Loading/Skeleton/NodeSkeleton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isActive: { control: 'boolean' },
    isFullSize: { control: 'boolean' },
    children: { control: 'text' },
  },
  component: NodeSkeleton,
  tags: ['autodocs'],
} as Meta<typeof NodeSkeleton>;

export const DefaultNode = (argTypes: NNodeSkeleton.TProps): ReactNode => {
  return <NodeSkeleton {...argTypes} />;
};

DefaultNode.args = {
  isActive: false,
  isFullSize: false,
  children: 'Children',
};
