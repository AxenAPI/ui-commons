import { CSSProperties, ReactNode } from 'react';

/**
 * Неймспейс с типизацией NMessage
 */
export namespace NMessage {
  export type TType = 'normal' | 'success' | 'error' | 'warning' | 'loading';

  /**
   * Пропсы для компонента Message
   */
  export type TProps = {
    /**
     * Тип сообщения (визуальное состояние):
     * - 'normal' — информационное сообщение
     * - 'success' — успешное действие
     * - 'error' — ошибка
     * - 'warning' — предупреждение
     * - 'loading' — индикатор загрузки
     * @default 'normal'
     */
    type?: TType;
    /**
     * Основное содержимое сообщения (текст или React-элемент)
     */
    content: ReactNode;
    /**
     * Дополнительный CSS-класс для корневого элемента
     */
    className?: string;
    /**
     * Inline-стили для корневого элемента
     */
    style?: CSSProperties;
    /**
     * Кастомная иконка (по умолчанию используется иконка по типу)
     */
    icon?: ReactNode;
    /**
     * Время (мс) автозакрытия сообщения. Если не указано — сообщение не исчезает автоматически
     */
    duration?: number;
    /**
     * Колбэк при закрытии сообщения (по таймеру или вручную)
     */
    onClose?: () => void;
  };
}
