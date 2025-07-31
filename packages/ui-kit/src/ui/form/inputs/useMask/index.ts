import { useEffect, useRef, useState } from 'react';

import { NUseMask } from '@/ui/form/inputs/useMask/types.ts';

/**
 * Хук для работы с маской ввода. Обеспечивает форматирование введённых данных
 * в соответствии с заданной маской, а также управляет позицией курсора.
 *
 * @param {TUseMaskOptions} options - Параметры хука.
 * @param {TMaskProps | ((value: string) => TMaskProps)} options.mask - Маска ввода, представленная массивом строк и/или регулярных выражений.
 * Строки являются фиксированными символами, которые автоматически добавляются в значение.
 * Регулярные выражения определяют допустимые символы для ввода.
 * @param {string} [options.initValue=''] - Начальное значение.
 *
 * @returns {Object} Результат работы хука.
 * @returns {string} maskedValue - Текущее отформатированное значение.
 * @returns {function} handleChange - Функция для обработки изменения ввода.
 * Принимает два параметра: значение ввода и текущую позицию курсора.
 * @returns {function} handleCursorChange - Функция для установки позиции курсора.
 * Принимает HTMLInputElement и обновляет позицию курсора в соответствии с маской.
 */
export function useMask({ mask, initValue = '' }: NUseMask.TUseMaskOptions) {
  const lastManualValue = useRef<string>(initValue);
  const isExternalUpdate = useRef<boolean>(true);
  /**
   * Получает маску на основе текущего значения.
   *
   * @param {string} value - Текущее значение.
   * @returns {Mask} Маска ввода.
   */
  const getMask = (value: string): NUseMask.TMaskProps => {
    return typeof mask === 'function' ? mask(value) : mask;
  };

  /**
   * Применяет маску к исходному значению.
   *
   * @param {string} rawValue - Исходное значение без форматирования.
   * @returns {string} Отформатированное значение.
   */
  const applyMask = (rawValue: string) => {
    const currentMask = getMask(rawValue);
    let masked = '';
    let rawIndex = 0;

    for (let i = 0; i < currentMask.length && rawIndex < rawValue.length; i++) {
      const maskItem = currentMask[i];
      const char = rawValue[rawIndex];

      if (typeof maskItem === 'string') {
        masked += maskItem;
        if (char === maskItem) {
          rawIndex++;
        }
      } else {
        if (maskItem.test(char)) {
          masked += char;
          rawIndex++;
        } else {
          rawIndex++;
          i--;
        }
      }
    }

    return masked;
  };

  const [maskedValue, setMaskedValue] = useState(applyMask(initValue));
  const cursorPositionRef = useRef<number>(0);

  /**
   * Рассчитывает позицию курсора после изменения значения.
   *
   * @param {string} prevMaskedValue - Предыдущее отформатированное значение.
   * @param {string} newMaskedValue - Новое отформатированное значение.
   * @param {number} prevCursorPosition - Предыдущая позиция курсора.
   * @returns {number} Новая позиция курсора.
   */
  const calculateCursorPosition = (prevMaskedValue: string, newMaskedValue: string, prevCursorPosition: number) => {
    const currentMask = getMask(newMaskedValue);

    const lengthDifference = newMaskedValue.length - prevMaskedValue.length;
    let newCursorPosition = prevCursorPosition;

    if (lengthDifference < 0) {
      while (newCursorPosition > 0 && typeof currentMask[newCursorPosition - 1] === 'string') {
        newCursorPosition--;
      }
    } else if (lengthDifference > 0) {
      newCursorPosition += lengthDifference;
    }

    if (newCursorPosition < 0) newCursorPosition = 0;
    if (newCursorPosition > newMaskedValue.length) {
      newCursorPosition = newMaskedValue.length;
    }

    return newCursorPosition;
  };

  /**
   * Обрабатывает изменение ввода, обновляя значение и позицию курсора.
   *
   * @param {string} inputValue - Текущее значение ввода.
   * @param {number} cursorPosition - Текущая позиция курсора.
   *
   * @returns {string} - Новое значение ввода отформатированное по маске.
   */
  const handleChange = (inputValue: string, cursorPosition: number): string => {
    lastManualValue.current = inputValue;
    isExternalUpdate.current = false;

    const newMaskedValue = applyMask(inputValue);
    cursorPositionRef.current = calculateCursorPosition(inputValue, newMaskedValue, cursorPosition);
    setMaskedValue(newMaskedValue);
    return newMaskedValue;
  };

  // Синхронизация при внешних изменениях
  useEffect(() => {
    if (!lastManualValue.current || initValue !== lastManualValue.current) {
      isExternalUpdate.current = true;
      setMaskedValue(initValue);
      cursorPositionRef.current = initValue.length;
    }
  }, [initValue]);

  /**
   * Устанавливает позицию курсора в элементе ввода.
   *
   * @param {HTMLInputElement} input - Элемент ввода, в котором нужно обновить позицию курсора.
   */
  const handleCursorChange = (input: HTMLInputElement) => {
    input.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
  };

  return {
    maskedValue,
    handleChange,
    handleCursorChange,
    cursorPositionRef,
  };
}
