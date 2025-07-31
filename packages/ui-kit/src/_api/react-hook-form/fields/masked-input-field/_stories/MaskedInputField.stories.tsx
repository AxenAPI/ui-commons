import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { FormWrapper } from '@/_api/react-hook-form/_story-components';

import { MaskedInputField } from '../MaskedInputField';
import { NMaskedInputField } from '../models';

const FIELD_NAME = 'input';
const FIELD_LABEL = 'InputField';

type TForm = {
  [FIELD_NAME]: string;
};

export default {
  title: 'react-hook-form API/Fields/MaskedInputField',
  component: MaskedInputField,
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
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    placeholder: 'Введите индекс',
    onChange: fn(),
  },
} as Meta<typeof MaskedInputField>;

export const DefaultMaskedInputField = (props: NMaskedInputField.TProps<TForm>) => (
  <FormWrapper>
    <MaskedInputField {...props} />
  </FormWrapper>
);

export const ValidatedMaskedInputField = (props: NMaskedInputField.TProps<TForm>) => (
  <FormWrapper mode="all">
    <MaskedInputField {...props} />
  </FormWrapper>
);
ValidatedMaskedInputField.args = {
  tooltip: 'Подсказка',
  rules: {
    required: true,
    validate: (value: string) => {
      if (value?.length < 6) {
        return 'Поле должно содержать 6 символов';
      }
    },
  },
};
