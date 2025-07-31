import ru from 'antd/es/date-picker/locale/ru_RU';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import { TFunction } from 'i18next';

import { Locale as rcPicker } from '../rc-picker/index.ts';
import { Locale as TimePicker } from '../time-picker/index.ts';

const Locale = (t: TFunction<'translation', undefined>): PickerLocale => {
  return {
    ...ru,
    lang: Object.assign(
      {
        ...ru.lang,
        placeholder: t('date-picker:placeholder'),
        yearPlaceholder: t('date-picker:yearPlaceholder'),
        quarterPlaceholder: t('date-picker:quarterPlaceholder'),
        monthPlaceholder: t('date-picker:monthPlaceholder'),
        weekPlaceholder: t('date-picker:weekPlaceholder'),
        rangePlaceholder: [t('date-picker:rangePlaceholder.start'), t('date-picker:rangePlaceholder.end')],
        rangeYearPlaceholder: [t('date-picker:rangeYearPlaceholder.start'), t('date-picker:rangeYearPlaceholder.end')],
        rangeMonthPlaceholder: [
          t('date-picker:rangeMonthPlaceholder.start'),
          t('date-picker:rangeMonthPlaceholder.end'),
        ],
        rangeWeekPlaceholder: [t('date-picker:rangeWeekPlaceholder.start'), t('date-picker:rangeWeekPlaceholder.end')],
        shortWeekDays: [
          t('date-picker:shortWeekDays.Sunday'),
          t('date-picker:shortWeekDays.Monday'),
          t('date-picker:shortWeekDays.Tuesday'),
          t('date-picker:shortWeekDays.Wednesday'),
          t('date-picker:shortWeekDays.Thursday'),
          t('date-picker:shortWeekDays.Friday'),
          t('date-picker:shortWeekDays.Saturday'),
        ],
        shortMonths: [
          t('date-picker:shortMonths.January'),
          t('date-picker:shortMonths.February'),
          t('date-picker:shortMonths.March'),
          t('date-picker:shortMonths.April'),
          t('date-picker:shortMonths.May'),
          t('date-picker:shortMonths.June'),
          t('date-picker:shortMonths.July'),
          t('date-picker:shortMonths.August'),
          t('date-picker:shortMonths.September'),
          t('date-picker:shortMonths.October'),
          t('date-picker:shortMonths.November'),
          t('date-picker:shortMonths.December'),
        ],
      },
      rcPicker(t)
    ),
    timePickerLocale: Object.assign({}, TimePicker(t)),
  } as PickerLocale;
};

export { Locale };
