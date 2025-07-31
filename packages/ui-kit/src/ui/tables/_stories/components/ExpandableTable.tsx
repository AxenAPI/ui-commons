import { ReactNode } from 'react';

import { NTable } from '@/ui/tables/models/model.ts';
import { Table } from '@/ui/tables/Table';

import { EXPANDABLE_COLUMNS, EXPANDABLE_DATA } from '../consts';
import { NTableDataType } from '../models';

export const ExpandableTable = (argTypes: NTable.TTableProps<NTableDataType.TDataTypeWithDescription>): ReactNode => {
  return (
    <Table
      {...argTypes}
      expandable={{
        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
        rowExpandable: record => record.name !== 'Not Expandable',
      }}
    />
  );
};

ExpandableTable.storyName = 'Expandable table';
ExpandableTable.args = {
  columns: EXPANDABLE_COLUMNS,
  data: EXPANDABLE_DATA,
};
