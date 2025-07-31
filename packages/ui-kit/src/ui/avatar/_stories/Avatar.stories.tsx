import { UserOutlined } from '@ant-design/icons';
import { Meta, StoryFn } from '@storybook/react';

import { Space } from 'antd';

import { NAvatar } from '@/ui';

import { Avatar } from '../Avatar';

const meta: Meta<NAvatar.TProps> = {
  title: 'Axenix UI/Avatar/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    shape: { control: 'radio', options: ['circle', 'square'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    icon: { control: false },
    src: { control: 'text' },
    alt: { control: 'text' },
    draggable: { control: 'boolean' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

const Template: StoryFn<NAvatar.TProps> = (args: NAvatar.TProps) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  alt: 'User avatar',
  src: 'https://xsgames.co/randomusers/assets/avatars/male/10.jpg',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <UserOutlined />,
};

export const Shapes: StoryFn<NAvatar.TProps> = args => (
  <Space>
    <Avatar {...args} shape="circle" icon={<UserOutlined />} />
    <Avatar {...args} shape="square" icon={<UserOutlined />} />
  </Space>
);

export const Sizes: StoryFn<NAvatar.TProps> = args => (
  <Space>
    <Avatar {...args} size="small" icon={<UserOutlined />} />
    <Avatar {...args} size="default" icon={<UserOutlined />} />
    <Avatar {...args} size="large" icon={<UserOutlined />} />
  </Space>
);
