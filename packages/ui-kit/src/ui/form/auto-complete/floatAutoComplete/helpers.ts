import { TExtendedThemeConfig } from '@/providers';

export const getLabelStylesFromSize = (theme: TExtendedThemeConfig) => {
  return {
    inputFontSize: theme?.components?.Input?.inputFontSize,
    placeholderHeight: theme?.components?.Input?.inputFontSize! * theme?.components?.Input?.lineHeight!,
    left: theme?.components?.Input?.paddingInline,
  };
};
