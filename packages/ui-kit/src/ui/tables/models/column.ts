import { Key, ReactNode } from 'react';

import { DropdownProps, TooltipProps } from 'antd';
import { ColumnTitle as AntColumnTitle } from 'antd/es/table/interface';

import { TAnyObject } from '@/models';

import { NCommonTable } from './common';

/**
 * Неймспейс с типизацией NColumns
 */

export namespace NColumns {
  type TAlignType = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  type TRowScopeType = 'row' | 'rowgroup';
  type TSorterTooltipTarget = 'full-header' | 'sorter-icon';
  type TSpecialString<T> = T | (string & NonNullable<unknown>);
  export type TColumnsType<TRecordType = unknown> = (TColumnGroupType<TRecordType> | TColumnType<TRecordType>)[];
  export type TColumnGroupType<TRecordType> = {
    children: TColumnsType<TRecordType>;
  } & Omit<TColumnType<TRecordType>, 'dataIndex'>;
  type TCoverableDropdownProps = {
    onOpenChange?: (open: boolean) => void;
  } & Omit<
    DropdownProps,
    | 'onOpenChange'
    // === deprecated ===
    | 'overlay'
    | 'visible'
    | 'onVisibleChange'
  >;

  export type TColumnType<TRecordType> = {
    title?: React.ReactNode;
    sorter?:
      | boolean
      | TCompareFn<TRecordType>
      | {
          compare?: TCompareFn<TRecordType>;
          /** Config multiple sorter order priority */
          multiple?: number;
        };
    sortOrder?: NCommonTable.TSortOrder;
    defaultSortOrder?: NCommonTable.TSortOrder;
    sortDirections?: NCommonTable.TSortOrder[];
    sortIcon?: (props: { sortOrder: NCommonTable.TSortOrder }) => React.ReactNode;
    showSorterTooltip?: boolean | TSorterTooltipProps;
    filtered?: boolean;
    filters?: TColumnFilterItem[];
    filterDropdown?: React.ReactNode | ((props: TFilterDropdownProps) => React.ReactNode);
    filterOnClose?: boolean;
    filterMultiple?: boolean;
    filteredValue?: TFilterValue | null;
    defaultFilteredValue?: TFilterValue | null;
    filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode);
    filterMode?: 'menu' | 'tree';
    filterSearch?: TFilterSearchType<TColumnFilterItem>;
    onFilter?: (value: React.Key | boolean, record: TRecordType) => boolean;
    filterDropdownOpen?: boolean;
    /**
     * @deprecated Please use `filterDropdownProps.onOpenChange` instead.
     * @since 4.23.0
     */
    onFilterDropdownOpenChange?: (visible: boolean) => void;
    filterDropdownProps?: TCoverableDropdownProps;
    filterResetToDefaultFilteredValue?: boolean;
    responsive?: TBreakpoint[];
    colSpan?: number;
    dataIndex?: TDataIndex<TRecordType>;
    render?: (
      value: any,
      record: TRecordType,
      index: number
    ) => React.ReactNode | NCommonTable.TRenderedCell<TRecordType>;
    shouldCellUpdate?: (record: TRecordType, prevRecord: TRecordType) => boolean;
    rowSpan?: number;
    width?: number | string;
    onCell?: NCommonTable.TGetComponentProps<TRecordType>;
    key?: Key;
    className?: string;
    hidden?: boolean;
    fixed?: NCommonTable.TFixedType;
    onHeaderCell?: NCommonTable.TGetComponentProps<TColumnsType<TRecordType>[number]>;
    ellipsis?: TCellEllipsisType;
    align?: TAlignType;
    rowScope?: TRowScopeType;
  };
  export type TColumnTitle<TRecordType> = AntColumnTitle<TRecordType>;
  export type TColumnTitleProps<TRecordType> = {
    sortColumns?: {
      column: TColumnType<TRecordType>;
      order: NCommonTable.TSortOrder;
    }[];
    filters?: Record<string, TFilterValue>;
  };
  type TCompareFn<T> = (a: T, b: T, sortOrder?: NCommonTable.TSortOrder) => number;
  // TODO Implement TooltipProps
  export type TSorterTooltipProps = TooltipProps & {
    target?: TSorterTooltipTarget;
  };
  export type TColumnFilterItem = {
    text: React.ReactNode;
    value: React.Key | boolean;
    children?: TColumnFilterItem[];
  };
  export type TFilterDropdownProps = {
    prefixCls: string;
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedKeys: React.Key[];
    confirm: (param?: TFilterConfirmProps) => void;
    clearFilters?: () => void;
    filters?: TColumnFilterItem[];
    close: () => void;
    visible: boolean;
  };
  export type TFilterValue = (Key | boolean)[];
  type TFilterSearchType<TRecordType = TAnyObject> = boolean | ((input: string, record: TRecordType) => boolean);
  type TBreakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  export type TDataIndex<T = any> = TDeepNamePath<T> | TSpecialString<T> | number | (TSpecialString<T> | number)[];
  type TDeepNamePath<TStore = any, TParentNamePath extends any[] = []> = TParentNamePath['length'] extends 10
    ? never
    : true extends (TStore extends TBaseNamePath ? true : false)
      ? TParentNamePath['length'] extends 0
        ? TStore | TBaseNamePath
        : TStore extends any[]
          ? [...TParentNamePath, number]
          : never
      : TStore extends any[] // Connect path. e.g. { a: { b: string }[] }
        ? [...TParentNamePath, number] | TDeepNamePath<TStore[number], [...TParentNamePath, number]>
        : keyof TStore extends never
          ? TStore
          : {
              [FieldKey in keyof TStore]: TStore[FieldKey] extends Function
                ? never
                :
                    | (TParentNamePath['length'] extends 0 ? FieldKey : never)
                    | [...TParentNamePath, FieldKey]
                    | TDeepNamePath<Required<TStore>[FieldKey], [...TParentNamePath, FieldKey]>;
            }[keyof TStore];
  type TBaseNamePath = string | number | boolean | (string | number | boolean)[];
  type TCellEllipsisType =
    | {
        showTitle?: boolean;
      }
    | boolean;
  type TFilterConfirmProps = {
    closeDropdown: boolean;
  };
  export type TColumnsSettingsCellOption = {
    label: ReactNode;
    value: Key;
  };
}
