import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper } from '../../../_story-components';
import { NMultipleSelectField } from '../models';
import { MultipleSelectField } from '../MultipleSelectField';

const FIELD_NAME = 'select';
const FIELD_LABEL = 'SelectField';

type TForm = {
  [FIELD_NAME]: string;
};

export default {
  title: 'react-hook-form API/Fields/MultipleSelectField',
  component: MultipleSelectField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fieldName: { type: 'string' },
    label: { type: 'string' },
    onChange: fn(),
  },
  args: {
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
  },
} as Meta<typeof MultipleSelectField>;

export const DefaultNMultipleSelectField = (props: NMultipleSelectField.TProps<TForm>) => (
  <FormWrapper>
    <MultipleSelectField {...props} />
  </FormWrapper>
);
