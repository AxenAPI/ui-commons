import { ReactNode } from 'react';

import { DownOutlined } from '@ant-design/icons';

import { Badge } from 'antd';

import { Dropdown } from '@/ui/dropdown';
import { NColumns, NTable } from '@/ui/tables/models';
import { Table } from '@/ui/tables/Table';
import { Space } from '@/ui/utility';

import { NTableDataType } from '../models';

export const NestedTables = (argTypes: NTable.TTableProps<NTableDataType.TNestedColumnsDataType>): ReactNode => {
  const expandedRowRender = () => {
    const columns: NColumns.TColumnsType<NTableDataType.TExpandedNestedTableDataType> = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        key: 'operation',
        render: () => (
          <Space size="middle">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Pause</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Stop</a>
            <Dropdown
              menu={{
                items: [
                  { key: '1', label: 'Action 1' },
                  { key: '2', label: 'Action 2' },
                ],
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table<NTableDataType.TExpandedNestedTableDataType> columns={columns} data={data} pagination={false} />;
  };

  const columns: NColumns.TColumnsType<NTableDataType.TNestedColumnsDataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data: NTableDataType.TNestedColumnsDataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screen',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <>
      <Table
        {...argTypes}
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        data={data}
      />
      <Table
        {...argTypes}
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        data={data}
        size="middle"
      />
      <Table
        {...argTypes}
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        data={data}
        size="small"
      />
    </>
  );
};

NestedTables.storyName = 'NestedTables';
