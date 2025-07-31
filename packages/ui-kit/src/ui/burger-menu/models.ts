import { CSSProperties, ReactNode } from 'react';

export namespace NBurgerMenu {
  type TMergedHTMLAttributes = Omit<
    React.HTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>,
    'type'
  >;

  type TItemProps = {
    text: string;
    action: () => void;
  }

  export type TProps = TMergedHTMLAttributes & {
    /**
     * Стили компонента
     */
    style?: CSSProperties;
    /**
     * Классы стилей
     */
    className?: string;
    rootClassName?: string;
    menuButtonClassName?: string;
    /**
     * Дочерние элементы
     */
    children?: ReactNode;
    /**
     * Цвет элементов
     */
    color?: string;
    /**
     * Кнопки открывающегося 
     */
    items: TItemProps[];
  }
}