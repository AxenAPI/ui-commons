import React from 'react';

/**
 * Неймспейс с типизацией Label
 */
export namespace NLabel {
  export type TProps = {
    /**
     * Заголовок элемента
     */
    title?: string;
    /**
     * Дочерние элементы
     */
    children?: React.ReactNode;
    /**
     * Состояние активности
     */
    isDisabled?: boolean;
    /**
     * Состояние подчеркивания
     */
    isUnderline?: boolean;
    /**
     * Состояние жирного начертания
     */
    isStrong?: boolean;
    /**
     * Состояние курсива
     */
    isItalic?: boolean;
    /**
     * Стили компонента
     */
    style?: React.CSSProperties;
    /**
     * Классы стилей
     */
    className?: string;
    color?: string | undefined;
    type?: 'secondary' | 'success' | 'warning' | 'danger';
  };
}
