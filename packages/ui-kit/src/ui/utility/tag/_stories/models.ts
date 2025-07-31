import { ReactNode } from 'react';

import { NTag } from '../models';

export type TTagIcon = {
  icon: ReactNode;
  text: string;
  color?: NTag.TTagPresetColor;
};

export type TTagBorderless = {
  icon?: ReactNode;
  isClosable?: boolean;
} & Omit<TTagIcon, 'icon'>;
