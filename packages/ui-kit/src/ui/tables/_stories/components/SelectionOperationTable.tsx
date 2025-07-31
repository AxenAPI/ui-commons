import { useState } from 'react';

import { fn } from '@storybook/test';

import { Button } from '@/ui/buttons';
import { NTable } from '@/ui/tables/models/model.ts';
import { Col } from '@/ui/utility';

import { Table } from '../../Table';
import { DEFAULT_BIG_DATA, SELECTIONS_OPERATION_COLUMNS } from '../consts';
import { NTableDataType } from '../models';
import { TStory } from '../Table.stories';

export const SelectionOperationTable: TStory = (argTypes: NTable.TTableProps<NTableDataType.TDataType>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = fn((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Col>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} isLoading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: '8px' }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
      </div>
      <Table<NTableDataType.TDataType> {...argTypes} rowSelection={rowSelection} />
    </Col>
  );
};

SelectionOperationTable.storyName = 'Selection operation table';
SelectionOperationTable.args = {
  columns: SELECTIONS_OPERATION_COLUMNS,
  data: DEFAULT_BIG_DATA,
};
