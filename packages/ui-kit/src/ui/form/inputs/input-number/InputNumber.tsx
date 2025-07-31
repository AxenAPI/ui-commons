import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

import { InputNumber as AntdInputNumber } from 'antd';

import { FloatLabel } from '@/ui/utility/floatLabel/index.tsx';

import { TInputNumberProps } from './models.ts';

const currencySymbols = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
};

const InputNumberComponent = (
  {
    currency,
    currencyPosition = 'suffix',
    decimalPlaces = 0,
    thousandSeparator = ' ',
    decimalSeparator = ',',
    controlArrows = false,
    formatter,
    parser,
    precision,
    title,
    floatLabel = false,
    placeholder,
    value,
    size,
    ...props
  }: TInputNumberProps,
  ref: React.ForwardedRef<any>
) => {
  const currRef = useRef<any>(null);

  const currencySymbol = currency ? currencySymbols[currency] : '';

  useImperativeHandle(ref, () => currRef.current);

  // Определяем префикс и суффикс
  const { prefix, suffix } = useMemo(() => {
    let prefix = undefined;
    let suffix = undefined;

    if (currencySymbol) {
      if (currencyPosition === 'prefix') {
        prefix = currencySymbol;
      } else {
        suffix = currencySymbol;
      }
    }

    return { prefix, suffix };
  }, [currencySymbol, currencyPosition]);

  // Создаем formatter для денежных значений
  const defaultFormatter = useMemo(() => {
    if (formatter) return formatter;

    return (value: string | number | undefined) => {
      if (value === undefined || value === null || value === '') return '';

      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) return '';

      // Форматируем число с нужным количеством знаков после запятой
      const formatted = numValue.toFixed(decimalPlaces);

      // Заменяем точку на нужный десятичный разделитель
      let result = formatted.replace('.', decimalSeparator);

      // Добавляем разделители тысяч
      const parts = result.split(decimalSeparator);
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
      result = parts.join(decimalSeparator);

      return result;
    };
  }, [formatter, decimalPlaces, decimalSeparator, thousandSeparator]);

  // Создаем parser для денежных значений
  const defaultParser = useMemo(() => {
    if (parser) return parser;

    return (value: string | undefined) => {
      if (!value) return '';

      // Убираем разделители тысяч и заменяем десятичный разделитель на точку
      let cleanValue = value.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '').replace(decimalSeparator, '.');

      // Убираем все кроме цифр, точки и минуса
      cleanValue = cleanValue.replace(/[^\d.-]/g, '');

      return cleanValue as unknown as number;
    };
  }, [parser, thousandSeparator, decimalSeparator]);

  const InputNumber = (ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    return (
      <AntdInputNumber
        {...props}
        ref={ref}
        prefix={prefix}
        suffix={suffix}
        controls={controlArrows}
        formatter={defaultFormatter}
        parser={defaultParser}
        precision={precision ?? decimalPlaces}
        placeholder=""
        value={value}
        size={size}
      />
    );
  };

  // Если floatLabel выключен, рендерим обычный InputNumber
  if (!floatLabel) return InputNumber(ref);

  return (
    <FloatLabel value={value} size={size} placeholder={placeholder as string} title={title as string}>
      {InputNumber(currRef)}
    </FloatLabel>
  );
};

export const InputNumber = forwardRef(InputNumberComponent);
