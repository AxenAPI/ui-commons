import { Meta, StoryFn } from '@storybook/react';

import { Flex } from '../Flex';
import { NFlex } from '../models';

const Template: StoryFn<NFlex.TProps> = args => (
  <Flex {...args}>
    <div style={{ backgroundColor: 'blue', height: '100px', width: '100px' }} />
    <div style={{ backgroundColor: 'green', height: '100px', width: '100px' }} />
    <div style={{ backgroundColor: 'red', height: '100px', width: '100px' }} />
  </Flex>
);

const meta: Meta<NFlex.TProps> = {
  title: 'Axenix UI/Flex/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
    },
    className: { control: 'text' },
    flex: { control: 'text' },
    gap: { control: 'text' },
    justify: {
      control: 'select',
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    },
    prefixCls: { control: 'text' },
    style: { control: 'object' },
    vertical: { control: 'boolean' },
    wrap: { control: 'text' },
  },
  args: {
    style: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '15px',
      width: '800px',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;

export const Default = Template.bind({});
