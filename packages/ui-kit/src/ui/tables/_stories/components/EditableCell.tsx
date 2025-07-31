import React, { useState } from 'react';

import { isEqual } from 'lodash-es';

import { Button, FormItem, Input, Table } from '@/ui';
import { NTable } from '@/ui/tables/models/model.ts';

import { expandableDataMock } from '../../_mocks/ExpandableDataMock';
import { NTableDataType } from '../models';

const EditableCell: React.FC<React.PropsWithChildren<NTableDataType.TEditableCellProps>> = ({
  editing,
  dataIndex,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <FormItem name={dataIndex} style={{ margin: 0 }}>
          <Input />
        </FormItem>
      ) : (
        children
      )}
    </td>
  );
};

export const EditableCellTable = (argTypes: NTable.TTableProps<NTableDataType.TEditableCellDataType>) => {
  const [editingKey, setEditingKey] = useState('');
  const [rowSelectionKey, setRowSelectionKey] = useState<React.Key[]>([]);

  const handleSelectDictionariesChange = (selectedRowKeys: React.Key[]) => {
    setRowSelectionKey(selectedRowKeys);
  };

  const rowSelection = {
    preserveSelectedRowKeys: false,
    selectedRowKeys: rowSelectionKey,
    onChange: handleSelectDictionariesChange,
  };

  const isEditing = (record: NTableDataType.TEditableCellDataType) => record.key === editingKey;

  const edit = (record: Partial<NTableDataType.TEditableCellDataType> & { key: React.Key }) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const columns = [
    {
      key: 'name',
      title: 'name',
      dataIndex: 'name',
      editable: true,
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
    },
    {
      key: 'age',
      title: 'age',
      dataIndex: 'age',
      editable: true,
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
    },
    {
      key: 'address',
      title: 'address',
      dataIndex: 'address',
      editable: false,
      ellipsis: {
        showTitle: false,
      },
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
    },
    {
      key: 'order',
      title: 'order',
      dataIndex: 'order',
      editable: false,
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
    },
    {
      key: 'size',
      title: 'size',
      dataIndex: 'size',
      editable: false,
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
    },
    {
      key: 'preference',
      title: 'preference',
      dataIndex: 'preference',
      editable: false,
      ellipsis: {
        showTitle: false,
      },
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
    },
    {
      key: 'version',
      title: 'version',
      dataIndex: 'version',
      editable: false,
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
    },
  ];

  const mergedColumns: any = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: NTableDataType.TEditableCellDataType) => ({
        record,
        dataIndex: col.dataIndex,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Table<NTableDataType.TEditableCellDataType>
      {...argTypes}
      components={{
        body: { cell: EditableCell },
      }}
      rowSelection={rowSelection}
      columns={mergedColumns}
      pagination={{ onChange: cancel }}
      columnActionSettings={{
        shouldCellUpdate: (
          record: NTableDataType.TEditableCellDataType,
          prevRecord: NTableDataType.TEditableCellDataType
        ) => !isEqual(record, prevRecord),
      }}
      renderAction={record => {
        return [
          {
            render: () => (
              <Button isDisabled={editingKey === record?.key} onClick={() => edit(record)}>
                Edit
              </Button>
            ),
            actionKey: 'edit',
          },
        ];
      }}
    />
  );
};

EditableCellTable.storyName = 'Table with edit';
EditableCellTable.args = {
  data: expandableDataMock,
  isNeedToShowSettingsCell: true,
};
