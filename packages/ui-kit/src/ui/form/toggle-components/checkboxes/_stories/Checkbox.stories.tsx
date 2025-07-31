import { useState } from 'react';

import type { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { Checkbox } from '../Checkbox';
import { NCheckbox } from '../models';

const meta = {
  title: 'Axenix UI/Form/Toggle Components/Checkboxes/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDisabled: { control: 'boolean' },
    isChecked: { control: 'boolean' },
    isReadonly: { control: 'boolean' },
    name: { control: 'text' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

const Template: StoryFn<NCheckbox.TProps> = (args: NCheckbox.TProps) => {
  const [isChecked, setIsChecked] = useState(args.isChecked || false);

  const handleChange = (event: NCheckbox.TChangeEvent) => {
    setIsChecked(event.target.checked);
    if (args.onChange) {
      args.onChange(event);
    }
  };

  return (
    <Checkbox {...args} isChecked={isChecked} onChange={handleChange}>
      Checkbox
    </Checkbox>
  );
};
export const Default = Template.bind({});

export const Checked = Template.bind({});

export const Disabled = Template.bind({});

export const Readonly = Template.bind({});

Default.args = {
  name: 'Default text',
  onChange: fn(),
};

Checked.args = {
  ...Default.args,
  isChecked: true,
};

Disabled.args = {
  ...Default.args,
  isDisabled: true,
};

Readonly.args = {
  ...Default.args,
  isChecked: true,
  isReadonly: true,
};
