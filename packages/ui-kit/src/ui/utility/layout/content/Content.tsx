import { Layout as AntdLayout } from 'antd';

import { NLayout } from '../models';

export function Content({ children, ...restProps }: NLayout.TContentProps) {
  return <AntdLayout.Content {...restProps}>{children}</AntdLayout.Content>;
}
