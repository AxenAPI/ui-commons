import { ReactNode, useState } from 'react';

import { Checkbox } from 'antd';

import { Divider } from '@/ui/dividers';
import { NTable } from '@/ui/tables/models/model.ts';
import { Table } from '@/ui/tables/Table';

import { DEFAULT_DATA, HIDDEN_COLUMNS } from '../consts';
import { NTableDataType } from '../models';

export const HiddenColumnsTable = (argTypes: NTable.TTableProps<NTableDataType.THiddenDataType>): ReactNode => {
  const [checkedList, setCheckedList] = useState(HIDDEN_COLUMNS.map(item => item.key));

  const options = HIDDEN_COLUMNS.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = HIDDEN_COLUMNS.map(item => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  return (
    <>
      <Divider>Columns displayed</Divider>
      <Checkbox.Group
        value={checkedList}
        options={options}
        onChange={value => {
          setCheckedList(value);
        }}
      />

      <Table {...argTypes} columns={newColumns} style={{ marginTop: 24 }} />
    </>
  );
};

HiddenColumnsTable.storyName = 'Table with hidden columns';
HiddenColumnsTable.args = {
  data: DEFAULT_DATA,
};
