/* eslint-disable react/display-name */
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper, TFormWrapperProps } from '../../../_story-components';
import { DatePickerField } from '../DatePickerField';
import type { NDatePickerField } from '../models';

const FIELD_NAME = 'datePicker';
const FIELD_LABEL = 'DatePickerField';
type TForm = {
  [FIELD_NAME]: string;
};

const DEFAULT_ARGS = {
  fieldName: FIELD_NAME,
  label: FIELD_LABEL,
  onChange: fn(),
} as NDatePickerField.TProps<TForm>;
const templateFactory: (formProps?: TFormWrapperProps) => StoryFn<NDatePickerField.TProps<TForm>> =
  formProps => args => (
    <FormWrapper {...formProps}>
      <DatePickerField {...args} />
    </FormWrapper>
  );

export default {
  title: 'react-hook-form API/Fields/DatePickerField',
  component: DatePickerField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fieldName: { type: 'string' },
    label: { type: 'string' },
    onChange: fn(),
  },
} as Meta<typeof DatePickerField>;

export const Default = templateFactory().bind({});
Default.args = DEFAULT_ARGS;

export const CustomParser = templateFactory().bind({});
CustomParser.args = {
  ...DEFAULT_ARGS,
  parser: dayjs => dayjs?.toDate().toLocaleString(),
};

export const Readonly = templateFactory({
  defaultValues: {
    [FIELD_NAME]: new Date().toISOString(),
  },
}).bind({});
Readonly.args = {
  ...DEFAULT_ARGS,
  isReadonly: true,
};

export const ReadonlyWithCustomFormatter = templateFactory({
  defaultValues: {
    [FIELD_NAME]: new Date().toISOString(),
  },
}).bind({});
ReadonlyWithCustomFormatter.args = {
  ...DEFAULT_ARGS,
  isReadonly: true,
  readonlyFormatter: val => new Date(val).toUTCString(),
};
