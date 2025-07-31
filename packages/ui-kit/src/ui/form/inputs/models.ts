import { ChangeEvent, CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';

import { InputRef } from 'antd';

import { TSize, TVariant } from '@/models';

import { NUseMask } from './useMask/types';

/**
 *  Неймспейс с типизацией Input
 */
export namespace NInput {
  type TStatus = 'error' | 'warning' | '';
  type THTMLProps = React.InputHTMLAttributes<HTMLInputElement>;

  export type TFocusOptions = FocusOptions & {
    cursor?: 'start' | 'end' | 'all';
  };

  export type TCommonProps = React.RefAttributes<InputRef> & {
    /**
     * label метки, отображаемый после (справа) комопнента
     */
    addonAfter?: ReactNode;
    /**
     * label метки, отображаемый перед (слева) компонентом
     */
    addonBefore?: ReactNode;
    /**
     * Очистка поля, можно передать контент значка очистки
     */
    isAllowClear?: boolean | { clearIcon: ReactNode };
    /**
     * Классы стилей
     */
    className?: string;
    /**
     * Состояние активности
     */
    isDisabled?: boolean;
    /**
     * Максимальное количество символов
     */
    maxLength?: number;
    /**
     * Показывать ли количество символов
     */
    showCount?: boolean;
    /**
     * Размер инпута
     */
    size?: TSize;
    /**
     * Статус компонента
     */
    status?: TStatus;
    /**
     * Стили компонента
     */
    style?: CSSProperties;
    /**
     * Значок суффикса для инпута
     */
    suffix?: ReactNode;
    /**
     * Тип инпута
     */
    type?: string;
    /**
     * Значение
     */
    value?: string | number | bigint | readonly string[];
    /**
     * Варант инпута
     */
    variant?: TVariant;
    /**
     * Обратный вызов при нажатии кнопки «Очистить»
     */
    onClear?: () => void;
    /**
     * Значок префикса для ввода
     */
    prefix?: ReactNode;
  };

  export type TProps = Omit<THTMLProps, 'size' | 'value' | 'type' | 'prefix'> &
    TCommonProps & {
      /**
       * Флаг только для чтения
       */
      isReadOnly?: boolean;
      /**
       * Обработчик нажатия
       */
      onClick?: (event: MouseEvent) => void;
      /**
       * Обработчик нажатия клавиши Enter
       */
      onPressEnter?: (event: KeyboardEvent) => void;
    };

  export type TMaskedProps = Omit<TProps, 'onChange'> & {
    /**
     * Маска ввода
     */
    mask: NUseMask.TUseMaskOptions['mask'];
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, maskedValue: string) => void;
  };

  export type TInputSearchProps = NInput.TProps & {
    /**
     * Показывать ли кнопку enter после ввода. Это свойство конфликтует со свойством addonAfter
     */
    enterButton?: boolean | ReactNode;
    /**
     * Обработчик срабатывает, когда вы нажимаете на значок поиска, значок очистки или нажимаете клавишу Enter
     */
    onSearch?: (
      value: string,
      event?: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLElement> | KeyboardEvent<HTMLInputElement>,
      info?: { source?: 'clear' | 'input' }
    ) => Promise<void> | void;
    /**
     * Отображение состояния загрузки
     */
    loading?: boolean;
  };

  type TVisibilityToggle = {
    /**
     * Возвращает состояние отображения пароля
     */
    visible?: boolean;
    /**
     * Сallback, вызываемый когда состояние отображения пароля изменилось
     */
    onVisibleChange?: (visible: boolean) => void;
  };

  export type TInputPasswordProps = NInput.TProps & {
    /**
     * Функция, для рендера кастомной кнопки переключения в зависимости от состояния
     * @example (visible) => (visible ? <IconVisible /> : <IconInvisible />)
     */
    iconRender?: (visible: boolean) => ReactNode;
    /**
     * Может быть двумя типами:
     * 1. Boolean: отображать/не отображать кнопку-toggle для изменения состояния (дефолт: true)
     * 2. Object: объект типа TVisibilityToggle
     */
    visibilityToggle?: boolean | TVisibilityToggle;
    /**
     * Включить floating label поведение
     * @default false
     */
    floatLabel?: boolean;
  };
}
