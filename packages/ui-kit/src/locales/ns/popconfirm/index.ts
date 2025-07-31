import { PopconfirmLocale } from 'antd/lib/popconfirm/PurePanel';
import { TFunction } from 'i18next';

const Locale = (t: TFunction<'translation', undefined>): PopconfirmLocale => {
  return {
    okText: t('popconfirm:okText'),
    cancelText: t('popconfirm:okText'),
  };
};

export { Locale };
