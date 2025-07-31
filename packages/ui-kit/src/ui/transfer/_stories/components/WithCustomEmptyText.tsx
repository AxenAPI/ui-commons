import { ReactNode, useState } from 'react';

import { initialTargetKeys, items } from '../../_mock/TransferItems';
import { NTransfer } from '../../models';
import { Transfer } from '../../Transfer';

export const WithCustomEmptyText = (argTypes: NTransfer.TProps): ReactNode => {
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
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={item => item.title}
    />
  );
};

WithCustomEmptyText.args = {
  titles: ['Source', 'Target'],
  dataSource: items,
  customNotFoundText: 'Ничего не найдено',
};
