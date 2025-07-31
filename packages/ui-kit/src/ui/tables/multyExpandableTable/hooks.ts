import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Dictionary } from 'lodash';
import { chunk, groupBy, sortBy } from 'lodash-es';

import { TAnyObject } from '@/models';
import { NCommonTable } from '@/ui';

export const useTableState = (initialPagination?: NCommonTable.TTablePaginationConfig | false, dataLength?: number) => {
  const [tableState, setTableState] = useState<NCommonTable.TTablePaginationConfig>(() => {
    if (initialPagination) {
      return initialPagination;
    }

    return {
      pageSize: initialPagination === false ? dataLength : 10,
      current: 1,
      total: dataLength,
    };
  });

  useEffect(() => {
    if (!initialPagination) {
      setTableState({
        pageSize: initialPagination === false ? dataLength : 10,
        current: 1,
        total: dataLength,
      });
    } else {
      setTableState(initialPagination);
    }
  }, [initialPagination, dataLength]);

  return { tableState, setTableState };
};

export const useGroupedData = (
  data: TAnyObject[] | undefined,
  groupedKey: string[],
  tableState: NCommonTable.TTablePaginationConfig
) => {
  const [groupedData, setGroupedData] = useState<Dictionary<TAnyObject[]>>({});

  const model = useMemo(() => {
    return sortBy(data, groupedKey);
  }, [data, groupedKey]);

  const updateGroupedData = useCallback(
    (pageSize: number, currentPage: number, modelData: TAnyObject[]) => {
      const paginated = chunk(modelData, pageSize);
      const currPageData = paginated[currentPage - 1];

      return groupBy(currPageData, value => value[groupedKey[0]]);
    },
    [groupedKey]
  );

  useEffect(() => {
    if (!tableState.pageSize || !tableState.current) return;

    const updatedData = updateGroupedData(tableState.pageSize, tableState.current, model);

    setGroupedData(updatedData);
  }, [model, tableState, updateGroupedData]);

  return groupedData;
};

export const useExpandedKeys = (groupedData: Dictionary<TAnyObject[]>, isExpandedByDefault?: boolean) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!isExpandedByDefault) return;

    setExpandedKeys(Object.keys(groupedData));
  }, [isExpandedByDefault, groupedData]);

  const handleExpand = (groupKey: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(groupKey) ? prevKeys.filter(key => key !== groupKey) : [...prevKeys, groupKey]
    );
  };

  return { expandedKeys, handleExpand };
};
