import en_US from 'antd/locale/en_US';
import { TFunction } from 'i18next';
import { ValidateMessages } from 'rc-field-form/lib/interface';

const Locale = (
  t: TFunction<'translation', undefined>
): { optional?: string; defaultValidateMessages: ValidateMessages } => {
  return {
    optional: t('form:optional'),
    defaultValidateMessages: {
      default: t('form:defaultValidateMessages.default'),
      required: t('form:defaultValidateMessages.required'),
      enum: t('form:defaultValidateMessages.enum'),
      whitespace: t('form:defaultValidateMessages.whitespace'),
      date: {
        format: t('form:defaultValidateMessages.date.format'),
        parse: t('form:defaultValidateMessages.date.parse'),
        invalid: t('form:defaultValidateMessages.date.invalid'),
      },
      types: en_US?.Form?.defaultValidateMessages?.types,
      string: {
        len: t('form:defaultValidateMessages.string.len'),
        min: t('form:defaultValidateMessages.string.min'),
        max: t('form:defaultValidateMessages.string.max'),
        range: t('form:defaultValidateMessages.string.range'),
      },
      number: {
        len: t('form:defaultValidateMessages.number.len'),
        min: t('form:defaultValidateMessages.number.min'),
        max: t('form:defaultValidateMessages.number.max'),
        range: t('form:defaultValidateMessages.number.range'),
      },
      array: {
        len: t('form:defaultValidateMessages.array.len'),
        min: t('form:defaultValidateMessages.array.min'),
        max: t('form:defaultValidateMessages.array.max'),
        range: t('form:defaultValidateMessages.array.range'),
      },
      pattern: {
        mismatch: t('form:defaultValidateMessages.pattern.mismatch'),
      },
    },
  };
};

export { Locale };
