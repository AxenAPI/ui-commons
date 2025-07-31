import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconUpload } from '@tabler/icons-react';

import { Tooltip } from 'antd';

import { DropdownButton, NDropdownButton } from '../dropdown-button';

const meta = {
  title: 'Axenix UI/Dropdown/DropdownButton',
  args: {
    onOpenChange: fn(),
  },
  argTypes: {
    menu: { control: 'object' },
    trigger: { control: 'object' },
    size: { control: 'select', options: ['large', 'middle', 'small'] },
    type: { control: 'select', options: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'] },
    placement: {
      control: 'select',
      options: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom'],
    },
    isLoading: { control: 'boolean' },
    isDanger: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    onOpenChange: fn(),
  },
  component: DropdownButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownButton>;

export default meta;

const Template: StoryFn<NDropdownButton.TProps> = args => <DropdownButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  menu: {
    items: [
      {
        key: '1',
        label: '1st menu item',
        children: [
          {
            key: '1-1',
            label: '1st nested menu item',
          },
          {
            key: '1-2',
            label: '2nd nested menu item',
          },
        ],
      },
      {
        key: '2',
        label: '2nd menu item',
      },
      {
        key: '3',
        label: '3rd menu item',
      },
    ],
  },
  children: <div>Hover me!</div>,
  isArrow: true,
  isAutoAdjustOverflow: true,
  placement: 'bottomRight',
  type: 'default',
  size: 'middle',
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  ...Default.args,
  menu: {
    items: [
      {
        key: '1',
        label: '1st menu item',
      },
      {
        key: '2',
        label: '2nd menu item',
      },
      {
        key: '3',
        label: '3rd menu item',
      },
    ],
  },
  children: <div>Disabled</div>,
  isDisabled: true,
};

export const DangerButton = Template.bind({});
DangerButton.args = {
  ...Default.args,
  menu: {
    items: [
      {
        key: '1',
        label: '1st menu item',
      },
      {
        key: '2',
        label: '2nd menu item',
        disabled: true,
      },
      {
        key: '3',
        label: '3rd menu item',
        danger: true,
      },
    ],
  },
  children: <div>Danger</div>,
  isDanger: true,
  placement: 'topRight',
  type: 'primary',
};

export const ButtonWithTooltip = Template.bind({});
ButtonWithTooltip.args = {
  ...Default.args,
  menu: {
    items: [
      {
        key: '1',
        label: '1st menu item',
      },
      {
        key: '2',
        label: '2nd menu item',
      },
      {
        key: '3',
        label: '3rd menu item',
      },
    ],
  },
  children: <div>With Tooltip</div>,
  placement: 'topCenter',
  buttonsRender: ([leftButton, rightButton]) => [
    <Tooltip title="tooltip text" key="leftButton">
      {leftButton}
    </Tooltip>,
    React.cloneElement(rightButton as React.ReactElement<any, string>, { loading: true }),
  ],
};

export const ButtonWithBadge = Template.bind({});
ButtonWithBadge.args = {
  ...Default.args,
  countBadge: 5,
  iconBtn: <IconUpload />,
  menu: {
    items: [
      {
        key: '1',
        label: '1st menu item',
      },
      {
        key: '2',
        label: '2nd menu item',
      },
      {
        key: '3',
        label: '3rd menu item',
      },
    ],
  },
};
