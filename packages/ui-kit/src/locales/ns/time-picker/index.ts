import type { TimePickerLocale } from 'antd/lib/time-picker';
import { TFunction } from 'i18next';

const Locale = (t: TFunction<'translation', undefined>): TimePickerLocale => {
  return {
    placeholder: t('time-picker:placeholder'),
    rangePlaceholder: [t('time-picker:rangePlaceholder.start'), t('time-picker:rangePlaceholder.end')],
  };
};

export { Locale };
