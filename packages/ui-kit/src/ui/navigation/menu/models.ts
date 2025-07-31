import { CSSProperties, ReactNode } from 'react';

import { ItemType } from 'antd/lib/menu/interface';

/**
 * Неймспейс с типизацией NMenu
 */

export namespace NMenu {
  /** типы из antd */
  /** onClick */
  export type TMenuInfo = {
    key: string;
    keyPath: string[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
  };
  export type TMenuClickEventHandler = (info: TMenuInfo) => void;

  /** expandIcon */
  export type TRenderIconInfo = {
    isSelected?: boolean;
    isOpen?: boolean;
    isSubMenu?: boolean;
    disabled?: boolean;
  };
  export type TRenderIconType = React.ReactNode | ((props: TRenderIconInfo) => React.ReactNode);

  /** onSelect */
  export type TSelectInfo = {
    selectedKeys: string[];
  } & TMenuInfo;
  export type TTSelectEventHandler = (info: TSelectInfo) => void;

  export type TProps = {
    /**
     * Массив с ключами по умолчанию открытых пунктов подменю
     */
    defaultOpenKeys?: string[];
    /**
     * Массив с ключами выбранных по умолчанию пунктов меню
     */
    defaultSelectedKeys?: string[];
    /**
     * Пользовательская иконка открытого пункта подменю
     */
    expandIcon?: TRenderIconType;
    /**
     * Отобразить подменю в DOM до того, как оно станет видимым
     */
    isForceSubMenuRender?: boolean;
    /**
     * Указывает свернутое состояние, когда меню находится в строчном режиме
     */
    isInlineCollapsed?: boolean;
    /**
     * Отступ (в пикселях) элементов встроенного меню на каждом уровне
     */
    inlineIndent?: number;
    /**
     * Содержание пункта меню
     */
    items?: ItemType[];
    /**
     * Тип меню
     */
    mode?: 'vertical' | 'horizontal' | 'inline';
    /**
     * Позволяет выбрать несколько элементов
     */
    isMultiple?: boolean;
    /**
     * Массив с ключами открытых в данный момент пунктов подменю
     */
    openKeys?: string[];
    /**
     * Кастомизация значок многоточия, когда меню свернуто горизонтально
     */
    overflowedIndicator?: ReactNode;
    /**
     * Позволяет выбирать пункты меню
     */
    isSelectable?: boolean;
    /**
     * Массив с ключами текущих выбранных пунктов меню
     */
    selectedKeys?: string[];
    style?: CSSProperties;
    /**
     * Время задержки скрытия подменю при уходе мыши (в секундах)
     */
    subMenuCloseDelay?: number;
    /**
     * Время задержки отображения подменю при вводе мыши (в секундах)
     */
    subMenuOpenDelay?: number;
    /**
     * Цветовая тема меню
     */
    theme?: 'light' | 'dark';
    /**
     * Какое действие может вызвать открытие/закрытие подменю
     */
    triggerSubMenuAction?: 'hover' | 'click';
    /**
     * Обработчик события клика по пункту меню
     * @param info
     */
    onClick?: (info: TMenuInfo) => void;
    /**
     * Вызывается при отмене выбора пункта меню (только в режиме множественного выбора)
     */
    onDeselect?: TTSelectEventHandler;
    /**
     * Вызывается при открытии или закрытии подменю
     */
    onOpenChange?: (openKeys: string[]) => void;
    /**
     * Вызывается при выборе пункта меню
     */
    onSelect?: TTSelectEventHandler;
  };

  export type TLevelKeysProps = {
    key?: string;
    children?: TLevelKeysProps[];
  };
}
