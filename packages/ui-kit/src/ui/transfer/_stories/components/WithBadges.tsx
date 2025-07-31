import { ReactNode, useState } from 'react';

import { Badge, Text } from '@/ui';

import { initialTargetKeys, items } from '../../_mock/TransferItems';
import { NTransfer } from '../../models';
import { Transfer } from '../../Transfer';

export const WithBadges = (argTypes: NTransfer.TProps): ReactNode => {
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const onChange: NTransfer.TProps['onChange'] = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: NTransfer.TProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys(sourceSelectedKeys.concat(targetSelectedKeys));
  };

  return (
    <Transfer
      {...argTypes}
      dataSource={items}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={item => item.title}
      isShowSelectAll={false}
      selectAllLabels={[
        ({ selectedCount }) => (
          <>
            <Text isStrong style={{ marginRight: 4 }}>
              Доступные
            </Text>
            <Badge count={selectedCount} color="#F0F0F0" style={{ color: 'black' }} />
          </>
        ),
        ({ selectedCount }) => (
          <>
            <Text isStrong>Добавленные</Text>
            <Badge count={selectedCount} color="#F0F0F0" style={{ color: 'black' }} />
          </>
        ),
      ]}
    ></Transfer>
  );
};
