import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper } from '@/_api/react-hook-form/_story-components';

import { InputField } from '../InputField';
import { NInputField } from '../models';

const FIELD_NAME = 'input';
const FIELD_LABEL = 'InputField';

type TForm = {
  [FIELD_NAME]: string;
};

export default {
  title: 'react-hook-form API/Fields/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fieldName: { type: 'string' },
    label: { type: 'string' },
    onChange: fn(),
    onPressEnter: fn(),
  },
  args: {
    fieldName: FIELD_NAME,
    label: FIELD_LABEL,
    onChange: fn(),
    onPressEnter: fn(),
  },
} as Meta<typeof InputField>;

export const DefaultInputField = (props: NInputField.TProps<TForm>) => (
  <FormWrapper>
    <InputField {...props} />
  </FormWrapper>
);

export const NumberInputField = (props: NInputField.TProps<TForm>) => (
  <FormWrapper>
    <InputField {...props} />
  </FormWrapper>
);
NumberInputField.args = {
  type: 'number',
};

export const ValidatedInputField = (props: NInputField.TProps<TForm>) => (
  <FormWrapper mode="all">
    <InputField {...props} />
  </FormWrapper>
);
ValidatedInputField.args = {
  autosize: true,
  rules: {
    required: true,
    validate: (value: string) => {
      if (value?.length < 5 || value?.length > 10) {
        return 'Поле должно содержать от 5 до 10 символов';
      }
    },
  },
};

export const RequiredRightInputField = (props: NInputField.TProps<TForm>) => (
  <FormWrapper mode="all">
    <InputField {...props} />
  </FormWrapper>
);

RequiredRightInputField.args = {
  autosize: true,
  isRequiredRight: true,
  rules: {
    required: true,
    validate: (value: string) => {
      if (value?.length < 5 || value?.length > 10) {
        return 'Поле должно содержать от 5 до 10 символов';
      }
    },
  },
};
