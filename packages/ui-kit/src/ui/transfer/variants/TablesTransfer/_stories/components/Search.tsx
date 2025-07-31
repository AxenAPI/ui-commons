import { useState } from 'react';

import { NTablesTransfer } from '../../models';
import { TablesTransfer } from '../../TablesTransfer';
import { COLUMNS } from '../consts';
import { TData } from '../models';
import { createFakeData } from '../utils';

const { left, right } = createFakeData();

export const Search = (args: NTablesTransfer.TProps<TData>) => {
  const [leftData, setLeftData] = useState(left);
  const [rightData, setRightData] = useState(right);

  const [leftTransfered, setLeftTransfered] = useState<TData[]>([]);
  const [rightTransfered, setRightTransfered] = useState<TData[]>([]);

  const handleTransfer = (left: TData[], right: TData[]) => {
    setLeftTransfered(left);
    setRightTransfered(right);
  };

  const handleSearchLeft = (search: string) => setLeftData(left.filter(el => JSON.stringify(el).includes(search)));
  const handleSearchRight = (search: string) => setRightData(right.filter(el => JSON.stringify(el).includes(search)));
  const handleAddedSearch = (record: TData, search: string) =>
    record?.name.toLowerCase()?.includes(search.toLowerCase());

  return (
    <div>
      <TablesTransfer
        {...args}
        leftTransfered={leftTransfered}
        onTransfer={handleTransfer}
        rightTransfered={rightTransfered}
        titles={[() => 'Left', () => 'Right']}
        onAddedSearch={handleAddedSearch}
        leftTableProps={{
          columns: COLUMNS,
          data: leftData,
          onSearch: handleSearchLeft,
        }}
        rightTableProps={{
          columns: COLUMNS,
          data: rightData,
          onSearch: handleSearchRight,
        }}
      />
    </div>
  );
};
Search.args = {};
