import * as React from 'react';

import { XOR } from 'ts-xor';

/**
 * Неймспейс с типизацией Drawer
 */
export namespace NDrawer {
  export type TSizeType = 'default' | 'large';
  export type TPlacement = 'left' | 'top' | 'right' | 'bottom';

  export declare type TContainerType = Element | DocumentFragment;
  export declare type TGetContainer = string | TContainerType | (() => TContainerType) | false;

  export type TPushConfig = {
    distance?: number | string;
  };

  export type TClassNames = {
    mask?: string;
    wrapper?: string;
    content?: string;
  };

  export type TStyles = {
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    footer?: React.CSSProperties;
  };

  export type TPortalProps = {
    getContainer?: TGetContainer;
    children?: React.ReactNode;
    open?: boolean;
    autoDestroy?: boolean;
    autoLock?: boolean;
    debug?: string;
  };

  export type TDefaultFooterProps = {
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    cancelBtnText?: string;
    onCancel?: () => void;
    acceptBtnText?: string;
    onAccept?: () => void;
  };

  export type TBaseProps = {
    /**
     * Состояние фокуса после открытия
     */
    autoFocus?: boolean;
    /**
     * Состояние компонента после открытия
     */
    afterOpenChange?: (open: boolean) => void;
    /**
     * Стили компонента
     */
    style?: React.CSSProperties;
    /**
     * Классы стилей
     */
    className?: string;
    /**
     * Классы для разных частей компонента
     */
    classNames?: TClassNames;
    /**
     * Иконка закрытия
     */
    closeIcon?: React.ReactNode;
    /**
     * Состояние отвечающее за уничтожение компонента после закрытия
     */
    isDestroyOnClose?: boolean;
    /**
     * Область для дополнительных действий в углу компонента
     */
    extra?: React.ReactNode;
    /**
     * Состояние отвечающее за отрисовку компонента
     */
    isForceRender?: boolean;
    /**
     * Контейнер для рендеринга компонента
     */
    getContainer?: TPortalProps['getContainer'];
    /**
     * Высота компонента
     */
    height?: number | string;
    /**
     * Ширина компонента
     */
    width?: number | string;
    /**
     * Флаг, указывающий, надо ли реагировать на клавиатурные события
     */
    isKeyboard?: boolean;
    /**
     * Флаг, указывающий, надо ли рендерить маску
     */
    isMask?: boolean;
    /**
     * Флаг, указывающий, можно ли закрыть компонент по клику на маску
     */
    isMaskClosable?: boolean;
    /**
     * Позиция комопнента
     */
    placement?: TPlacement;
    /**
     * Состояние пуша
     */
    isPush?: boolean | TPushConfig;
    /**
     * Стили для корневого компонента
     */
    rootStyle?: React.CSSProperties;
    /**
     * Стили для разных частей компонента
     */
    styles?: TStyles;
    /**
     * Размер компонента
     */
    size?: TSizeType;
    /**
     * Заголовок компонента
     */
    title?: React.ReactNode;
    /**
     * Состояние загрузки компонента
     */
    isLoading?: boolean;
    /**
     * Состояние открытия компонента
     */
    isOpen?: boolean;
    /**
     * zIndex компонента
     */
    zIndex?: number;
    /**
     * Функция, вызываемая при закрытии компонента
     */
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    /**
     * Функция для рендеринга компонента
     */
    drawerRender?: (node: React.ReactNode) => React.ReactNode;
    /**
     * Дочерние элементы
     */
    children?: React.ReactNode;
    /**
     * Состояние изменения ширины компонента
     */
    isResizable?: boolean;
    /**
     * Минимальная ширина компонента
     */
    minWidth?: number | string;
    /**
     * Максимальная ширина компонента
     */
    maxWidth?: number | string;
    /**
     * Минимальная высота компонента
     */
    minHeight?: number | string;
    /**
     * Максимальная высота компонента
     */
    maxHeight?: number | string;
    /**
     * Флаг, убирающий все paddings у body Drawer:
     */
    withoutDrawerBodyPadding?: number | string;
  };

  export type TProps = TBaseProps &
    XOR<
      {
        /**
         * Дефолтный футер:
         */
        withDefaultFooter?: boolean;
        /**
         * Настройка пропсов для дефолтного футера:
         */
        defaultFooterProps?: Omit<TDefaultFooterProps, 'onClose'>;
      },
      {
        /**
         * Кастомный футер:
         */
        customFooter?: React.ReactNode;
      }
    >;

  export type TDrawerState = {
    drawerWidth: number | string;
    initialWidth: number | string;
    drawerHeight: number | string;
    initialHeight: number | string;
    initialX: number;
    initialY: number;
    isResizing: boolean;
  };
}
