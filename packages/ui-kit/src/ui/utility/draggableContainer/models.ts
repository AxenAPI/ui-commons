import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import { Modifier } from '@dnd-kit/core';
import { SortingStrategy } from '@dnd-kit/sortable';

/**
 * Элемент для перетаскивания
 * @property id Уникальный идентификатор элемента
 * @property key Ключ для React-рендеринга
 * @property children Контент, который будет отображаться внутри элемента
 */
export type TDraggableContainerItem = {
  /** Уникальный идентификатор элемента */
  id: string;
  /** Ключ для React-рендеринга */
  key: string;
  /** Контент, который будет отображаться внутри элемента */
  children: ReactNode;
};

/**
 * Пропсы для компонента DraggableContainer
 * @property items Массив элементов для перетаскивания
 * @property onDragEndIndices Колбэк, вызываемый при завершении перетаскивания (возвращает индексы)
 * @property style Стили контейнера
 * @property gap Отступы между элементами (flex)
 * @property vertical Вертикальное расположение элементов (flex)
 * @property justify Выравнивание по главной оси (flex)
 * @property align Выравнивание по поперечной оси (flex)
 * @property strategy Стратегия сортировки dnd-kit
 * @property restrictToVerticalAxis Ограничение перетаскивания по вертикали
 * @property restrictToHorizontalAxis Ограничение перетаскивания по горизонтали
 */
export type TDraggableContainerProps = HTMLAttributes<HTMLDivElement> & {
  items?: TDraggableContainerItem[];
  /** Колбэк, вызываемый при завершении перетаскивания (возвращает индексы) */
  onDragEndIndices?: (activeIndex: number, overIndex: number) => void;
  /** Стили контейнера */
  style?: CSSProperties;
  /** Отступы между элементами (flex) */
  gap?: number;
  /** Вертикальное расположение элементов (flex) */
  vertical?: boolean;
  /** Выравнивание по главной оси (flex) */
  justify?: string;
  /** Выравнивание по поперечной оси (flex) */
  align?: string;
  /** Стратегия сортировки dnd-kit */
  strategy?: SortingStrategy;
  /** Ограничение перетаскивания по вертикали */
  restrictToVerticalAxis?: Modifier | undefined;
  /** Ограничение перетаскивания по горизонтали */
  restrictToHorizontalAxis?: Modifier | undefined;
};

export namespace NDraggableContainer {
  export type TItem = TDraggableContainerItem;
  export type TProps = TDraggableContainerProps;
}
