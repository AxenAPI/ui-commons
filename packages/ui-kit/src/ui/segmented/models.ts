import { CSSProperties, ReactNode } from 'react';

import { TSize } from '@/models';

/**
 * Неймспейс с типизпцией Segmented
 */
export namespace NSegmented {
  export type TItem = {
    label: ReactNode;
    value: string | number;
    icon?: ReactNode;
    disabled?: boolean;
    className?: string;
  };

  export type TProps = {
    /**
     * Возможность подогнать ширину под ширину родительского элемента
     */
    block?: boolean;
    /**
     * Изначально выбранное значение
     */
    defaultValue?: string | number;
    /**
     * Состояние активности
     */
    isDisabled?: boolean;
    /**
     * Опции меню
     */
    options: string[] | number[] | TItem[];
    /**
     * Размер компонента
     */
    size?: TSize;
    style?: CSSProperties;
    /**
     * Текущее выбранное значение
     */
    value?: string | number;
    /**
     * Функция нажатия на меню
     */
    onChange?: (value: string | number) => void;

    /**
     * Форма
     */
    shape?: 'default' | 'round';
    /**
     * Свойство name для всех дочерних input[type="radio"].
     * Если оно не задано, то будет возвращаться к случайно сгенерированному имени
     */
    name?: string;
  };
}
