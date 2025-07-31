import React, { useContext, useEffect, useMemo } from 'react';

import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from 'antd';

import { NColumns, NTable, Table } from '@/ui/tables';

import { NTransferData } from './models';

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

const columns: NColumns.TColumnsType<NTransferData.TDataType> = [
  { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
  {
    dataIndex: 'name',
    title: 'Наименование',
  },
  {
    dataIndex: 'code',
    title: 'Код',
  },
  {
    dataIndex: 'type',
    title: 'Тип',
  },
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

type TDragNDropTableProps = {
  data: NTransferData.TDataType[];
} & NTable.TTableProps<NTransferData.TDataType>;

export const DragNDropTable: React.FC<TDragNDropTableProps> = ({ data, ...tableProps }) => {
  const [dataSource, setDataSource] = React.useState<NTransferData.TDataType[]>(data);

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
      <SortableContext items={dataSource.map(i => i.key)} strategy={verticalListSortingStrategy}>
        <Table<NTransferData.TDataType>
          rowKey="key"
          components={{ body: { row: Row } }}
          columns={columns}
          data={dataSource}
          {...tableProps}
        />
      </SortableContext>
    </DndContext>
  );
};
