import { Meta } from '@storybook/react';

import { Transfer } from '../Transfer';
import {
  Advanced,
  CustomDataSource,
  Default,
  OneWay,
  Pagination,
  Search,
  Status,
  WithBadges,
  WithCustomButtons,
  WithCustomEmptyText,
  WithOnSearchAction,
  WithSearchButton,
  WithTables,
} from './components';
import { ARG_TYPES } from './consts';

export default {
  title: 'Axenix UI/Transfer/Transfer',
  parameters: {
    layout: 'centered',
  },
  argTypes: ARG_TYPES,
  component: Transfer,
} as Meta<typeof Transfer>;

export {
  Advanced,
  CustomDataSource,
  Default,
  OneWay,
  Pagination,
  Search,
  Status,
  WithBadges,
  WithCustomButtons,
  WithCustomEmptyText,
  WithOnSearchAction,
  WithSearchButton,
  WithTables,
};
