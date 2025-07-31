import { useState } from 'react';

import { TablesTransfer } from '../../TablesTransfer';
import { COLUMNS } from '../consts';
import { createFakeData } from '../utils';

export const RemotelyControlled = () => {
  const { left, right } = createFakeData();

  const [leftData, setLeftData] = useState(left);
  const [rightData, setRightData] = useState(right);

  const handleTransfer = (left: any[], right: any[]) =>
    new Promise<void>(resolve =>
      setTimeout(() => {
        if (left.length) {
          setLeftData(prev => prev.concat(left));
          setRightData(prev => prev.filter(({ id }) => !left.find(el => el.id === id)));
        }
        if (right.length) {
          setRightData(prev => prev.concat(right));
          setLeftData(prev => prev.filter(({ id }) => !right.find(el => el.id === id)));
        }
        resolve();
      }, 1000)
    );

  return (
    <div>
      <TablesTransfer
        onTransfer={handleTransfer}
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
RemotelyControlled.args = {};
