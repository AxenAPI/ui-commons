import type { Meta, StoryFn } from '@storybook/react';
import { IconClock } from '@tabler/icons-react';

import { Avatar, Space } from 'antd';

import { Badge } from '../Badge';
import { NBadge } from '../models';

const meta: Meta<NBadge.TProps> = {
  title: 'Axenix UI/Badges/Badge',
  component: Badge,
  argTypes: {
    dot: { control: 'boolean' },
    type: { control: 'select', options: ['danger', 'default', 'primary'] as NBadge.TBageType[] },
  },
} satisfies Meta<typeof Badge>;

export default meta;

const Template: StoryFn<NBadge.TProps> = (args: NBadge.TProps) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 1,
};

export const ShowIcon = Template.bind({});
ShowIcon.args = {
  count: <IconClock stroke={1.5} />,
};

export const OverflowCount: StoryFn<NBadge.TProps> = (args: NBadge.TProps) => {
  return (
    <Badge {...args}>
      <Avatar shape="square" size="large" />
    </Badge>
  );
};
OverflowCount.args = {
  count: 1000,
  overflowCount: 999,
};

export const Status: StoryFn<NBadge.TProps> = (args: NBadge.TProps) => {
  return (
    <Space>
      <Badge {...args} status="success" text="Success" />
      <Badge {...args} status="error" text="Error" />
      <Badge {...args} status="default" text="Default" />
      <Badge {...args} status="processing" text="Processing" />
      <Badge {...args} status="warning" text="Warning" />
    </Space>
  );
};
