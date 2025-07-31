import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { Dropdown, NDropdown } from '../dropdown';

const meta = {
  title: 'Axenix UI/Dropdown/Dropdown',
  args: {
    onOpenChange: fn(),
  },
  argTypes: {
    menu: { control: 'object' },
    trigger: { control: 'object' },
    isOpen: { control: 'boolean' },
    placement: {
      control: 'select',
      options: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom'],
    },
    isDisabled: { control: 'boolean' },
    onOpenChange: fn(),
  },
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

const Template: StoryFn<NDropdown.TProps> = args => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
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
  children: <div>Hover me!</div>,
  isArrow: true,
  isAutoAdjustOverflow: true,
  placement: 'bottomLeft',
};

export const DisabledElements = Template.bind({});
DisabledElements.args = {
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
        disabled: true,
      },
    ],
  },
  children: <div>Hover me!</div>,
};

export const OtherElements = Template.bind({});
OtherElements.args = {
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
        type: 'divider',
      },
      {
        key: '3',
        label: '3rd menu item',
        disabled: true,
      },
    ],
  },
  children: <div>Hover me!</div>,
};

export const TriggerMode = Template.bind({});
TriggerMode.args = {
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
        disabled: true,
      },
    ],
  },
  children: <div>Click me!</div>,
  trigger: ['click'],
};

export const CascadingMode = Template.bind({});
CascadingMode.args = {
  ...Default.args,
  menu: {
    items: [
      {
        key: '1',
        label: '1st menu item',
      },
      {
        key: '2',
        label: 'sub menu',
        children: [
          {
            key: '21',
            label: '2nd menu item',
          },
          {
            key: '22',
            label: '3rd menu item',
          },
        ],
      },
      {
        key: '4',
        label: '4rth menu item',
      },
    ],
  },
  children: <div>Hover me!</div>,
};

export const BadgeMode = Template.bind({});
BadgeMode.args = {
  ...Default.args,
  countBadge: 35,
  menu: {
    items: [
      {
        key: '1',
        label: '1st menu item',
      },
      {
        key: '2',
        label: 'sub menu',
      },
      {
        key: '4',
        label: '4rth menu item',
      },
    ],
  },
};
