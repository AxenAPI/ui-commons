import type { Meta, StoryFn } from '@storybook/react';

import { MaskedAutoComplete } from '../MaskedAutoComplete';
import { NAutoComplete } from '../models';
import { ARG_TYPES, DEFAULT_ARGS } from './consts';

const meta = {
  title: 'Axenix UI/Forms/MaskedAutoComplete',
  component: MaskedAutoComplete,
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  args: DEFAULT_ARGS,
} satisfies Meta<typeof MaskedAutoComplete>;

export default meta;

const Template: StoryFn<NAutoComplete.TMaskedProps> = (args: NAutoComplete.TMaskedProps) => (
  <MaskedAutoComplete {...args} />
);

export const Default = Template.bind({});
export const WithDynamicMask = Template.bind({});

Default.args = {
  mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  placeholder: 'Введите номер телефона',
  options: [{ value: '+7' }, { value: '928' }],
  style: { width: 200 },
};

WithDynamicMask.args = {
  ...Default.args,
  mask: (value: string) => {
    if (value.startsWith('+')) {
      return ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    }
    return ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  },
};
