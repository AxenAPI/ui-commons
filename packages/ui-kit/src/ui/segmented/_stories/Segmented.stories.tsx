import { ReactNode } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconLayoutKanban, IconList } from '@tabler/icons-react';

import { SELECT_SIZES } from '../consts.ts';
import { NSegmented } from '../models';
import { Segmented } from '../Segmented';

export default {
  title: 'Axenix UI/Segmented/Segmented',
  args: {
    onChange: fn(),
  },
  argTypes: {
    onChange: fn(),
    options: { control: 'object' },
    block: { control: 'boolean' },
    defaultValue: { control: 'object' },
    isDisabled: { control: 'boolean' },
  },
  component: Segmented,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Segmented>;

export const Default = (argTypes: NSegmented.TProps): ReactNode => {
  return <Segmented {...argTypes} />;
};

export const Block = (argTypes: NSegmented.TProps): ReactNode => {
  return <Segmented {...argTypes} />;
};

export const Disabled = (argTypes: NSegmented.TProps): ReactNode => {
  return <Segmented {...argTypes} />;
};

export const WithIcon = (argTypes: NSegmented.TProps): ReactNode => {
  return <Segmented {...argTypes} />;
};

export const Sizes = (argTypes: NSegmented.TProps): ReactNode => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
      {SELECT_SIZES.map(size => (
        <Segmented key={size} {...argTypes} size={size} />
      ))}
    </div>
  );
};

Default.args = {
  options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'],
};

Block.args = {
  ...Default.args,
  block: true,
};

Disabled.args = {
  options: [
    'Daily',
    { label: 'Weekly', value: 'Weekly', disabled: true },
    'Monthly',
    { label: 'Quarterly', value: 'Quarterly', disabled: true },
    'Yearly',
  ],
};

WithIcon.args = {
  options: [
    { label: 'List', value: 'List', icon: <IconList /> },
    { label: 'Kanban', value: 'Kanban', icon: <IconLayoutKanban /> },
  ],
};

Sizes.args = {
  ...Default.args,
};
