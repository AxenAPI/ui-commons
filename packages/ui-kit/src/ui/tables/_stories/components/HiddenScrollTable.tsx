import { Table } from '@/ui/tables/Table';

import { NTable } from '../../models';
import { NTableDataType } from '../models';

export const HiddenScrollTable = (argTypes: NTable.TTableProps<NTableDataType.TDataType>) => {
  const columns = [
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 200 },
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 200 },
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 200 },
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 200 },
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 200 },
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 200 },
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 200 },
    { title: 'Column 9', dataIndex: 'address', key: '8', width: 200 },
    { title: 'Column 10', dataIndex: 'address', key: '10', width: 200 },
  ];

  return (
    <Table
      {...argTypes}
      columns={columns}
      scroll={{ x: '100%' }}
      isScrollHidden
      isNeedToShowSettingsCell
      columnActionSettings={{
        width: 90,
        fixed: 'right',
      }}
      locale={{ emptyText: '' }}
    />
  );
};
