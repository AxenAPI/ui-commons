/* eslint-disable react/display-name */
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper, TFormWrapperProps } from '@/_api/react-hook-form/_story-components';

import { InputNumberField } from '../InputNumberField';
import { NInputNumberField } from '../models';

const FIELD_NAME = 'inputNumber';
const FIELD_LABEL = 'InputField';

type TForm = {
  [FIELD_NAME]: string;
};

const DEFAULT_ARGS = {
  fieldName: FIELD_NAME,
  label: FIELD_LABEL,
  onChange: fn(),
} as NInputNumberField.TProps<TForm>;
const templateFactory: (formProps?: TFormWrapperProps) => StoryFn<NInputNumberField.TProps<TForm>> =
  formProps => args => (
    <FormWrapper {...formProps}>
      <InputNumberField {...args} />
    </FormWrapper>
  );

export default {
  title: 'react-hook-form API/Fields/InputNumberField',
  component: InputNumberField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fieldName: { type: 'string' },
    label: { type: 'string' },
    onChange: fn(),
  },
} as Meta<typeof InputNumberField>;

export const Default = templateFactory().bind({});
Default.args = DEFAULT_ARGS;
