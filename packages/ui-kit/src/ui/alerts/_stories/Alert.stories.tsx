import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { Space } from 'antd';

import { NAlert } from '@/ui';

import { Alert } from '../Alert';

const meta: Meta<NAlert.TProps> = {
  title: 'Axenix UI/Alerts/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    closable: { control: 'boolean' },
    description: { control: 'text' },
    onClose: fn(),
    showIcon: { control: 'boolean' },
    type: { control: 'select', options: ['success', 'info', 'warning', 'error'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;

const Template: StoryFn<NAlert.TProps> = (args: NAlert.TProps) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Alert message',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  message: 'Alert message with description',
  description: 'This is a description',
};

export const ClosableAlert = Template.bind({});
ClosableAlert.args = {
  message: 'Alert message',
  closable: true,
  onClose: () => {},
};

export const Status: StoryFn<NAlert.TProps> = (args: NAlert.TProps) => {
  return (
    <Space>
      <Alert {...args} type="success" message="success" />
      <Alert {...args} type="info" message="info" />
      <Alert {...args} type="error" message="error" />
      <Alert {...args} type="warning" message="warning" />
    </Space>
  );
};

export const WithIcon: StoryFn<NAlert.TProps> = (args: NAlert.TProps) => {
  return (
    <Space>
      <Alert {...args} type="success" message="Success with icon" showIcon />
      <Alert {...args} type="info" message="Info with icon" showIcon />
      <Alert {...args} type="error" message="Error with icon" showIcon />
      <Alert {...args} type="warning" message="Warning with icon" showIcon />
    </Space>
  );
};
