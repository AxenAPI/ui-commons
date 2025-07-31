import { Meta, StoryFn } from '@storybook/react';

import { ListProps } from 'antd';

import { List } from '@/ui';

const meta: Meta<ListProps<any>> = {
  title: 'Axenix Ui/List/List',
  component: List,
  argTypes: {
    dataSource: { control: 'object' },
    renderItem: { control: false },
    pagination: { control: 'object' },
    bordered: { control: 'boolean' },
    loading: { control: 'boolean' },
    header: { control: 'text' },
    footer: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof List>;

export default meta;

const Template: StoryFn<ListProps<any>> = (args: any) => <List {...args} />;

export const SimpleList = Template.bind({});
SimpleList.args = {
  dataSource: ['Item 1', 'Item 2', 'Item 3'],
  renderItem: (item: string) => <div>{item}</div>,
};

export const ListWithCustomItems = Template.bind({});
ListWithCustomItems.args = {
  dataSource: [
    { label: 'Item 1', key: 1 },
    { label: 'Item 2', key: 2 },
    { label: 'Item 3', key: 3 },
  ],
  renderItem: (item: { label: string; key: number }) => (
    <div>
      <strong>{item.label}</strong> - {item.key} years old
    </div>
  ),
};

export const ListWithPagination = Template.bind({});
ListWithPagination.args = {
  dataSource: Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`),
  renderItem: (item: string) => <div>{item}</div>,
  pagination: {
    pageSize: 10,
  },
};

export const LoadingList = Template.bind({});
LoadingList.args = {
  dataSource: [],
  loading: true,
};

export const BorderedList = Template.bind({});
BorderedList.args = {
  dataSource: ['Item 1', 'Item 2', 'Item 3'],
  renderItem: (item: string) => <div>{item}</div>,
  bordered: true,
};

export const ListWithHeaderAndFooter = Template.bind({});
ListWithHeaderAndFooter.args = {
  dataSource: ['Item 1', 'Item 2', 'Item 3'],
  renderItem: (item: string) => <div>{item}</div>,
  header: <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>List Header</div>,
  footer: <div style={{ fontStyle: 'italic', color: 'gray' }}>List Footer</div>,
};
