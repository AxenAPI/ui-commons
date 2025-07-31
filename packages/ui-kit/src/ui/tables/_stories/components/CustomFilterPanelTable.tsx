import { ReactNode, useRef } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import { InputRef } from 'antd';

import { Button } from '@/ui/buttons';
import { Input } from '@/ui/form';
import { NTable, NColumns } from '@/ui/tables/models';
import { Table } from '@/ui/tables/Table';
import { Space } from '@/ui/utility';

import { DEFAULT_DATA } from '../consts';
import { NTableDataType } from '../models';

export const CustomFilterPanelTable = (argTypes: NTable.TTableProps<NTableDataType.TDataType>): ReactNode => {
  const searchInput = useRef<InputRef>(null);

  const getColumnSearchProps = (
    dataIndex: NTableDataType.TDataTypeIndex
  ): NColumns.TColumnType<NTableDataType.TDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          value={`${selectedKeys[0] || ''}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Search
          </Button>
          <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
  });

  const columns: NColumns.TColumnsType<NTableDataType.TDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  return <Table {...argTypes} columns={columns} />;
};

CustomFilterPanelTable.storyName = 'Table with custom filter panel';
CustomFilterPanelTable.args = {
  data: DEFAULT_DATA,
};
