import { useMemo } from 'react';

import { TAnyObject } from '@/models';
import { Pagination, Table } from '@/ui';

import { NCommonTable } from '../models';
import { useExpandedKeys, useGroupedData, useTableState } from './hooks';
import { NMultiExpandTable } from './models';
import { TableColumns } from './TableColumns';

import styles from './styles.module.css';

export function MultiExpandTable({ data, isExpandedByDefault, rowKey, ...props }: NMultiExpandTable.TMultiExpandProps) {
  const { tableState, setTableState } = useTableState(props.pagination, data?.length);
  const groupedData = useGroupedData(data, props.groupedKey, tableState);
  const { expandedKeys, handleExpand } = useExpandedKeys(groupedData, isExpandedByDefault);

  const tableData = Object.keys(groupedData).reduce<TAnyObject[]>((acc, curr) => {
    return [
      ...acc,
      {
        isGrouped: true,
        isExpandedByDefault: expandedKeys.includes(curr),
        groupKey: curr,
        id: `group-${curr}`,
        key: `group-${curr}`,
        text: curr,
        parentKey: null,
      },
      ...(expandedKeys.includes(curr)
        ? groupedData[curr].map(record => ({
            ...record,
            parentKey: `group-${curr}`,
          }))
        : []),
    ];
  }, []);

  const tableColumns = useMemo(() => {
    return TableColumns({ columns: props.columns, expandedKeys, handleExpand });
  }, [props.columns, expandedKeys, handleExpand]);

  const handleTableChange = (pagination: NCommonTable.TTablePaginationConfig) => {
    if (!pagination.pageSize || !pagination.current) return;

    setTableState({ pageSize: pagination.pageSize, current: pagination.current });
  };

  return (
    <div className={styles.table}>
      <Table
        {...props}
        columns={tableColumns}
        data={tableData}
        rowKey={rowKey}
        onChange={handleTableChange}
        // ниже нужно обработать и вернуть именно состояние `false`
        pagination={false}
      />

      {props.pagination !== false && (
        <Pagination
          className={styles.pagination}
          pageSize={tableState.pageSize}
          current={tableState.current}
          total={tableState.total}
          onChange={value => {
            setTableState((prevState: NCommonTable.TTablePaginationConfig) => {
              return {
                ...prevState,
                current: value,
              };
            });
          }}
        />
      )}
    </div>
  );
}
