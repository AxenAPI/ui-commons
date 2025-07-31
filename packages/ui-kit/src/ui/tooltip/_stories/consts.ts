import { fn } from '@storybook/test';

export const COLORS = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

export const CUSTOM_COLORS = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

export const ARG_TYPES = {
  title: {
    control: 'text',
  },
  arrow: {
    control: 'boolean',
  },
  color: {
    control: 'select',
    options: [...COLORS, ...CUSTOM_COLORS],
  },
  placement: {
    control: 'select',
    options: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom'],
  },
  width: {
    control: 'text',
  },
  combined: {
    control: 'object',
  },
  isDefaultOpen: {
    control: 'boolean',
  },
  isFresh: {
    control: 'boolean',
  },
  isOpen: {
    control: 'boolean',
  },
  trigger: {
    control: 'select',
    options: ['hover', 'focus', 'click'],
  },
  onOpenChange: fn(),
};
