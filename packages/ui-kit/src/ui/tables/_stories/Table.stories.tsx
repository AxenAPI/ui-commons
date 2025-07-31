import { Meta, StoryObj } from '@storybook/react';

import { TAnyObject } from '@/models';

import { Table } from '../Table';
import {
  BorderTitleFooterTable,
  CustomEmptyTable,
  CustomFilterPanelTable,
  DefaultTable,
  DragNDropRowsTable,
  EditableCellTable,
  EllipsisColumnTable,
  EllipsisWithTooltipTable,
  ExpandableTable,
  FilterInTreeTable,
  FilterSearchTable,
  FilterSorterTable,
  FixedColumnsAndHeaderTable,
  FixedColumnsTable,
  FixedHeaderTable,
  GroupedColumnsTable,
  HiddenColumnsTable,
  HiddenScrollTable,
  MultipleSorterTable,
  NestedTables,
  ResetFiltersTable,
  ResponsiveColumnsTable,
  SelectionOperationTable,
  SelectionTable,
  SelectionTableWithFlag,
  SizedTable,
  SpanTable,
  TreeDataTable,
  WithActions,
} from './components';
import { NTableDataType } from './models';

import styles from './styles.module.css';

const withWrapper = (Story: any) => <div className={styles.wrapper}>{Story()}</div>;

type TLocalMeta<T extends TAnyObject = NTableDataType.TDataType> = Meta<typeof Table<T>>;

const meta: TLocalMeta = {
  title: 'Axenix UI/Tables/Table',
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  component: Table,
  decorators: [withWrapper],
};

export default meta;
export type TStory<T extends TAnyObject = NTableDataType.TDataType> = StoryObj<TLocalMeta<T>>;

export {
  CustomFilterPanelTable,
  EditableCellTable,
  WithActions,
  DefaultTable,
  EllipsisColumnTable,
  EllipsisWithTooltipTable,
  ExpandableTable,
  FilterInTreeTable,
  FilterSearchTable,
  FilterSorterTable,
  FixedColumnsAndHeaderTable,
  FixedColumnsTable,
  FixedHeaderTable,
  GroupedColumnsTable,
  HiddenColumnsTable,
  HiddenScrollTable,
  MultipleSorterTable,
  NestedTables,
  BorderTitleFooterTable,
  ResetFiltersTable,
  ResponsiveColumnsTable,
  SelectionOperationTable,
  SelectionTable,
  SelectionTableWithFlag,
  SpanTable,
  SizedTable,
  TreeDataTable,
  CustomEmptyTable,
  DragNDropRowsTable,
};
