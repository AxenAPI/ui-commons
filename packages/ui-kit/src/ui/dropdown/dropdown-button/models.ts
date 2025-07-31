import { ReactNode } from 'react';

import { TSize } from '@/models';

import { NDropdown } from '../dropdown';

/**
 * Неймспейс с типизацией NDropdownButton
 */

export namespace NDropdownButton {
  export type TType = 'default' | 'primary' | 'dashed' | 'link' | 'text';
  export type TAdjustOverflow = NDropdown.TAdjustOverflow;
  export type TDropdownArrowOptions = NDropdown.TDropdownArrowOptions;

  export type TProps = NDropdown.TProps & {
    /**
     * Пользовательские кнопки внутри комопнента
     */
    buttonsRender?: (buttons: React.ReactNode[]) => React.ReactNode[];
    isLoading?: boolean | { delay: number };
    isDanger?: boolean;
    icon?: ReactNode;
    /**
     * Иконка кнопки. Слева.
     */
    iconBtn?: ReactNode;
    size?: TSize;
    type?: TType;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  };
}
