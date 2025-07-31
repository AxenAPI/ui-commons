import { Key, useEffect, useMemo, useRef, useState } from 'react';

import { Table as AntdTable } from 'antd';
import cn from 'classnames';

import { TAnyObject } from '@/models';
import { NTable } from '@/ui/tables/models/model.ts';
import { RenderActionColumnRender } from '@/ui/tables/RenderActionColumnRender.tsx';

import { ColumnsSettingsCell } from './components/ColumnsSettingsCell';
import { NColumns } from './models';
import { renderColumn } from './utils';

import styles from './styles.module.css';

export function Table<T extends TAnyObject>(props: NTable.TTableProps<T>) {
  const {
    columns,
    defaultVisibleColumnsList,
    className,
    withHeaderTransparent,
    isNeedToShowSettingsCell,
    isScrollHidden,
    renderAction,
    iconSettings,
    iconSettingsCheck,
    rowSelection,
    columnActionSettings,
    isLoading,
    shouldShowHeader,
    isBordered,
    isSticky,
    isVirtual,
    data,
    rowClassName,
    onChange,
    onHeaderRow,
    fixedTitlePadding,
    emptyColumnValue = '-',
  } = props;

  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  const defaultCheckedList =
    columns
      ?.map<Key | undefined>(item => item.key)
      ?.filter<Key>((value: Key | undefined) => value !== undefined)
      ?.filter(item => {
        const isDefaultVisibleColumnsListExists = defaultVisibleColumnsList && defaultVisibleColumnsList?.length > 0;
        if (isDefaultVisibleColumnsListExists) {
          return defaultVisibleColumnsList?.includes(item);
        }
        return item;
      }) || [];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  useEffect(() => {
    setCheckedList(defaultCheckedList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns?.length]);

  const options: NColumns.TColumnsSettingsCellOption[] = useMemo(
    () =>
      columns?.map(({ key, title }) => ({
        label: title,
        value: key ?? '',
      })) || [],
    [columns]
  );

  const columnsWithElipsis = useMemo(
    () =>
      columns?.map(item => {
        return {
          ellipsis: {
            showTitle: false,
          },
          render: (value: string | boolean) => renderColumn(value, emptyColumnValue),
          ...item,
        };
      }) || [],
    [columns, emptyColumnValue]
  );

  const newColumns = useMemo(
    () =>
      columns?.map(item => {
        const defaultItm = {
          ellipsis: {
            showTitle: false,
          },
          showSorterTooltip: false,
          render: (value: string | boolean) => renderColumn(value, emptyColumnValue),
        };

        if (item.key === undefined) {
          return {
            ...defaultItm,
            ...item,
          };
        }

        return {
          ...defaultItm,
          ...item,
          hidden: !checkedList?.includes(item.key),
        };
      }) || [],
    [columns, checkedList, emptyColumnValue]
  );

  useEffect(() => {
    if (tableWrapperRef?.current) {
      const titleEl = tableWrapperRef.current.querySelector('.ant-table-title');
      if (!!fixedTitlePadding || fixedTitlePadding === 0) {
        titleEl?.setAttribute('style', `padding: ${fixedTitlePadding}px !important`);
      } else {
        titleEl?.removeAttribute('style');
      }
    }
  }, [fixedTitlePadding]);

  const renderActionColumn = (_value: unknown, record: T) => {
    return <RenderActionColumnRender renderAction={renderAction} record={record} />;
  };

  return (
    <div ref={tableWrapperRef}>
      <AntdTable
        {...props}
        className={cn(className, {
          [styles.tableHeaderTransparent]: withHeaderTransparent,
          [styles.hideScroll]: isScrollHidden,
        })}
        loading={isLoading}
        showHeader={shouldShowHeader}
        bordered={isBordered}
        sticky={isSticky}
        virtual={isVirtual}
        dataSource={data}
        rowClassName={(...args) =>
          cn(styles.rowTable, typeof rowClassName === 'function' ? rowClassName(...args) : rowClassName)
        }
        // Workaround of TS error, because RcColumnProps overrides ColumnTittle type inside AntdTable somehow
        columns={
          isNeedToShowSettingsCell || renderAction || columnActionSettings
            ? [
                ...newColumns,
                {
                  title: isNeedToShowSettingsCell && (
                    <ColumnsSettingsCell
                      columns={options}
                      checkedColumns={checkedList}
                      setCheckedColumns={setCheckedList}
                      iconSettings={iconSettings}
                      iconSettingsCheck={iconSettingsCheck}
                    />
                  ),
                  key: 'columnsSettings',
                  align: 'right',
                  width: '64px',
                  render: renderActionColumn,
                  ...columnActionSettings,
                  className: cn(columnActionSettings?.className, {
                    [styles.columnSettingsCell]: !columnActionSettings?.title,
                  }),
                },
              ]
            : columnsWithElipsis
        }
        rowSelection={rowSelection}
        onChange={onChange}
        onHeaderRow={onHeaderRow}
      />
    </div>
  );
}

Table.SELECTION_COLUMN = AntdTable.SELECTION_COLUMN;
Table.EXPAND_COLUMN = AntdTable.EXPAND_COLUMN;

Table.Summary = AntdTable.Summary;
