import React from 'react';
import { Mask } from 'react-text-mask';

import type { NInput } from '@/ui/form/inputs';

/**
 * Неймспейс с типизпцией TextArea
 */
export namespace NTextArea {
  export type TAutoSize = {
    minRows?: number;
    maxRows?: number;
  };

  export type THTMLProps = Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'disabled' | 'onResize' | 'required' | 'value'
  >;

  export type TProps = THTMLProps &
    NInput.TCommonProps & {
      value?: string;
      /**
       * Автоматическое изменение размера по высоте
       */
      autoSize?: boolean | TAutoSize;
      /**
       * Кол-во колонок textarea в символах
       */
      cols?: number;
      /**
       * Высота компонента
       */
      height?: string | number;
      /**
       * Размещение контекта сверху
       */
      isTopContent?: boolean;
      /**
       * Текст-плейсхолдер
       */
      placeholder?: string;
      /**
       * Кол-во строк
       */
      rows?: number;
      /**
       * Коллбэк при изменении значения поля
       */
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
      /**
       * Стили для отображения значения input, когда прокинута props isTopContent
       */
      inputValueClassName?: string;
      /**
       * Включить floating label поведение
       * @default false
       */
      floatLabel?: boolean;
    };

  export type TMaskedProps = Omit<TProps, 'onChange'> & {
    /**
     * Маска ввода
     */
    mask: Mask | ((value: string) => Mask);
    value?: string;
    /**
     * Заполнитель инпута
     */
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, maskedValue: string) => void;
  };
}
