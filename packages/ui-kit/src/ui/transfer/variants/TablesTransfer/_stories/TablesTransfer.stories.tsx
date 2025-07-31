import { Meta } from '@storybook/react';

import { TablesTransfer } from '../TablesTransfer';
import { Default, InfiniteScroll, OneWay, RemotelyControlled, Search } from './components';

export default {
  title: 'Axenix UI/Transfer/TablesTransfer',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    withSearchButton: { control: 'boolean' },
  },
  component: TablesTransfer,
} as Meta<typeof TablesTransfer>;

export { Default, InfiniteScroll, OneWay, RemotelyControlled, Search };
