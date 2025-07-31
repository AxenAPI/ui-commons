import { useState } from 'react';

import { TablesTransfer } from '../../TablesTransfer';
import { COLUMNS } from '../consts';
import { createFakeData } from '../utils';

const SIZE = { y: 500, x: 500 };

export const InfiniteScroll = () => {
  const { left, right } = createFakeData(30);

  const [leftData, setLeftData] = useState(left);
  const [rightData, setRightData] = useState(right);

  const [leftTransfered, setLeftTransfered] = useState<any[]>([]);
  const [rightTransfered, setRightTransfered] = useState<any[]>([]);

  const handleTransfer = (left: any[], right: any[]) => {
    setLeftTransfered(left);
    setRightTransfered(right);
  };

  const handleLeftNextPage = () => {
    const { left } = createFakeData(30);
    setLeftData(prev => prev.concat(left));
  };
  const handleRightNextPage = () => {
    const { right } = createFakeData(30);
    setRightData(prev => prev.concat(right));
  };

  return (
    <TablesTransfer
      leftTransfered={leftTransfered}
      onTransfer={handleTransfer}
      rightTransfered={rightTransfered}
      leftTableProps={{
        columns: COLUMNS,
        data: leftData,
        isVirtual: true,
        onNextPage: handleLeftNextPage,
        scroll: SIZE,
      }}
      rightTableProps={{
        columns: COLUMNS,
        data: rightData,
        isVirtual: true,
        onNextPage: handleRightNextPage,
        scroll: SIZE,
      }}
    />
  );
};
InfiniteScroll.args = {};
