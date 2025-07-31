import { ReactNode, useState } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

import { NPagination } from '@/ui/pagination/model';

import { Pagination } from '../Pagination';

export default {
  title: 'Axenix UI/Pagination/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'text' },
    defaultCurrent: { control: 'number' },
    total: { control: 'number' },
    isDisabled: { control: 'boolean' },
    shouldShowSizeChanger: { control: 'boolean' },
    isSimple: { control: 'boolean' },
    itemRender: fn(),
    showTotal: fn(),
    onChange: fn(),
  },
  args: { onChange: fn() },
} as Meta<typeof Pagination>;

export const DefaultPagination = (argTypes: NPagination.TProps): ReactNode => {
  const [pageState, setPageState] = useState({ current: 1 });

  const handleChangePagination = (page: number) => {
    setPageState({
      ...pageState,
      current: page,
    });
  };
  return (
    <div>
      <span>Контент на странице: {pageState.current}</span>
      <Pagination {...argTypes} current={pageState.current} onChange={handleChangePagination} />
    </div>
  );
};
DefaultPagination.args = {
  defaultCurrent: 1,
  total: 50,
  size: 'default',
  pageSize: 10,
};

export const DisabledPagination = (argTypes: NPagination.TProps): ReactNode => {
  return <Pagination {...argTypes} />;
};
DisabledPagination.args = {
  defaultCurrent: 1,
  total: 50,
  isDisabled: true,
};

export const SimplePagination = (argTypes: NPagination.TProps) => {
  const [pageState, setPageState] = useState({ current: 1 });

  const handleChangePagination = (page: number) => {
    setPageState({
      ...pageState,
      current: page,
    });
  };

  return <Pagination {...argTypes} current={pageState.current} onChange={handleChangePagination} />;
};
SimplePagination.args = {
  defaultCurrent: 1,
  total: 50,
  isSimple: true,
};

export const SmallPagination = (argTypes: NPagination.TProps): ReactNode => {
  const [pageState, setPageState] = useState({ current: 1 });

  const handleChangePagination = (page: number) => {
    setPageState({
      ...pageState,
      current: page,
    });
  };
  return <Pagination {...argTypes} current={pageState.current} onChange={handleChangePagination} />;
};
SmallPagination.args = {
  defaultCurrent: 1,
  total: 50,
  size: 'small',
};

export const MorePagesPagination = (argTypes: NPagination.TProps): ReactNode => {
  const [pageState, setPageState] = useState({ current: 1 });

  const handleChangePagination = (page: number) => {
    setPageState({
      ...pageState,
      current: page,
    });
  };
  return <Pagination {...argTypes} current={pageState.current} onChange={handleChangePagination} />;
};
MorePagesPagination.args = {
  defaultCurrent: 6,
  total: 500,
  shouldShowSizeChanger: true,
};

export const DisplayTotalNumberPagination = (argTypes: NPagination.TProps): ReactNode => {
  const [pageState, setPageState] = useState({ current: 1 });

  const handleChangePagination = (page: number) => {
    setPageState({
      ...pageState,
      current: page,
    });
  };
  return <Pagination {...argTypes} current={pageState.current} onChange={handleChangePagination} />;
};

DisplayTotalNumberPagination.args = {
  defaultCurrent: 1,
  total: 500,
  showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} из ${total} элеметнов`,
  shouldShowSizeChanger: true,
};

export const PageSizeChangerPagination = (argTypes: NPagination.TProps): ReactNode => {
  const [pageState, setPageState] = useState({ current: 1, pageSize: 10, totalNumber: 200 });

  const handleChangePagination = (page: number, pageSize: number) => {
    setPageState({
      ...pageState,
      current: page,
      pageSize,
    });
  };

  return (
    <Pagination
      {...argTypes}
      current={pageState.current}
      pageSize={pageState.pageSize}
      total={pageState.totalNumber}
      onChange={handleChangePagination}
    />
  );
};

PageSizeChangerPagination.args = {
  defaultCurrent: 1,
  isPageSizeChanger: true,
  defaultPageSize: 5,
};
