import { fn } from '@storybook/test';

import { NCommonTable } from '../models';
import { NTableDataType } from './models';

export const sharedOnCell = (_: NTableDataType.TSpanDataType, index?: number) => {
  if (index === 1) {
    return { colSpan: 0 };
  }

  return {};
};

export const getDataForGroupedTable = () =>
  new Array(100).fill({}).map((_, index) => ({
    key: index,
    name: 'John Brown',
    age: index + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  }));

export const getDefaultData = (count: number) =>
  new Array(count).fill({}).map((_, index) => ({
    key: index,
    name: `Edward King ${index}`,
    age: 32,
    address: `London, Park Lane no. ${index}`,
  }));

export const onTableChange: NCommonTable.TOnTableChange<NTableDataType.TDataType> = fn();

export const onTableChangeMultiple: NCommonTable.TOnTableChange<NTableDataType.TMultipleSorterDataType> = fn();
