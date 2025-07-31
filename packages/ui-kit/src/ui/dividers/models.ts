import { CSSProperties } from 'react';

/**
 * Неймспейс с типизацией NDivider
 */

export namespace NDivider {
  export type TType = 'horizontal' | 'vertical';
  export type TOrientation = 'center' | 'start' | 'end';

  export type TProps = {
    children?: React.ReactNode;
    className?: string;
    /**
     * Определяет является ли линия разделителя пунктирной
     */
    isDashed?: boolean;
    /**
     * Классическое отображение разделителя
     */
    isPlain?: boolean;
    /**
     * Положение заголовка внутри разделителя
     */
    orientation?: TOrientation;
    /**
     * Отступ от ближайшей границы
     */
    orientationMargin?: string | number;
    /**
     * Классы стилей родителя
     */
    rootClassName?: string;
    style?: CSSProperties;
    /**
     * Направление делителя
     */
    type?: TType;
  };
}
