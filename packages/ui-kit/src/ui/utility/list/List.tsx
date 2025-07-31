import { List as AntdList, ListProps as ListAntdProps } from 'antd';

export type TListProps<T> = ListAntdProps<T>;

export function List<T>(props: TListProps<T>) {
  return <AntdList {...props} />;
}
