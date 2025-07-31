import { ReactNode } from 'react';

export namespace NTimeline {
  /**
   * Элемент массива items для Timeline
   */
  export type TItem = {
    /**
     * Контент элемента timeline.
     */
    children: ReactNode;
    /**
     * Позиция head/контента: 'left' или 'right'. Если не указано — определяется автоматически по mode.
     */
    position?: 'left' | 'right';
    /**
     * Кастомный цвет head (dot), например 'green', 'red', '#04B54B', 'var(--colorSuccess)'.
     */
    color?: string;
    /**
     * Лейбл для alternate-режима (отображается слева или справа от head/tail)
     */
    label?: React.ReactNode;
    /**
     * Кастомная иконка для head (dot), например <svg /> или emoji
     */
    dot?: React.ReactNode;
  };

  /**
   * Пропсы для Timeline
   */
  export type TProps = {
    /**
     * Массив элементов timeline.
     */
    items: TItem[];
    /**
     * Режим позиционирования head/контента:
     * - 'left' — все head слева
     * - 'alternate' — head чередуются слева/справа
     * - 'right' — все head справа
     * - 'horizontal' — head/tail/content располагаются горизонтально
     */
    mode?: 'left' | 'alternate' | 'right' | 'horizontal';
  };
}
