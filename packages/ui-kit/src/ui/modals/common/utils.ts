import { TExtendedThemeConfig } from '@/providers/theme-provider';

export const getMapColorsIcon = (theme: TExtendedThemeConfig) => ({
  default: theme.token?.colorPrimary,
  error: theme.components?.Modal?.iconErrorColor,
  info: theme.components?.Modal?.iconInfoColor,
  success: theme.components?.Modal?.iconSuccessColor,
  warning: theme.components?.Modal?.iconWarningColor,
});
