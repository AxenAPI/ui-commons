import { Key } from 'react';

import { SpinProps } from 'antd';

import { TAnyObject, TSize } from '@/models';
import { NColumns, NCommonTable } from '@/ui';

export namespace NTable {
  export type TColumn<T extends TAnyObject> = NColumns.TColumnType<T>;

  export type TTableProps<T extends TAnyObject> = {
    isBordered?: boolean;
    className?: string;
    columns?: NColumns.TColumnsType<T>;
    components?: NCommonTable.TTableComponents<T>;
    data?: T[];
    // Список столбцов, отображаемых по-умолчанию.
    // (элементы должны совпадать с ключами столбцов из конфига таблицы, которые нужны для отображения).
    defaultVisibleColumnsList?: Key[];
    expandable?: NCommonTable.TExpandableConfig<T>;
    footer?: NCommonTable.TPanelRender<T>;
    getPopupContainer?: NCommonTable.TGetPopupContainer;
    // TODO Implement SpinProps
    isLoading?: boolean | SpinProps;
    locale?: NCommonTable.TTableLocale;
    pagination?: false | NCommonTable.TTablePaginationConfig;
    rowClassName?: string | NCommonTable.TRowClassName<T>;
    rowKey?: string | keyof T | NCommonTable.TGetRowKey<T>;
    rowSelection?: NCommonTable.TTableRowSelection<T>;
    rowHoverable?: boolean;
    scroll?: {
      scrollToFirstRowOnChange?: boolean;
      x?: number | true | string;
      y?: number | string;
    };
    shouldShowHeader?: boolean;
    showSorterTooltip?: boolean | NColumns.TSorterTooltipProps;
    size?: TSize;
    sortDirections?: NCommonTable.TSortOrder[];
    isSticky?: boolean | NCommonTable.TTableSticky;
    summary?: (data: readonly T[]) => React.ReactNode;
    tableLayout?: NCommonTable.TTableLayout;
    title?: NCommonTable.TPanelRender<T>;
    /** фиксированные отступ для блока title (antd)
     *  отменяет изменение paddings для title при изменении свойства size таблицы antd
     */
    fixedTitlePadding?: number;
    isVirtual?: boolean;
    onChange?: NCommonTable.TOnTableChange<T>;
    onHeaderRow?: NCommonTable.TGetComponentProps<readonly NColumns.TColumnType<T>[]>;
    onRow?: NCommonTable.TGetComponentProps<T>;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    style?: React.CSSProperties;
    /**Показывать кнопку настройки колонок таблицы */
    isNeedToShowSettingsCell?: boolean;
    /** Скрыть горизонтальный скролл и бордер */
    isScrollHidden?: boolean;
    /**Рендер экшн кнопок таблицы */
    renderAction?: (record: T) => {
      render: (isActive: boolean) => React.ReactElement;
      activeAfterClick?: boolean;
      actionKey: string;
      description?: string;
      isSelected?: boolean;
    }[] /**Настройки экшн колонки */;
    columnActionSettings?: NColumns.TColumnType<T>;
    /**Иконка настройки колонки таблицы */
    iconSettings?: React.ReactNode;
    /**Иконка выбранной колонки в настройках */
    iconSettingsCheck?: React.ReactNode;
    withHeaderTransparent?: boolean;
    /**Значение для пустых колонок, по умолчанию '-' */
    emptyColumnValue?: string;
  };
}
