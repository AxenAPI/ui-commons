import React, { ReactNode } from 'react';

import { fn } from '@storybook/test';

import { NColumns } from '@/ui';
import { Button } from '@/ui/buttons';
import { Divider } from '@/ui/dividers';
import { NTable } from '@/ui/tables/models/model.ts';
import { Table } from '@/ui/tables/Table';

import { DEFAULT_DATA } from '../consts';
import { NTableDataType } from '../models';

export const ResetFiltersTable = (argTypes: NTable.TTableProps<NTableDataType.TDataType>): ReactNode => {
  const [filteredInfo, setFilteredInfo] = React.useState<NTableDataType.TFilters>({});
  const [sortedInfo, setSortedInfo] = React.useState<NTableDataType.TSorts>({});

  const handleChange: NTableDataType.TOnChange = fn((_, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as NTableDataType.TSorts);
  });

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns: NColumns.TColumnsType<NTableDataType.TDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value as string),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value as string),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <>
      <Button onClick={setAgeSort}>Sort age</Button>
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button onClick={clearAll}>Clear filters and sorters</Button>
      <Divider />
      <Table {...argTypes} columns={columns} onChange={handleChange} />
    </>
  );
};

ResetFiltersTable.storyName = 'Table with reset filters and sorter';
ResetFiltersTable.args = {
  data: DEFAULT_DATA,
};
