import { Layout as AntdLayout } from 'antd';

import { NLayout } from './models';

/**
 * Шаблон лейаута
 * */
export function Layout({ children, ...restProps }: NLayout.TBasicProps) {
  return <AntdLayout {...restProps}>{children}</AntdLayout>;
}
