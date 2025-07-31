import React, { CSSProperties, ReactNode } from 'react';

import { TSize as TSizeCommon } from '@/models';

import { NTooltip } from '../tooltip/models';

/**
 * Неймспейс с типизацией NButton
 */

export namespace NButton {
  type TMergedHTMLAttributes = Omit<
    React.HTMLAttributes<HTMLElement> &
      React.ButtonHTMLAttributes<HTMLElement> &
      React.AnchorHTMLAttributes<HTMLElement>,
    'type'
  >;

  export type TButtonShape = 'default' | 'circle' | 'round';
  export type TButtonType = 'default' | 'primary' | 'dashed' | 'link' | 'text';
  export type TIconPosition = 'start' | 'end';
  export type TSize = TSizeCommon;

  export type TProps = TMergedHTMLAttributes & {
    children?: ReactNode;
    className?: string;
    countBadge?: ReactNode;
    htmlType?: React.ButtonHTMLAttributes<HTMLElement>['type'];
    icon?: ReactNode;
    iconPosition?: TIconPosition;
    isBlock?: boolean;
    isDanger?: boolean;
    isDisabled?: boolean;
    isGhost?: boolean;
    isLoading?: boolean;
    shape?: TButtonShape;
    size?: TSize;
    style?: CSSProperties;
    title?: string;
    tooltip?: string;
    placementTooltip?: NTooltip.TPlacement;
    /**Блокировать подсказку, если кнопка заблокирована */
    isDisabledTooltip?: boolean;
    type?: TButtonType;
    variant?: 'link' | 'text' | 'outlined' | 'dashed' | 'solid' | 'filled';
    color?: 'danger' | 'default' | 'primary';
    [key: `data-${string}`]: string;
  };
}

export type TButtonsConfig = NButton.TProps & {
  buttonKey: string;
};
