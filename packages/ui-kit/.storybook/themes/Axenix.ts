import { create } from '@storybook/theming/create';

import theme from '../../src/assets/themes/default.json';

export default create({
  base: 'light',

  brandImage: '/axenix-logo.svg',
  brandTarget: '_blank',
  brandTitle: 'Axenix',
  brandUrl: 'https://axenix.pro',

  fontBase: 'Montserrat, sans-serif',

  colorPrimary: theme.token.colorPrimary,
  colorSecondary: theme.token.colorBgSpotlight,

  barSelectedColor: theme.token.colorPrimary,
  barHoverColor: theme.token.colorBgSpotlight,

  buttonBg: theme.components.Button.defaultBg,
  buttonBorder: theme.components.Button.defaultBorderColor,

  booleanBg: theme.components.Segmented.trackBg,

  inputBorder: theme.token.colorBorder,
  inputTextColor: theme.token.colorText,

  textColor: theme.token.colorText,
});
