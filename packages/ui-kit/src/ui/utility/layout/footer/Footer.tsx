import { Layout as AntdLayout } from 'antd';

import { NLayout } from '../models';

export function Footer({ children, ...restProps }: NLayout.TFooterProps) {
  return <AntdLayout.Footer {...restProps}>{children}</AntdLayout.Footer>;
}
