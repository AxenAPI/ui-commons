import { Key, useMemo, useState } from 'react';

import { CheckboxChangeEvent } from 'antd';

import { TAnyObject } from '@/models';
import { NCommonTable } from '@/ui';

import { NMultiExpandTable } from '../models.ts';
import { MultiExpandTable } from '../MultiExpandableTable.tsx';

export default {
  title: 'Axenix UI/Tables/MultiExpandTable',
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  component: MultiExpandTable,
};

export const DefaultMultiExpandTable = (argTypes: NMultiExpandTable.TMultiExpandProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // нажна групДата из компонента
  const groupedData = useMemo(() => {
    return argTypes.data?.reduce(
      (acc, item) => {
        const groupKey = `group-${item[argTypes.groupedKey[0]]}`;
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item.key);
        return acc;
      },
      {} as Record<string, string[]>
    );
  }, [argTypes.data, argTypes.groupedKey]);

  const handleSelectionChange = (keys: Key[]) => {
    setSelectedKeys(keys as string[]);
  };

  const rowSelection: NCommonTable.TTableRowSelection<TAnyObject> = {
    type: 'checkbox',
    selectedRowKeys: selectedKeys,
    onChange: handleSelectionChange,
    getCheckboxProps: record => ({
      onChange: (e: CheckboxChangeEvent) => {
        const { checked } = e.target;
        if (record.isGrouped) {
          const groupRecords = groupedData?.[record.key] || [];
          setSelectedKeys(prevKeys =>
            checked
              ? [...new Set([...prevKeys, record.key, ...groupRecords])]
              : prevKeys.filter(key => key !== record.key && !groupRecords.includes(key))
          );
        } else {
          const groupKey = `group-${record[argTypes.groupedKey[0]]}`;
          setSelectedKeys(prevKeys => {
            const updatedKeys = checked ? [...prevKeys, record.key] : prevKeys.filter(key => key !== record.key);

            const allChildrenSelected = groupedData?.[groupKey]?.every((childKey: any) =>
              updatedKeys.includes(childKey)
            );

            return allChildrenSelected ? [...updatedKeys, groupKey] : updatedKeys.filter(key => key !== groupKey);
          });
        }
      },
    }),
  };

  return <MultiExpandTable {...argTypes} rowSelection={rowSelection} />;
};

DefaultMultiExpandTable.args = {
  columns: [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
  ],
  data: [
    { key: 1, name: 'Bill', age: 8, address: 'Rostov' },
    { key: 2, name: 'Sue', age: 8, address: 'Moscow' },
    { key: 3, name: 'Leo', age: 9, address: 'Rostov' },
    { key: 4, name: 'Kanye', age: 8, address: 'London' },
  ],
  groupedKey: ['address'],
  isExpanded: true,
  isExpandedByDefault: true,
  rowKey: 'key',
};
