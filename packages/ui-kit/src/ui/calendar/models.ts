import * as React from 'react';

import enUS from 'antd/es/calendar/locale/en_US';
import type { CellRenderInfo } from 'rc-picker/lib/interface';

/**
 * Неймспейс с типизацией NCalendar
 */

export namespace NCalendar {
  type TSelectInfo = {
    source: 'year' | 'month' | 'date' | 'customize';
  };

  type TCalendarMode = 'year' | 'month';

  type THeaderRender<TDateType> = (config: {
    value?: TDateType;
    type: TCalendarMode;
    onChange: (date: TDateType) => void;
    onTypeChange: (type: TCalendarMode) => void;
  }) => React.ReactNode;

  export type TProps<TDateType> = {
    /**
     * Настройка содержимого ячеек
     */
    cellRender?: (date: TDateType, info: CellRenderInfo<TDateType>) => React.ReactNode;
    /**
     * Настройте отображение ячейки даты, возвращаемое содержимое будет переопределять ячейку
     */
    dateFullCellRender?: (date: TDateType) => React.ReactNode;
    /**
     * Настройка содержимого ячеек
     */
    fullCellRender?: (date: TDateType, info: CellRenderInfo<TDateType>) => React.ReactNode;
    /**
     * Дата, выбранная по умолчанию
     */
    defaultValue?: TDateType;
    /**
     * Функция, определяющая даты, которые не могут быть выбраны
     */
    disabledDate?: (date: TDateType) => boolean;
    /**
     * Отображать ли полноэкранный режим
     */
    isFullscreen?: boolean;
    /**
     * Отображение пользовательского заголовка на панели
     */
    headerRender?: THeaderRender<TDateType>;
    /**
     * Локаль календаря
     */
    locale?: typeof enUS;
    /**
     * Режим отображения календаря
     */
    mode?: TCalendarMode;
    /**
     * Чтобы установить допустимый диапазон
     */
    validRange?: [TDateType, TDateType];
    /**
     * Текущая выбранная дата
     */
    value?: TDateType;
    /**
     * Колбек при изменении даты
     */
    onChange?: (date: TDateType) => void;
    /**
     * Колбек при изменении панели
     */
    onPanelChange?: (date: TDateType, mode: TCalendarMode) => void;
    /**
     * Колбек при выборе даты, включающий информацию об источнике
     */
    onSelect?: (date: TDateType, selectInfo: TSelectInfo) => void;
    /**
     * Отображать ли номер недели
     */
    shouldShowWeek?: boolean;
  };
}
