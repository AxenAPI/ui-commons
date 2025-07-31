import { Layout as AntdLayout } from 'antd';
import cn from 'classnames';

import { ScrollArea } from '@/ui';

import { NLayout } from '../models';
import styles from '../style.module.scss';

export function Sider({ children, style, ...restProps }: NLayout.TSiderProps) {
  const { collapsed } = restProps || {};
  return (
    <AntdLayout.Sider {...restProps} style={{ ...style }}>
      <ScrollArea
        orientation="vertical"
        className={
          collapsed ? cn(styles.verticalContainer, styles.verticalContainerCollapsed) : styles.verticalContainer
        }
      >
        <div>{children}</div>
      </ScrollArea>
    </AntdLayout.Sider>
  );
}
