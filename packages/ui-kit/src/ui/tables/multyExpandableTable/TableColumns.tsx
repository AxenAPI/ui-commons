import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

import { TAnyObject } from '@/models';

import { NColumns } from '../models';

import styles from './styles.module.css';

export const TableColumns = <T extends TAnyObject>({
  columns,
  expandedKeys,
  handleExpand,
}: {
  columns: NColumns.TColumnsType<TAnyObject> | undefined;
  expandedKeys: string[];
  handleExpand: (groupKey: string) => void;
}) => {
  if (!columns || columns.length === 0) return [];

  // Определяем первую колонку
  const [firstColumn, ...otherColumns] = columns;

  const updatedFirstColumn = {
    ...firstColumn,
    render: (text: any, record: T, index: number) => {
      if (record.isGrouped) {
        return {
          children: (
            <button onClick={() => handleExpand(record.groupKey)} className={styles.expand}>
              {expandedKeys.includes(record.groupKey) ? <IconChevronDown /> : <IconChevronRight />}
              <div className={styles.groupText}>{record.text}</div>
            </button>
          ),
          props: {
            colSpan: columns?.length,
            style: { padding: '0 16px' },
          },
        };
      }

      return firstColumn.render ? firstColumn.render(text, record, index) : text;
    },
  };

  // Обновляем остальные колонки, чтобы группированные строки их скрывали
  const updatedOtherColumns = otherColumns.map(col => ({
    ...col,
    render: (text: any, record: T, index: number) => {
      if (record.isGrouped) {
        return { children: null, props: { colSpan: 0 } };
      }

      return col.render ? col.render(text, record, index) : text;
    },
  }));

  return [updatedFirstColumn, ...updatedOtherColumns];
};
