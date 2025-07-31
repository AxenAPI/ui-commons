import React, { AriaAttributes, CSSProperties, FC, MouseEvent, ReactNode } from 'react';

import { NButton } from '@/ui/buttons';

/**
 * Неймспейс с типизацией NCommonModal
 */

export namespace NCommonModal {
  type TClosable = boolean | TBaseClosable;

  type TBaseClosable = {
    closeIcon?: React.ReactNode;
  } & AriaAttributes;

  type TModalFooterRender = (
    originNode: React.ReactNode,
    extra: {
      OkBtn: FC;
      CancelBtn: FC;
    }
  ) => React.ReactNode;

  type TModalClassNames = {
    header?: string;
    body?: string;
    footer?: string;
    mask?: string;
    content?: string;
    wrapper?: string;
  };

  type TModalStyles = {
    header?: CSSProperties;
    body?: CSSProperties;
    footer?: CSSProperties;
    mask?: CSSProperties;
    content?: CSSProperties;
    wrapper?: CSSProperties;
  };

  export type TMousePosition = {
    x: number;
    y: number;
  } | null;

  type TOkProps = 'default' | 'primary' | 'link' | 'text';

  type TModalType = 'default' | 'error' | 'info' | 'success' | 'warning';

  export type TModalProps = {
    /**
     * Флаг состояния открытия окна
     */
    isOpen?: boolean;
    /**
     * Иконка в заголовке
     */
    icon?: ReactNode;
    /**
     * Флаг применения визуального эффекта загрузки для кнопки подтверждения
     */
    isConfirmLoading?: boolean;
    /**
     * Флаг применения визуального эффекта загрузки для всего модального окна
     */
    isLoading?: boolean;
    /**
     * Заголовок
     */
    title?: ReactNode;
    /**
     * Управление возможностями закрытия модального окна
     */
    closable?: TClosable;
    /**
     * Коллбек нажатия кнопки подтверждения
     */
    onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Коллбек нажатия кнопки отмены
     */
    onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Коллбек события после закрытия модального окна
     */
    afterClose?: () => void;
    /**
     * Коллбек изменения состояния модального окна
     */
    afterOpenChange?: (isOpen: boolean) => void;
    /**
     * Флаг центрирования модального окна
     */
    centered?: boolean;
    /**
     * Ширина
     */
    width?: string | number;
    footer?: TModalFooterRender | ReactNode;
    /**
     * Текст кнопки подтверждения
     */
    okText?: ReactNode;
    /**
     * Тип кнопки подтверждения
     */
    okType?: TOkProps;
    /**
     * Текст кнопки отмены
     */
    cancelText?: ReactNode;
    /**
     * Флаг: закрывать ли модальное диалоговое окно при нажатии на маску (область вне модального окна)
     */
    maskClosable?: boolean;
    /**
     * Флаг принудительного рендеринга модального окна
     */
    forceRender?: boolean;
    okButtonProps?: NButton.TProps;
    cancelButtonProps?: NButton.TProps;
    destroyOnClose?: boolean;
    style?: CSSProperties;
    wrapClassName?: string;
    /**
     * Имя класса маски анимации
     */
    maskTransitionName?: string;
    /**
     * Имя класса анимации
     */
    transitionName?: string;
    className?: string;
    rootClassName?: string;
    /**
     * Объект конфигурации стилей компонента через классы
     */
    classNames?: TModalClassNames;
    /**
     * Объект конфигурации стилей компонента через css-свойства
     */
    styles?: TModalStyles;
    /**
     * Установленный узел для модального окна
     */
    getContainer?: string | HTMLElement | (() => HTMLElement) | false;
    zIndex?: number;
    /**
     * Флаг отображения маски
     */
    mask?: boolean;
    /**
     * Флаг: возможность закрытия по ESC
     */
    keyboard?: boolean;
    prefixCls?: string;
    closeIcon?: ReactNode;
    /**
     * Рендеринг кастомного содержимого модального окна
     * @param node
     */
    modalRender?: (node: ReactNode) => ReactNode;
    /**
     * Флаг фокусировки элемента-триггера после закрытия окна
     */
    focusTriggerAfterClose?: boolean;
    /**
     * Содержимое модального окна
     */
    children?: ReactNode;
    /**
     * Позиция мыши
     */
    mousePosition?: TMousePosition;
    /**
     * Тип модального окна
     */
    modalType?: TModalType;
  };
}
