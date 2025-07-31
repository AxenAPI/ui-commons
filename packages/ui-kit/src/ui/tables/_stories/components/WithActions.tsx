import React, { useCallback, useState } from 'react';

import { IconCopy, IconEye, IconLink, IconPencil, IconWindow } from '@tabler/icons-react';

import { Table as AntTable } from 'antd';
import { isEqual } from 'lodash-es';

import { useTheme } from '@/providers/theme-provider';
import { Button } from '@/ui/buttons';
import { NTable } from '@/ui/tables/models/model.ts';
import { Tooltip } from '@/ui/tooltip';

import { expandableDataMock } from '../../_mocks/ExpandableDataMock';
import { Table } from '../../Table';
import { NTableDataType } from '../models';
import styles from '../styles.module.css';

export const WithActions = (argTypes: NTable.TTableProps<NTableDataType.TEditableCellDataType>) => {
  const [editingKey, setEditingKey] = useState('');
  const [rowSelectionKey, setRowSelectionKey] = useState<React.Key[]>([]);

  const { theme } = useTheme();

  const handleSelectDictionariesChange = (selectedRowKeys: React.Key[]) => {
    setRowSelectionKey(selectedRowKeys);
  };

  const rowSelection = {
    preserveSelectedRowKeys: false,
    selectedRowKeys: rowSelectionKey,
    onChange: handleSelectDictionariesChange,
  };

  const isEditing = (record: NTableDataType.TEditableCellDataType) => record.key === editingKey;

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
      render: (value: string) => (
        <Tooltip placement="topLeft" title={value}>
          {value ? value : '-'}
        </Tooltip>
      ),
    },
    {
      key: 'order',
      title: 'order',
      dataIndex: 'order',
      editable: false,
      ellipsis: {
        showTitle: false,
      },
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
      render: (value: string) => (
        <Tooltip placement="topLeft" title={value}>
          {value ? value : '-'}
        </Tooltip>
      ),
    },
    {
      key: 'size',
      title: 'size',
      dataIndex: 'size',
      editable: false,
      ellipsis: {
        showTitle: false,
      },
      shouldCellUpdate: (
        record: NTableDataType.TEditableCellDataType,
        prevRecord: NTableDataType.TEditableCellDataType
      ) => !isEqual(record, prevRecord),
      render: (value: string) => (
        <Tooltip placement="topLeft" title={value}>
          {value ? value : '-'}
        </Tooltip>
      ),
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
      render: (value: string) => (
        <Tooltip placement="topLeft" title={value}>
          {value ? value : '-'}
        </Tooltip>
      ),
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

  const [selectedList, setSelectedList] = useState<string[]>([]);

  const renderActios = useCallback(
    (item: NTableDataType.TEditableCellDataType) => {
      return [
        {
          render: (isActive: boolean) => (
            <Button isDisabled={item.key === '3'} icon={<IconEye />} className={isActive ? styles.active : undefined} />
          ),
          actionKey: 'eye',
          description: 'View',
        },
        {
          render: (isActive: boolean) => (
            <Button
              icon={<IconCopy />}
              onClick={() => setSelectedList([...selectedList, item.key])}
              className={isActive ? styles.active : undefined}
            />
          ),
          actionKey: 'copy',
          description: 'Copy',
          isSelected: selectedList.includes(item.key),
          activeAfterClick: true,
        },
        {
          render: (isActive: boolean) => (
            <Button icon={<IconPencil />} className={isActive ? styles.active : undefined} />
          ),
          activeAfterClick: true,
          actionKey: 'edit',
          description: 'Edit',
        },
        {
          render: (isActive: boolean) => (
            <Button icon={<IconWindow />} className={isActive ? styles.active : undefined} />
          ),
          actionKey: 'Window',
          description: 'Window',
        },
        {
          render: (isActive: boolean) => (
            <Button icon={<IconLink />} className={isActive ? styles.active : undefined} />
          ),
          actionKey: 'link',
          description: 'Copy link',
        },
      ];
    },
    [selectedList]
  );

  const selectedListTableData = selectedList.map(key => ({ key, name: `Item ${key}` }));
  const selectedListTableColumns = [
    {
      title: 'Key',
      dataIndex: 'key',
      render: (key: string) => (
        <button onClick={() => setSelectedList(selectedList.filter(itemKey => itemKey !== key))}>Delete</button>
      ),
    },
    { title: 'Name', dataIndex: 'name' },
  ];

  return (
    <>
      {selectedList.length > 0 && (
        <Button
          onClick={() => {
            setSelectedList([]);
          }}
          style={{ marginBottom: theme.components?.Button?.marginMD }}
        >
          RemoveAll
        </Button>
      )}

      <AntTable<Record<string, any>>
        title={() => <h3>Selected items</h3>}
        bordered
        pagination={false}
        columns={selectedListTableColumns}
        expandable={{
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
        dataSource={selectedListTableData}
      />

      <Table<NTableDataType.TEditableCellDataType>
        {...argTypes}
        rowSelection={rowSelection}
        columns={mergedColumns}
        pagination={{ onChange: cancel }}
        renderAction={renderActios}
      />
    </>
  );
};

WithActions.storyName = 'Table with actions';
WithActions.args = {
  data: expandableDataMock,
  isNeedToShowSettingsCell: true,
};
