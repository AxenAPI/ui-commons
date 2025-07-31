import React, { ReactNode, useContext, useEffect, useMemo } from 'react';

import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from 'antd';

import { NTable } from '@/ui/tables/models/model.ts';
import { Table } from '@/ui/tables/Table';

import { NColumns } from '../../models';
import { DRAG_N_DROP_ROWS_DATA } from '../consts';
import { NTableDataType } from '../models';

type TRowContextProps = {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
};

const RowContext = React.createContext<TRowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const columns: NColumns.TColumnsType<NTableDataType.TDataType> = [
  { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
  { title: 'Наименование', dataIndex: 'name' },
  { title: 'Возраст', dataIndex: 'age' },
  { title: 'Адрес', dataIndex: 'address' },
];

type TRowProps = {
  'data-row-key': string;
} & React.HTMLAttributes<HTMLTableRowElement>;

const Row: React.FC<TRowProps> = props => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<TRowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

export const DragNDropRowsTable = (argTypes: NTable.TTableProps<NTableDataType.TDataType>): ReactNode => {
  const { data = [], columns } = argTypes;
  const [dataSource, setDataSource] = React.useState<NTableDataType.TDataType[]>(data);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource(prevState => {
        const activeIndex = prevState.findIndex(record => record.key === active?.id);
        const overIndex = prevState.findIndex(record => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={dataSource.map(i => i.key.toString())} strategy={verticalListSortingStrategy}>
        <Table<NTableDataType.TDataType>
          rowKey="key"
          components={{ body: { row: Row } }}
          columns={columns}
          data={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

DragNDropRowsTable.storyName = "Drag'n'drop rows table";
DragNDropRowsTable.args = {
  columns,
  data: DRAG_N_DROP_ROWS_DATA,
};
