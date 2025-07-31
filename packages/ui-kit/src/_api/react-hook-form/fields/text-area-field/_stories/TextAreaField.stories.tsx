import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper } from '@/_api/react-hook-form/_story-components';

import { NTextAreaField } from '../models';
import { TextAreaField } from '../TextAreaField';

const FIELD_NAME = 'textarea';
const FIELD_LABEL = 'TextAreaField';

type TForm = {
  [FIELD_NAME]: string;
};

export default {
  title: 'react-hook-form API/Fields/TextAreaField',
  component: TextAreaField,
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
} as Meta<typeof TextAreaField>;

export const DefaultTextAreaField = (props: NTextAreaField.TProps<TForm>) => (
  <FormWrapper>
    <TextAreaField {...props} />
  </FormWrapper>
);

export const ValidatedTextAreaField = (props: NTextAreaField.TProps<TForm>) => (
  <FormWrapper mode="all">
    <TextAreaField {...props} />
  </FormWrapper>
);
ValidatedTextAreaField.args = {
  autosize: true,
  rules: {
    validate: (value: string) => {
      if (value?.length < 5 || value?.length > 10) {
        return 'Поле должно содержать от 5 до 10 символов';
      }
    },
  },
};
