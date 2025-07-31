import { useState } from 'react';

import { TablesTransfer } from '../../TablesTransfer';
import { COLUMNS } from '../consts';
import { createFakeData } from '../utils';

export const OneWay = () => {
  const { left, right } = createFakeData();

  const [leftData] = useState(left);
  const [rightData] = useState(right);

  const [leftTransfered, setLeftTransfered] = useState<any[]>([]);
  const [rightTransfered, setRightTransfered] = useState<any[]>([]);

  const handleTransfer = (left: any[], right: any[]) => {
    setLeftTransfered(left);
    setRightTransfered(right);
  };

  return (
    <div>
      <TablesTransfer
        isOneWay
        leftTransfered={leftTransfered}
        onTransfer={handleTransfer}
        rightTransfered={rightTransfered}
        leftTableProps={{
          columns: COLUMNS,
          data: leftData,
        }}
        rightTableProps={{
          columns: COLUMNS,
          data: rightData,
        }}
      />
    </div>
  );
};
OneWay.args = {};
