import { TransferLocale } from 'antd/lib/transfer';
import { TFunction } from 'i18next';

const Locale = (t: TFunction<'translation', undefined>): TransferLocale => {
  return {
    titles: ['', ''],
    searchPlaceholder: t('transfer:searchPlaceholder'),
    itemUnit: t('transfer:itemUnit'),
    itemsUnit: t('transfer:itemsUnit'),
    remove: t('transfer:remove'),
    selectCurrent: t('transfer:selectCurrent'),
    removeCurrent: t('transfer:removeCurrent'),
    selectAll: t('transfer:selectAll'),
    deselectAll: t('transfer:deselectAll'),
    removeAll: t('transfer:removeAll'),
    selectInvert: t('transfer:selectInvert'),
  };
};

export { Locale };
