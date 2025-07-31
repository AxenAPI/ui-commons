import { ReactNode } from 'react';

import { Divider, Flex } from 'antd';

import { Button } from '@/ui/buttons';
import { NTable } from '@/ui/tables/models/model.ts';
import { Table } from '@/ui/tables/Table';
import { Space } from '@/ui/utility';

import { DEFAULT_COLUMNS, DEFAULT_DATA } from '../consts';
import { NTableDataType } from '../models';

const TableTitle = () => (
  <Space>
    <Flex gap="8px">
      <Button>Выгрузить xlsx</Button>
      <Button>Фильтр</Button>
    </Flex>
  </Space>
);

export const SizedTable = (argTypes: NTable.TTableProps<NTableDataType.TDataTypeWithTag>): ReactNode => {
  return (
    <>
      <Divider>Large size table</Divider>
      <Table {...argTypes} size="large" title={() => <TableTitle />} />
      <Divider>Middle size table</Divider>
      <Table {...argTypes} size="middle" title={() => <TableTitle />} />
      <Divider>Small size table</Divider>
      <Table {...argTypes} size="small" title={() => <TableTitle />} />
    </>
  );
};

SizedTable.storyName = 'Table with custom filter panel';
SizedTable.args = {
  column: DEFAULT_COLUMNS,
  data: DEFAULT_DATA,
};
SizedTable.argTypes = {
  fixedTitlePadding: { control: 'number' },
};
