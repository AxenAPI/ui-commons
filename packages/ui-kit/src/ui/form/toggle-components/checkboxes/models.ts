import React from 'react';

import { NCommonToggleComponents } from '../_common/models';

/**
 * Неймспейс с типизацией NCheckbox
 */
export namespace NCheckbox {
  type TChangeEventTarget = TProps & {
    checked: boolean;
  };

  export type TChangeEvent = {
    target: TChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
  };

  export type TProps = Omit<
    NCommonToggleComponents.TAbstractCheckbox<TChangeEvent>,
    'checked' | 'disabled' | 'autoFocus' | 'required' | 'defaultChecked'
  > & {
    /**
     * Состояние активности флажка
     */
    isChecked?: boolean;
    /**
     * Состояние активности компонента
     */
    isDisabled?: boolean;
    /**
     * Состояние режима чтения
     */
    isReadonly?: boolean;
    /**
     * Автофокус
     */
    isAutoFocus?: boolean;
    /**
     * Начальное состояние активности флажка
     */
    shouldDefaultChecked?: boolean;
    /**
     * Обязательное поле
     */
    isRequired?: boolean;
    /**
     * Текущее выбранное значение
     */
    value?: boolean;
    /**
     * Состояние, указывающее, что чекбокс находится в неопределенном состоянии
     */
    indeterminate?: boolean;
    /**
     * Обработчик изменения состояния
     * @param e
     */
    onChange?: (e: TChangeEvent) => void;
    /**
     * Дочерние элементы
     */
    children?: React.ReactNode;
  };

  export type TGroupProps<T extends NCommonToggleComponents.TCheckboxValue = NCommonToggleComponents.TCheckboxValue> =
    NCommonToggleComponents.TAbstractCheckboxGroup<T> & {
      /**
       * Название группы чекбоксов
       */
      name?: string;
      defaultValue?: T[];
      value?: T[];
      isDisabled?: boolean;
      onChange?: (checkedValue: T[]) => void;
      children?: React.ReactNode;
      isReadonly?: boolean;
    };
}
