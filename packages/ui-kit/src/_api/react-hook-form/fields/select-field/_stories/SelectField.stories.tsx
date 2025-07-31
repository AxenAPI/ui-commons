/* eslint-disable react/display-name */
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper, TFormWrapperProps } from '@/_api/react-hook-form/_story-components';

import { NSelectField } from '../models';
import { SelectField } from '../SelectField';

const FIELD_NAME = 'select';
const FIELD_LABEL = 'SelectField';

type TForm = {
  [FIELD_NAME]: string;
};

const DEFAULT_ARGS = {
  fieldName: FIELD_NAME,
  label: FIELD_LABEL,
  onChange: fn(),
  options: [
    {
      label: 'двенадцать',
      value: 'twelve',
    },
    {
      label: 'Двадцать три',
      value: 'twenty three',
    },
  ],
} as NSelectField.TProps<TForm>;
const templateFactory: (formProps?: TFormWrapperProps) => StoryFn<NSelectField.TProps<TForm>> = formProps => args => (
  <FormWrapper {...formProps}>
    <SelectField {...args} />
  </FormWrapper>
);

export default {
  title: 'react-hook-form API/Fields/SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fieldName: { type: 'string' },
    label: { type: 'string' },
    onChange: fn(),
  },
} as Meta<typeof SelectField>;

export const Default = templateFactory().bind({});
Default.args = DEFAULT_ARGS;

export const Readonly = templateFactory({
  defaultValues: {
    [FIELD_NAME]: 'twenty three',
  },
}).bind({});
Readonly.args = {
  ...DEFAULT_ARGS,
  isReadonly: true,
};
