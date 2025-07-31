import type { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { CheckboxGroup } from '../CheckboxGroup';
import { NCheckbox } from '../models';

const meta = {
  title: 'Axenix UI/Form/Toggle Components/Checkboxes/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: { control: 'object' },
    defaultValue: { control: 'object' },
    isDisabled: { control: 'boolean' },
    isReadonly: { control: 'boolean' },
    onChange: fn(),
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

const Template: StoryFn<NCheckbox.TGroupProps> = (args: NCheckbox.TGroupProps) => <CheckboxGroup {...args} />;

export const Default = Template.bind({});

export const Disabled = Template.bind({});

export const WithDefaultValue = Template.bind({});

export const Readonly = Template.bind({});

Default.args = {
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  onChange: fn(),
};

Disabled.args = {
  ...Default.args,
  isDisabled: true,
};

WithDefaultValue.args = {
  ...Default.args,
  defaultValue: ['2'],
};

Readonly.args = {
  ...Default.args,
  defaultValue: ['2'],
  isReadonly: true,
};
