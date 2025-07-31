import i18n from 'i18next';
import resources from 'virtual:i18next-loader';

import './styles';

i18n.init({
  resources,
});

export * from './models';
export * from './providers';
export * from './ui';

// Fake commit
