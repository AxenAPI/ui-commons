import { CSSProperties, ReactNode } from 'react';

import { TVariant } from '@/models';

import { NUseMask } from '../inputs/useMask/types';

/**
 * Неймспейс с типизацией AutoComplete
 */
export namespace NAutoComplete {
  export type TStatus = 'error' | 'warning' | '';
  export type TOptions = {
    label?: ReactNode;
    value?: string | number | null;
  }[];

  export type TProps = {
    /**
     * Позволяет очистить значение
     */
    isAllowClear?: boolean | { clearIcon?: ReactNode };
    /**
     * Стили компонента
     */
    style?: CSSProperties;
    /**
     * Список сформированных подсказок
     */
    options?: TOptions;
    /**
     * Дочерние элементы
     */
    children?: ReactNode;
    /**
     * Открытое состояние по умолчанию
     */
    isDefaultOpen?: boolean;
    /**
     * Значение по умолчанию
     */
    defaultValue?: string;
    /**
     * Состояние активности компонента
     */
    isDisabled?: boolean;
    /**
     * CSS-класс для поповера
     */
    popupClassName?: string;
    /**
     * Настройка соотношения раскрывающегося меню и поле выбора
     */
    dropdownMatchSelectWidth?: boolean | number;
    /**
     * Контент, отображаемый при отсутствии результатов поиска
     */
    notFoundContent?: ReactNode;
    /**
     * Флаг состояния открытия окна
     */
    isOpen?: boolean;
    /**
     * Текстовая подсказка
     */
    placeholder?: string;
    /**
     * Статус валидации поля
     */
    status?: TStatus;
    /**
     * Максимальное количество символов
     */
    maxLength?: number;
    /**
     * Тип компонента
     */
    variant?: TVariant;
    /**
     * Значение поля
     */
    value?: string;
    /**
     * Функция обратного вызова при потере фокуса компонента
     */
    onBlur?: () => void;
    /**
     * Функция обратного вызова при фокусе на компоненте
     */
    onFocus?: () => void;
    /**
     * Функция обратного вызова при изменении состояния компонента
     */
    onChange?: (value: string) => void;
    /**
     * Функция обратного вызова при выборе значения компонента
     */
    onSelect?: (value: string) => void;
    /**
     * Обработчик поиска
     */
    onSearch?: (value: string) => void;
    /**
     * Функция обратного вызова раскрывающегося списка
     */
    onDropdownVisibleChange?: (open: boolean) => void;
  };

  export type TMaskedProps = Omit<TProps, 'onChange'> & {
    /**
     * Маска ввода
     */
    mask: NUseMask.TUseMaskOptions['mask'];
    value?: string;
    /**
     * Заполнитель автокомплита
     */
    placeholder?: string;
    onChange?: (value: string) => void;
  };
}
