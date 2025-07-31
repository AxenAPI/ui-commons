import { ReactElement } from 'react';

export namespace NPageSpinner {
  export type TSize = 'small' | 'default' | 'large';

  export type TProps = {
    children?: React.ReactNode;
    className?: string;
    /**
     * Указывает задержку в миллесендах на загрузку состояния
     */
    delay?: number;
    /**
     * Индикатор, используемый вместо стандартного спиннера
     */
    indicator?: ReactElement<HTMLElement>;
    isFullscreen?: boolean;
    isSpinning?: boolean;
    /**
     * Префикс для CSS классов
     */
    prefixCls?: string;
    rootClassName?: string;
    size?: TSize;
    style?: React.CSSProperties;
    /**
     * Текст или элемент отображаемый рядом с компонентом, если у него его дочерние элементы
     */
    tip?: React.ReactNode;
    wrapperClassName?: string;
    /**
     * Отображает спинер по контейнеру
     */
    isFullContent?: boolean;
  };
}
