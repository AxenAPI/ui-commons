import { ComponentType, HTMLAttributes } from 'react';

import { TAnyObject, TSize as TSizeD } from '@/models';

export namespace NFlex {
  /**
   * Строковые значения принимаемые в проп gap
   */
  export type TGap = TSizeD;

  export type TProps<P = TAnyObject> = {
    /**
     * Префикс класса для стилизации компонента.
     */
    prefixCls?: string;
    /**
     * Определяет, будет ли контейнер располагать элементы вертикально.
     */
    vertical?: boolean;
    /**
     * Определяет, будут ли дочерние элементы переноситься на новую строку при необходимости.
     * Может принимать логическое значение или строковое значение CSS-свойства flexWrap.
     */
    wrap?: boolean | React.CSSProperties['flexWrap'];
    /**
     * Определяет способ распределения свободного пространства между и вокруг элементов вдоль главной оси.
     * Может принимать строковое значение CSS-свойства justifyContent.
     */
    justify?: React.CSSProperties['justifyContent'];
    /**
     * Определяет, как выравнивать элементы по перпендикулярной оси их контейнера.
     * Может принимать строковое значение CSS-свойства alignItems.
     */
    align?: React.CSSProperties['alignItems'];
    /**
     * Определяет начальный основной размер элемента и способ его растяжения или сжатия для заполнения доступного пространства.
     * Может принимать строковое значение CSS-свойства flex.
     */
    flex?: React.CSSProperties['flex'];
    /**
     * Определяет отступы между дочерними элементами.
     * Может принимать строковое значение CSS-свойства gap или тип TSize.
     */
    gap?: React.CSSProperties['gap'] | TGap;
    /**
     * Дочерние элементы компонента.
     */
    children: React.ReactNode;
    /**
     * Кастомный компонент для отображения
     * По умолчанию div
     */
    component?: ComponentType<P>;
  } & HTMLAttributes<HTMLElement>;
}
