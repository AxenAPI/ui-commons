import { fn } from '@storybook/test';

import { Empty } from 'antd';

import {
  DEFAULT_COLUMNS,
  DEFAULT_DATA,
  DEFAULT_DATA_WITH_TAGS,
  ELLIPSES_COLUMNS,
  ELLIPSES_WITH_TOOLTIPS_COLUMNS,
  FILTER_IN_TREE_COLUMNS,
  FILTER_SEARCH_COLUMNS,
  FILTER_SORTER_COLUMNSS,
  FIXED_COLUMNS,
  FIXED_HEADER_COLUMNS,
  GROUPED_COLUMNS,
  MULTIPLE_SORTER_COLUMNS,
  MULTIPLE_SORTER_DATA,
  RESPONSIVE_COLUMNS,
  SELECTION_COLUMNS,
  SELECTION_COLUMNS_WITH_SELECTION_FLAG,
  SELECTION_DATA,
  SPAN_COLUMNS,
  SPAN_DATA,
} from '../consts';
import { getDataForGroupedTable, getDefaultData, onTableChange, onTableChangeMultiple } from '../helpers';
import { NTableDataType } from '../models';
import { TStory } from '../Table.stories';

export const DefaultTable: TStory<NTableDataType.TDataTypeWithTag> = {
  storyName: 'DefaultTable',
  name: 'Default table',
  args: {
    columns: DEFAULT_COLUMNS,
    data: DEFAULT_DATA_WITH_TAGS,
    isBordered: false,
    isLoading: false,
    shouldShowHeader: true,
    isNeedToShowSettingsCell: true,
  },
};

export const SelectionTable: TStory = {
  storyName: 'Selection table',
  args: {
    columns: SELECTION_COLUMNS,
    data: SELECTION_DATA,
    rowSelection: {
      type: 'checkbox',
      onChange: fn(),
      getCheckboxProps: (record: NTableDataType.TDataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    },
  },
};

export const SelectionTableWithFlag: TStory = {
  storyName: 'Selection table with flag',
  args: {
    columns: SELECTION_COLUMNS_WITH_SELECTION_FLAG,
    data: SELECTION_DATA,
    rowSelection: {
      type: 'checkbox',
      onChange: fn(),
      getCheckboxProps: (record: NTableDataType.TDataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    },
  },
};

export const FilterSorterTable: TStory = {
  storyName: 'Filter and sorter table',
  args: {
    columns: FILTER_SORTER_COLUMNSS,
    data: DEFAULT_DATA,
    onChange: onTableChange,
  },
};

export const FilterInTreeTable: TStory = {
  storyName: 'Filter in tree table',
  args: {
    columns: FILTER_IN_TREE_COLUMNS,
    data: DEFAULT_DATA,
    onChange: onTableChange,
  },
};

export const FilterSearchTable: TStory = {
  storyName: 'Filter with search table',
  args: {
    columns: FILTER_SEARCH_COLUMNS,
    data: DEFAULT_DATA,
    onChange: onTableChange,
  },
};

export const MultipleSorterTable: TStory<NTableDataType.TMultipleSorterDataType> = {
  storyName: 'Filter with search table',
  args: {
    columns: MULTIPLE_SORTER_COLUMNS,
    data: MULTIPLE_SORTER_DATA,
    onChange: onTableChangeMultiple,
  },
};

export const BorderTitleFooterTable: TStory = {
  storyName: 'Table with border, title and footer',
  args: {
    columns: SELECTION_COLUMNS,
    data: SELECTION_DATA,
    isBordered: true,
    title: () => 'Header',
    footer: () => 'Footer',
  },
};

export const SpanTable: TStory<NTableDataType.TSpanDataType> = {
  storyName: 'Table with colSpan and rowSpan',
  args: {
    columns: SPAN_COLUMNS,
    data: SPAN_DATA,
    isBordered: true,
  },
};

export const FixedHeaderTable: TStory = {
  storyName: 'Table with fixed header',
  args: {
    columns: FIXED_HEADER_COLUMNS,
    data: getDefaultData(100),
    pagination: { pageSize: 50 },
    scroll: { y: 240 },
  },
};

export const FixedColumnsTable: TStory = {
  storyName: 'Table with fixed columns',
  args: {
    columns: FIXED_COLUMNS,
    data: DEFAULT_DATA,
    scroll: { x: 1300 },
  },
};

export const FixedColumnsAndHeaderTable: TStory = {
  storyName: 'Table with fixed columns and header',
  args: {
    columns: FIXED_COLUMNS,
    data: getDefaultData(100),
    scroll: { x: 1500, y: 300 },
  },
};

export const GroupedColumnsTable: TStory<NTableDataType.TGroupedDataType> = {
  storyName: 'Table with grouped columns',
  args: {
    columns: GROUPED_COLUMNS,
    data: getDataForGroupedTable(),
    isBordered: true,
    size: 'middle',
    scroll: { x: 'calc(700px + 50%)', y: 240 },
  },
};

export const EllipsisColumnTable: TStory = {
  storyName: 'Table with ellipsis cell content',
  args: {
    columns: ELLIPSES_COLUMNS,
    data: DEFAULT_DATA_WITH_TAGS,
  },
};

export const EllipsisWithTooltipTable: TStory = {
  storyName: 'Table with ellipsis cell content with custom tooltip',
  args: {
    columns: ELLIPSES_WITH_TOOLTIPS_COLUMNS,
    data: DEFAULT_DATA_WITH_TAGS,
  },
};

export const ResponsiveColumnsTable: TStory = {
  storyName: 'Table with responsive columns',
  args: {
    columns: RESPONSIVE_COLUMNS,
    data: DEFAULT_DATA,
  },
};

export const CustomEmptyTable: TStory<NTableDataType.TDataTypeWithTag> = {
  storyName: 'CustomEmptyTable',
  name: 'Custom empty table',
  args: {
    columns: DEFAULT_COLUMNS,
    data: [],
    locale: { emptyText: <Empty description={'Данные отсутствуют'} /> },
  },
};
