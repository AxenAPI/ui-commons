import * as React from 'react';

import { NAvatarSkeleton } from '../avatar-skeleton';

export type TWidthUnit = number | string;

export namespace NSkeleton {
  export type TTitleConfig = {
    width?: number | string;
  };
  export type TParagraphConfig = {
    className?: string;
    prefixCls?: string;
    rows?: number;
    style?: React.CSSProperties;
    width?: number | string | (number | string)[];
  };

  export type TProps = {
    isActive?: boolean;
    isAvatar?: boolean | NAvatarSkeleton.TProps;
    isLoading?: boolean;
    isParagraph?: boolean | TParagraphConfig;
    isRound?: boolean;
    isTitle?: boolean | TTitleConfig;
    /**
     * Префикс для CSS-классов
     */
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  };
}
