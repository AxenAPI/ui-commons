import { ReactNode, useState } from 'react';

import { fn } from '@storybook/test';

import { NCommonTable } from '@/ui';
import { Switch } from '@/ui/form';
import { NTable } from '@/ui/tables/models/model.ts';
import { Table } from '@/ui/tables/Table';
import { Space } from '@/ui/utility';

import { TREE_COLUMNS, TREE_DATA } from '../consts';

export const TreeDataTable = (argTypes: NTable.TTableProps<typeof TREE_COLUMNS>): ReactNode => {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const rowSelection: NCommonTable.TTableRowSelection<typeof TREE_COLUMNS> = {
    onChange: fn(),
    onSelect: fn(),
  };

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        CheckStrictly: <Switch isChecked={checkStrictly} onClick={setCheckStrictly} onChange={() => {}} />
      </Space>
      <Table {...argTypes} rowSelection={{ ...rowSelection, checkStrictly }} />
    </>
  );
};

TreeDataTable.storyName = 'Tree data table';
TreeDataTable.args = {
  columns: TREE_COLUMNS,
  data: TREE_DATA,
  isBordered: true,
};
