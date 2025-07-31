import { TExtendedThemeConfig } from '@/providers/theme-provider';

export const getMapSizesIcon = (theme: TExtendedThemeConfig) => ({
  small: theme?.components?.Tabs?.iconSizeSM,
  middle: theme?.components?.Tabs?.iconSize,
  large: theme?.components?.Tabs?.iconSizeLG,
});
