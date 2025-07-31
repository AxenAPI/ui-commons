import { ModalLocale } from 'antd/lib/modal';
import { TFunction } from 'i18next';

const Locale = (t: TFunction<'translation', undefined>): ModalLocale => {
  return {
    okText: t('modal:okText'),
    cancelText: t('modal:cancelText'),
    justOkText: t('modal:justOkText'),
  };
};

export { Locale };
