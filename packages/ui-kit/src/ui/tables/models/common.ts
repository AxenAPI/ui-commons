import { CheckboxProps } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import { NColumns } from './column';

/**
 * Неймспейс с типизацией NCommonTable
 */

export namespace NCommonTable {
  export type TPanelRender<TRecordType> = (data: readonly TRecordType[]) => React.ReactNode;
  export type TGetPopupContainer = (triggerNode: HTMLElement) => HTMLElement;
  export type TGetRowKey<TRecordType> = (record: TRecordType, index?: number) => TKey;
  export type TGetComponentProps<TDataType> = (
    data: TDataType,
    index?: number
  ) => React.HTMLAttributes<any> & React.TdHTMLAttributes<any>;
  export type TSortOrder = 'descend' | 'ascend' | null;
  export type TTableLayout = 'auto' | 'fixed';
  declare const TableActions: readonly ['paginate', 'sort', 'filter'];
  type TTableAction = (typeof TableActions)[number];
  type TTablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'none';
  export type TTableComponents<TRecordType> = {
    table?: TCustomizeComponent;
    header?: {
      table?: TCustomizeComponent;
      wrapper?: TCustomizeComponent;
      row?: TCustomizeComponent;
      cell?: TCustomizeComponent;
    };
    body?:
      | TCustomizeScrollBody<TRecordType>
      | {
          wrapper?: TCustomizeComponent;
          row?: TCustomizeComponent;
          cell?: TCustomizeComponent;
        };
  };
  type TCustomizeComponent = TComponent<any>;
  type TCustomizeScrollBody<TRecordType> = (
    data: readonly TRecordType[],
    info: {
      scrollbarSize: number;
      ref: React.Ref<{
        scrollLeft: number;
        scrollTo?: (scrollConfig: TScrollConfig) => void;
      }>;
      onScroll: TOnCustomizeScroll;
    }
  ) => React.ReactNode;
  type TScrollConfig = {
    index?: number;
    key?: TKey;
    top?: number;
  };
  type TOnCustomizeScroll = (info: { currentTarget?: HTMLElement; scrollLeft?: number }) => void;
  type TKey = React.Key;
  type TComponent<T> =
    | React.ComponentType<T>
    | React.ForwardRefExoticComponent<T>
    | React.FC<T>
    | keyof React.ReactHTML;
  export type TExpandableConfig<TRecordType> = {
    expandedRowKeys?: readonly TKey[];
    defaultExpandedRowKeys?: readonly TKey[];
    expandedRowRender?: TExpandedRowRender<TRecordType>;
    columnTitle?: React.ReactNode;
    expandRowByClick?: boolean;
    expandIcon?: TRenderExpandIcon<TRecordType>;
    onExpand?: (expanded: boolean, record: TRecordType) => void;
    onExpandedRowsChange?: (expandedKeys: readonly TKey[]) => void;
    defaultExpandAllRows?: boolean;
    indentSize?: number;
    showExpandColumn?: boolean;
    expandedRowClassName?: NCommonTable.TRowClassName<TRecordType>;
    childrenColumnName?: string;
    rowExpandable?: (record: TRecordType) => boolean;
    columnWidth?: number | string;
    fixed?: TFixedType;
  };
  type TExpandedRowRender<TValueType> = (
    record: TValueType,
    index: number,
    indent: number,
    expanded: boolean
  ) => React.ReactNode;
  type TRenderExpandIcon<TRecordType> = (props: TRenderExpandIconProps<TRecordType>) => React.ReactNode;
  export type TRowClassName<TRecordType> = (record: TRecordType, index: number, indent: number) => string;
  export type TFixedType = 'left' | 'right' | boolean;
  type TRenderExpandIconProps<TRecordType> = {
    prefixCls: string;
    expanded: boolean;
    record: TRecordType;
    expandable: boolean;
    onExpand: TTriggerEventHandler<TRecordType>;
  };
  type TTriggerEventHandler<TRecordType> = (record: TRecordType, event: React.MouseEvent<HTMLElement>) => void;

