import type { Meta, StoryFn } from '@storybook/react';

import { Label } from '../Label';
import { NLabel } from '../models';

const meta = {
  title: 'Axenix UI/Form/Label/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isStrong: { control: 'boolean' },
    isUnderline: { control: 'boolean' },
    isItalic: { control: 'boolean' },
    type: {
      options: ['default', 'success', 'danger', 'warning', 'secondary'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
  },
  args: {},
} satisfies Meta<typeof Label>;

export default meta;

const Template: StoryFn<NLabel.TProps> = (args: NLabel.TProps) => <Label {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});

export const Strong = Template.bind({});

export const Underlined = Template.bind({});

export const Italic = Template.bind({});

export const Success = Template.bind({});

export const Danger = Template.bind({});

export const Warning = Template.bind({});

export const Secondary = Template.bind({});

export const DangerUnderlined = Template.bind({});

Default.args = {
  children: 'Label',
  title: 'Default Label',
};

Disabled.args = {
  ...Default.args,
  isDisabled: true,
  title: 'Disabled Label',
};

Strong.args = {
  ...Default.args,
  isStrong: true,
  title: 'Strong Label',
};

Underlined.args = {
  ...Default.args,
  isUnderline: true,
  title: 'Underline Label',
};

Italic.args = {
  ...Default.args,
  isItalic: true,
  title: 'Italic Label',
};

Success.args = {
  type: 'success',
  children: 'Success Label',
};

Danger.args = {
  type: 'danger',
  children: 'Danger Label',
};

Warning.args = {
  type: 'warning',
  children: 'Warning Label',
};

Secondary.args = {
  type: 'secondary',
  children: 'Secondary Label',
};

DangerUnderlined.args = {
  type: 'danger',
  isUnderline: true,
  children: 'Danger + Underline',
};
