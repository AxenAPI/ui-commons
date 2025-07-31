import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper } from '@/_api/react-hook-form/_story-components';

import { CheckboxField } from '../CheckboxField';
import { NCheckboxField } from '../models';

const FIELD_NAME = 'checkbox';
const FIELD_LABEL = 'CheckboxField';

type TForm = {
  [FIELD_NAME]: string;
};

export default {
  title: 'react-hook-form API/Fields/CheckboxField',
  component: CheckboxField,
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
  },
} as Meta<typeof CheckboxField>;

export const DefaultCheckboxField = (props: NCheckboxField.TProps<TForm>) => (
  <FormWrapper>
    <CheckboxField {...props} />
  </FormWrapper>
);
