import { TFunction } from 'i18next';
import type { PaginationLocale } from 'rc-pagination';

const Locale = (t: TFunction<'translation', undefined>): PaginationLocale => {
  return {
    // Options
    items_per_page: t('rc-pagination:items_per_page'),
    jump_to: t('rc-pagination:jump_to'),
    jump_to_confirm: t('rc-pagination:jump_to_confirm'),
    page: t('rc-pagination:page'),
    // Pagination
    prev_page: t('rc-pagination:prev_page'),
    next_page: t('rc-pagination:next_page'),
    prev_5: t('rc-pagination:prev_5'),
    next_5: t('rc-pagination:next_5'),
    prev_3: t('rc-pagination:prev_3'),
    next_3: t('rc-pagination:next_3'),
    page_size: t('rc-pagination:page_size'),
  } as PaginationLocale;
};

export { Locale };
