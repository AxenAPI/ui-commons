import { NTable } from '@/ui/tables/models/model.ts';

export namespace NTableDataType {
  export type TOnChange = NonNullable<NTable.TTableProps<TDataType>['onChange']>;
  export type TFilters = Parameters<TOnChange>[1];

  export type TGetSingle<T> = T extends (infer U)[] ? U : never;
  export type TSorts = TGetSingle<Parameters<TOnChange>[2]>;

  export type TDataTypeIndex = keyof TDataType;

  export type TDataType = {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  };

  export type TDataTypeWithTag = {
    tags: string[];
  } & TDataType;

  export type TDataTypeWithDescription = {
    description: string;
  } & TDataType;

  export type TSpanDataType = {
    tel: string;
    phone: number;
  } & TDataType;

  export type TGroupedDataType = {
    key: React.Key;
    name: string;
    age: number;
    street: string;
    building: string;
    number: number;
    companyAddress: string;
    companyName: string;
    gender: string;
  };

  export type THiddenDataType = {
    title: string;
    dataIndex: string;
    key: string;
  };

  export type TMultipleSorterDataType = {
    key: React.Key;
    name: string;
    chinese: number;
    math: number;
    english: number;
  };

  export type TNestedColumnsDataType = {
    key: React.Key;
    name: string;
    platform: string;
    version: string;
    upgradeNum: number;
    creator: string;
    createdAt: string;
  };

  export type TExpandedNestedTableDataType = {
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: string;
  };

  export type TEditableCellDataType = {
    key: string;
    name: string;
    age: number;
    address: string;
    order?: string;
    size?: string;
    preference?: string;
    version?: string | null;
  };

  export type TEditableCellProps = {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: TEditableCellDataType;
    index: number;
  } & React.HTMLAttributes<HTMLElement>;
}
