import { TFunction } from 'i18next';
import type { Locale as RcPickerLocale } from 'rc-picker/lib/interface';

const Locale = (t: TFunction<'translation', undefined>): RcPickerLocale => {
  return {
    today: t('rc-picker:today'),
    now: t('rc-picker:now'),
    backToToday: t('rc-picker:backToToday'),
    ok: t('rc-picker:ok'),
    clear: t('rc-picker:clear'),
    month: t('rc-picker:month'),
    year: t('rc-picker:year'),
    timeSelect: t('rc-picker:timeSelect'),
    dateSelect: t('rc-picker:dateSelect'),
    monthSelect: t('rc-picker:monthSelect'),
    yearSelect: t('rc-picker:yearSelect'),
    decadeSelect: t('rc-picker:decadeSelect'),
    dateFormat: t('rc-picker:dateFormat'),
    dateTimeFormat: t('rc-picker:dateTimeFormat'),
    previousMonth: t('rc-picker:previousMonth'),
    nextMonth: t('rc-picker:nextMonth'),
    previousYear: t('rc-picker:previousYear'),
    nextYear: t('rc-picker:nextYear'),
    previousDecade: t('rc-picker:previousDecade'),
    nextDecade: t('rc-picker:nextDecade'),
    previousCentury: t('rc-picker:previousCentury'),
    nextCentury: t('rc-picker:nextCentury'),
  } as RcPickerLocale;
};

export { Locale };