  // TODO Implement PaginationProps
  export type TTablePaginationConfig = {
    position?: TTablePaginationPosition[];
  } & PaginationProps;

  export type TTableLocale = {
    filterTitle?: string;
    filterConfirm?: React.ReactNode;
    filterReset?: React.ReactNode;
    filterEmptyText?: React.ReactNode;
    filterCheckall?: React.ReactNode;
    filterSearchPlaceholder?: string;
    emptyText?: React.ReactNode | (() => React.ReactNode);
    selectAll?: React.ReactNode;
    selectNone?: React.ReactNode;
    selectInvert?: React.ReactNode;
    selectionAll?: React.ReactNode;
    sortTitle?: string;
    expand?: string;
    collapse?: string;
    triggerDesc?: string;
    triggerAsc?: string;
    cancelSort?: string;
  };

  export type TTableRowSelection<T> = {
    preserveSelectedRowKeys?: boolean;
    type?: TRowSelectionType;
    selectedRowKeys?: TKey[];
    defaultSelectedRowKeys?: TKey[];
    onChange?: (
      selectedRowKeys: TKey[],
      selectedRows: T[],
      info: {
        type: TRowSelectMethod;
      }
    ) => void;
    // TODO Implement CheckboxProps
    getCheckboxProps?: (record: T) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
    onSelect?: TSelectionSelectFn<T>;
    selections?: TInternalSelectionItem[] | boolean;
    hideSelectAll?: boolean;
    fixed?: TFixedType;
    columnWidth?: string | number;
    columnTitle?: React.ReactNode | ((checkboxNode: React.ReactNode) => React.ReactNode);
    checkStrictly?: boolean;
    renderCell?: (
      value: boolean,
      record: T,
      index: number,
      originNode: React.ReactNode
    ) => React.ReactNode | TRenderedCell<T>;
    onCell?: TGetComponentProps<T>;
  };
  type TRowSelectionType = 'checkbox' | 'radio';
  type TRowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple';
  type TSelectionSelectFn<T> = (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
  type TInternalSelectionItem = TSelectionItem | typeof SELECTION_ALL | typeof SELECTION_INVERT | typeof SELECTION_NONE;

  type TSelectionItem = {
    key: string;
    text: React.ReactNode;
    onSelect?: TSelectionItemSelectFn;
  };
  type TSelectionItemSelectFn = (currentRowKeys: TKey[]) => void;
  export declare const SELECTION_ALL: 'SELECT_ALL';
  export declare const SELECTION_INVERT: 'SELECT_INVERT';
  export declare const SELECTION_NONE: 'SELECT_NONE';
  export type TRenderedCell<TRecordType> = {
    props?: TCellType<TRecordType>;
    children?: React.ReactNode;
  };
  type TCellType<TRecordType> = {
    key?: TKey;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    column?: NColumns.TColumnsType<TRecordType>[number];
    colSpan?: number;
    rowSpan?: number;
    hasSubColumns?: boolean;
    colStart?: number;
    colEnd?: number;
  };

  type TColumnTypeSorterResult<TRecordType> = {
    title?: NColumns.TColumnTitle<TRecordType>;
  } & Omit<NColumns.TColumnType<TRecordType>, 'title'>;

  export type TSorterResult<TRecordType> = {
    column?: TColumnTypeSorterResult<TRecordType>;
    order?: TSortOrder;
    field?: TKey | readonly TKey[];
    columnKey?: TKey;
  };
  type TTableCurrentDataSource<TRecordType> = {
    currentDataSource: TRecordType[];
    action: TTableAction;
  };

  export type TTableSticky = {
    offsetHeader?: number;
    offsetSummary?: number;
    offsetScroll?: number;
    getContainer?: () => Window | HTMLElement;
  };

  export type TOnTableChange<TRecordType = unknown> = (
    pagination: TTablePaginationConfig,
    filters: Record<string, NColumns.TFilterValue | null>,
    sorter: TSorterResult<TRecordType> | TSorterResult<TRecordType>[],
    extra: TTableCurrentDataSource<TRecordType>
  ) => void;
}
