import { TourLocale } from 'antd/lib/tour/interface';
import { TFunction } from 'i18next';

const Locale = (t: TFunction<'translation', undefined>): TourLocale => {
  return {
    Next: t('tour:Next'),
    Previous: t('tour:Previous'),
    Finish: t('tour:Finish'),
  };
};

export { Locale };
