import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper } from '../../../_story-components';
import { NRangePickerField } from '../models';
import { RangePickerField } from '../RangePickerField';

const FIELD_NAME = 'rangePicker';
const FIELD_LABEL = 'RangePickerField';
type TForm = {
  [FIELD_NAME]: string;
};

export default {
  title: 'react-hook-form API/Fields/RangePickerField',
  component: RangePickerField,
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
} as Meta<typeof RangePickerField>;

export const DefaultRangePickerField = (props: NRangePickerField.TProps<TForm>) => (
  <FormWrapper>
    <RangePickerField {...props} />
  </FormWrapper>
);
