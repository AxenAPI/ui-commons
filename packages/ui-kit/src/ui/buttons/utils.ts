import { NButton } from './models';

export const getPaddingInlineClassName = (size: NButton.TSize, isOnlyIcon: boolean): string => {
  if (isOnlyIcon) {
    return `btn-padding-${size}-icon`;
  }
  return `btn-padding-${size}`;
};
