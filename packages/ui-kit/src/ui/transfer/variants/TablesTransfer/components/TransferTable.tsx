import { memo, useEffect, useMemo } from 'react';

import { TAnyObject } from '@/models';
import { Empty } from '@/ui/utility';

import { NTable, Table } from '../../../../tables';
import styles from '../styles.module.css';

type TProps = Omit<NTable.TTableProps<TAnyObject>, 'data' | 'size' | 'onScroll' | 'rowSelection'> & {
  added: Record<string, TAnyObject>;
  data: TAnyObject[];
  onNextPage?: () => Promise<void> | void;
  onSelect: (_: unknown, rows: TAnyObject[]) => void;
  removed: Record<string, TAnyObject>;
  rowKey: string;
  selected: Record<string, TAnyObject>;
  customNotFoundText?: string;
  customNotFoundImage?: React.ReactNode;
  customSearchNotFoundText?: string;
  customSearchNotFoundImage?: React.ReactNode;
  isSearch?: boolean;
  rowSelection?: Omit<NTable.TTableProps<TAnyObject>['rowSelection'], 'selectedRowKeys' | 'onChange'>;
};

// eslint-disable-next-line react/display-name
export const TransferTable = memo<TProps>(
  ({
    added,
    data,
    onNextPage,
    onSelect,
    pagination = false,
    removed,
    rowKey,
    selected,
    customNotFoundText,
    customNotFoundImage,
    customSearchNotFoundText,
    customSearchNotFoundImage,
    isSearch,
    ...rest
  }) => {
    useEffect(() => {
      if (data.length === Object.keys(removed).length && onNextPage) onNextPage();
    }, [data.length, removed, onNextPage]);

    const concatenatedData = useMemo(
      () => Object.values(added).concat(data.filter(el => !removed[el.id])),
      [added, data, removed]
    );

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (onNextPage && e.currentTarget.scrollHeight - (e.currentTarget.scrollTop + e.currentTarget.clientHeight) < 1)
        onNextPage();
    };

    return (
      <Table
        {...rest}
        data={concatenatedData}
        onScroll={handleScroll}
        pagination={pagination}
        rowKey={rowKey}
        size="small"
        locale={{
          emptyText: (
            <Empty
              image={
                isSearch
                  ? customSearchNotFoundImage || Empty.PRESENTED_IMAGE_SIMPLE
                  : customNotFoundImage || Empty.PRESENTED_IMAGE_DEFAULT
              }
              description={
                isSearch ? customSearchNotFoundText || 'Записи не найдены' : customNotFoundText || 'Добавьте записи'
              }
            />
          ),
        }}
        rowClassName={row => {
          if (added[row[rowKey]]) return styles.highlighted;
          return '';
        }}
        rowSelection={{
          columnWidth: 32,
          onChange: onSelect,
          selectedRowKeys: Object.keys(selected),
          ...rest?.rowSelection,
        }}
      />
    );
  }
);
