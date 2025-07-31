import { Locale } from 'antd/es/locale';
import ru_RU from 'antd/locale/ru_RU';
import { TFunction } from 'i18next';

import { Locale as LocaleDatePicker } from './ns/date-picker';
import { Locale as LocaleForm } from './ns/form';
import { Locale as LocaleModal } from './ns/modal';
import { Locale as LocalePopconfirm } from './ns/popconfirm';
import { Locale as LocalePagination } from './ns/rc-pagination';
import { Locale as LocaleTable } from './ns/table';
import { Locale as LocaleTimePicker } from './ns/time-picker';
import { Locale as LocaleTour } from './ns/tour';
import { Locale as LocaleTransfer } from './ns/transfer';
import { Locale as LocaleUpload } from './ns/upload';

const globalLocale = (t: TFunction<'translation', undefined>): Locale => {
  return {
    ...ru_RU,
    Pagination: LocalePagination(t),
    DatePicker: LocaleDatePicker(t),
    TimePicker: LocaleTimePicker(t),
    Calendar: LocaleDatePicker(t),
    Table: LocaleTable(t),
    Tour: LocaleTour(t),
    Modal: LocaleModal(t),
    Popconfirm: LocalePopconfirm(t),
    Transfer: LocaleTransfer(t),
    Upload: LocaleUpload(t),
    Empty: {
      description: t('any:Empty.description'),
    },
    Icon: {
      icon: t('any:Icon.icon'),
    },
    Text: {
      edit: t('text:edit'),
      copy: t('text:copy'),
      copied: t('text:copied'),
      expand: t('text:expand'),
      collapse: t('text:collapse'),
    },
    Form: LocaleForm(t),
    Image: {
      preview: t('any:Image.preview'),
    },
    QRCode: {
      expired: t('any:QRCode.expired'),
      refresh: t('any:QRCode.refresh'),
      scanned: t('any:QRCode.scanned'),
    },
    ColorPicker: {
      presetEmpty: t('any:ColorPicker.presetEmpty'),
      transparent: t('any:ColorPicker.transparent'),
      singleColor: t('any:ColorPicker.singleColor'),
      gradientColor: t('any:ColorPicker.gradientColor'),
    },
    Input: {
      placeholder: t('input:placeholder'),
    },
  } as Locale;
};

export { globalLocale };
