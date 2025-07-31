import { ReactNode, useState } from 'react';

import { Button } from '@/ui';

import { initialTargetKeys, items } from '../../_mock/TransferItems';
import { NTransfer } from '../../models';
import { Transfer } from '../../Transfer';

import styles from './storiesStyles.module.css';

export const WithCustomButtons = (argTypes: NTransfer.TProps): ReactNode => {
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
      isShowSelectAll={true}
      isShowSearch={true}
      titles={[
        [
          <Button className={styles.titleButton} key={'plus1'}>
            +
          </Button>,
          <Button className={styles.titleButton} key={'minus1'}>
            -
          </Button>,
        ],
        [
          <Button className={styles.titleButton} key={'plus2'}>
            +
          </Button>,
          <Button className={styles.titleButton} key={'minus2'}>
            -
          </Button>,
        ],
      ]}
    />
  );
};
