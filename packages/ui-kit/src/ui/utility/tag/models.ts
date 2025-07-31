import { MouseEvent } from 'react';

import { TExtendedThemeConfig } from '@/providers';

export namespace NTag {
  export type TTagPresetColor =
    | 'blue'
    | 'purple'
    | 'cyan'
    | 'green'
    | 'magenta'
    | 'red'
    | 'orange'
    | 'volcano'
    | 'geekblue'
    | 'lime'
    | 'gold';

  type TAddInverse<T extends string> = `${T}-inverse`;
  type TPresetColorInverseType = TAddInverse<TTagPresetColor>;
  export type TPresetColorType = TTagPresetColor | TPresetColorInverseType;
  export type TIsClosable =
    | boolean
    | ({
        closeIcon?: React.ReactNode;
      } & React.AriaAttributes);

  export type TTagStatus = 'success' | 'processing' | 'error' | 'default' | 'warning';
  type TTagTokens = keyof Exclude<Exclude<TExtendedThemeConfig['components'], undefined>['Tag'], undefined>;

  export type TTagStatusColors<T extends TTagPresetColor | TTagStatus> = {
    [status in T]: {
      border: TTagTokens;
      bg: TTagTokens;
      color: TTagTokens;
    };
  };

  export type TProps = React.HTMLAttributes<HTMLSpanElement> & {
    /**
     * Идентификатор фильтра
     */
    filterId?: string;
    /**
     * Префикс для CSS-классов.
     */
    prefixCls?: string;
    /**
     * Классы стилей.
     */
    className?: string;
    /**
     * Классы стилей родителя.
     */
    rootClassName?: string;
    /**
     * Цвет тега.
     */
    color?: TTagPresetColor;
    /**
     * Состояние отображения иконки для закрытия.
     */
    isClosable?:
      | boolean
      | ({
          closeIcon?: React.ReactNode;
        } & React.AriaAttributes);
    /**
     * Пользовательский значок закрытия.
     */
    closeIcon?: React.ReactNode;
    /**
     * Функция, отвечающая за закрытие тега.
     */
    onClose?: (event: MouseEvent) => void;
    /**
     * Функция клика по лейблу фильтра
     */
    onLabelClick?: (id?: string) => void;
    /**
     * Классы стилей.
     */
    style?: React.CSSProperties;
    /**
     * Отображаемая иконка.
     */
    icon?: React.ReactNode;
    /**
     * Состояние стилей границы.
     */
    isBordered?: boolean;
    /**
     * Дочерние эл-ты компонента.
     */
    children?: React.ReactNode;
    /**
     * Статус тега
     */
    status?: TTagStatus;
    /**
     * Состояние атрибута dashed
     */
    isDashed?: boolean;
    /**
     * Тег типа сheckable
     */
    isCheckable?: boolean;
    /**
     * Тег типа сheckable  с обводкой и фоном
     */
    isCheckableBorder?: boolean;
    /**
     * Показывать тултип при обрезке текста
     */
    showTooltip?: boolean;
    /**
     * Текст для отображения внутри тэга (альтернатива children)
     */
    text?: string;
  } & (
      | {
          /**
           * @property {boolean} [isCheckable] - Флаг для возможности переключения состояния isChecked.
           */
          isCheckable?: false;
          /**
           * @property {boolean} [isCheckableBorder] - Флаг для возможности переключения состояния isChecked.
           */
          isCheckableBorder?: false;
          /**
           * @property {boolean} [isChecked] - Состояние isChecked. Доступно, если isCheckable === true.
           */
          isChecked?: undefined;
          /**
           * @property {Function} [onCheck] - Функция, отвечающая за переключение состояния isChecked. Доступно, если isCheckable === true.
           */
          onCheck?: undefined;
        }
      | {
          /**
           * @property {boolean} [isCheckable] - Флаг для возможности переключения состояния isChecked.
           */
          isCheckable: true;
          /**
           * @property {boolean} [isChecked] - Состояние isChecked. Доступно, если isCheckable === true.
           */
          isChecked: boolean;
          /**
           * @property {Function} [onCheck] - Функция, отвечающая за переключение состояния isChecked. Доступно, если isCheckable === true.
           */
          onCheck: () => void;
        }
      | {
          /**
           * @property {boolean} [isCheckable] - Флаг для возможности переключения состояния isChecked.
           */
          isCheckableBorder: true;
          /**
           * @property {boolean} [isChecked] - Состояние isChecked. Доступно, если isCheckable === true.
           */
          isChecked: boolean;
          /**
           * @property {Function} [onCheck] - Функция, отвечающая за переключение состояния isChecked. Доступно, если isCheckable === true.
           */
          onCheck: () => void;
        }
    );
}
