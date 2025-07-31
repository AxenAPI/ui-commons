import { useState } from 'react';

import { StoryFn } from '@storybook/react';

import { Empty } from 'antd';
import cn from 'classnames';

import { Button, NColumns, NCommonTable } from '@/ui';
import { Badge } from '@/ui/badge';
import { Table } from '@/ui/tables';
import { Text } from '@/ui/typography';

import { NTransfer } from '../../models';
import { Transfer } from '../../Transfer';
import { DragNDropTable } from './DragNDropTable';
import { NTransferData } from './models';

import styles from './storiesStyles.module.css';

const mockType = ['Пользователь', 'Продукт'];

const mockData = Array.from({ length: 20 }).map<NTransferData.TDataType>((_, i) => ({
  key: i.toString(),
  name: `#${i + 1}`,
  code: `content code #${i + 1}`,
  type: mockType[i % 2],
}));

const leftColumns: NColumns.TColumnsType<NTransferData.TDataType> = [
  {
    dataIndex: 'name',
    title: 'Наименование',
  },
  {
    dataIndex: 'code',
    title: 'Код',
  },
  {
    dataIndex: 'type',
    title: 'Тип',
  },
];

export const WithTables: StoryFn = (argTypes: NTransfer.TProps<NTransferData.TDataType>) => {
  const [targetKeys, setTargetKeys] = useState<NTransfer.TProps['targetKeys']>([]);
  const [selectedKeys, setSelectedKeys] = useState<NTransfer.TProps['targetKeys']>([]);

  const onChange: NTransfer.TProps['onChange'] = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: NTransfer.TProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys(sourceSelectedKeys.concat(targetSelectedKeys));
  };

  return (
    <Transfer<NTransferData.TDataType>
      {...argTypes}
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      render={item => item.name}
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
      className={styles.transferWithTables}
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
    >
      {({ direction, filteredItems, onItemSelect, onItemSelectAll, selectedKeys: listSelectedKeys }) => {
        const rowSelection: NCommonTable.TTableRowSelection<NTransferData.TTransferItem> = {
          getCheckboxProps: () => ({}),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, 'replace');
          },
          selectedRowKeys: listSelectedKeys,
        };
        const isDataEmpty = filteredItems.length === 0;

        if (direction === 'left') {
          return (
            <>
              <Table
                className={cn(styles.table, { [styles.tableNoData]: isDataEmpty })}
                rowSelection={rowSelection}
                columns={leftColumns}
                data={filteredItems}
                size="small"
                onRow={({ key }) => ({
                  onClick: () => {
                    onItemSelect(key, !listSelectedKeys.includes(key));
                  },
                })}
                locale={{ emptyText: '' }}
              />
              {isDataEmpty && <Empty className={styles.tableEmptyData} description="Данные отсутствуют" />}
            </>
          );
        }
        return (
          <>
            <DragNDropTable
              className={cn(styles.table, { [styles.tableNoData]: isDataEmpty })}
              rowSelection={rowSelection}
              data={filteredItems as unknown as NTransferData.TDataType[]}
              size="small"
              onRow={({ key }) => ({
                onClick: () => {
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
              locale={{ emptyText: '' }}
            />
            {isDataEmpty && <Empty className={styles.tableEmptyData} description="Данные отсутствуют" />}
          </>
        );
      }}
    </Transfer>
  );
};
