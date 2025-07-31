import { TExtendedThemeConfig } from '@/providers';

export const getLabelStylesFromSize = (theme: TExtendedThemeConfig, size: 'small' | 'middle' | 'large' = 'middle') => {
  const map = {
    small: {
      inputFontSize: theme?.components?.Input?.inputFontSizeSM,
      labelFontSize: theme?.components?.Input?.labelFontSize,
      placeholderHeight: theme?.components?.Input?.inputFontSizeSM! * theme?.components?.Input?.lineHeight!,
      left: theme?.components?.Input?.paddingInlineSM,
    },
    middle: {
      inputFontSize: theme.components?.Input?.inputFontSize,
      labelFontSize: theme?.components?.Input?.labelFontSize,
      placeholderHeight: theme?.components?.Input?.inputFontSize! * theme?.components?.Input?.lineHeight!,
      left: theme?.components?.Input?.paddingInline,
    },
    large: {
      inputFontSize: theme?.components?.Input?.inputFontSizeLG,
      labelFontSize: theme?.components?.Input?.labelFontSize,
      placeholderHeight: theme?.components?.Input?.inputFontSizeLG! * theme?.components?.Input?.lineHeight!,
      left: theme?.components?.Input?.paddingInlineLG,
    },
  };

  return map[size];
};
