import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper } from '../../../_story-components';
import { NTimePickerField } from '../models';
import { TimePickerField } from '../TimePickerField';

const FIELD_NAME = 'timePicker';
const FIELD_LABEL = 'TimePickerField';
type TForm = {
  [FIELD_NAME]: string;
};

export default {
  title: 'react-hook-form API/Fields/TimePickerField',
  component: TimePickerField,
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
} as Meta<typeof TimePickerField>;

export const DefaultTimePickerField = (props: NTimePickerField.TProps<TForm>) => (
  <FormWrapper>
    <TimePickerField {...props} />
  </FormWrapper>
);
