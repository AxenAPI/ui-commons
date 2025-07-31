import { SearchOutlined } from '@ant-design/icons';
import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '../Button';
import { NButton } from '../models';
import { ARG_TYPES } from './consts';

const meta: Meta<NButton.TProps> = {
  title: 'Axenix UI/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
} satisfies Meta<typeof Button>;

export default meta;

const Template: StoryFn<NButton.TProps> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click Me',
  type: 'primary',
  size: 'middle',
  shape: 'default',
  isDisabled: false,
  isLoading: false,
  isDanger: false,
  isGhost: false,
  className: 'custom-button',
  title: 'Button Title',
  tooltip: 'Button Tooltip',
  isBlock: false,
  iconPosition: 'start',
  style: {},
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon: <SearchOutlined />,
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  ...Default.args,
  isLoading: true,
};

export const WithDisabled = Template.bind({});
WithDisabled.args = {
  ...Default.args,
  isDisabled: true,
};

export const AsBlock = Template.bind({});
AsBlock.args = {
  ...Default.args,
  isBlock: true,
};

export const WithIconAtEnd = Template.bind({});
WithIconAtEnd.args = {
  ...Default.args,
  icon: <SearchOutlined />,
  iconPosition: 'end',
};

export const ButtonDefaultBadge: StoryFn<NButton.TProps> = args => {
  return <Button {...args}>Выбрано Default</Button>;
};
ButtonDefaultBadge.args = {
  countBadge: 5,
};

export const ButtonGhostBadge: StoryFn<NButton.TProps> = args => {
  return (
    <div style={{ background: 'gray', padding: 16 }}>
      <Button {...args}>Выбрано Ghost</Button>
    </div>
  );
};
ButtonGhostBadge.args = {
  countBadge: 5,
  isGhost: true,
};

export const ButtonDangerBadge: StoryFn<NButton.TProps> = args => {
  return <Button {...args}>Выбрано Danger</Button>;
};
ButtonDangerBadge.args = {
  countBadge: 5,
  isDanger: true,
};

export const ButtonIconOnly: StoryFn<NButton.TProps> = args => {
  return <Button {...args} />;
};
ButtonIconOnly.args = {
  icon: <SearchOutlined />,
};

export const ButtonIconOnlyWithBadge: StoryFn<NButton.TProps> = args => {
  return <Button {...args} />;
};
ButtonIconOnlyWithBadge.args = {
  icon: <SearchOutlined />,
  countBadge: 5,
  isDanger: false,
  isGhost: false,
};

export const ButtonDisabledTooltip: StoryFn<NButton.TProps> = args => {
  return <Button {...args} />;
};
ButtonDisabledTooltip.args = {
  ...Default.args,
  isDisabledTooltip: true,
  isDisabled: true,
};
