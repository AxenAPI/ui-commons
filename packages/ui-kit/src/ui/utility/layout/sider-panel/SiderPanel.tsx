import cn from 'classnames';

import { useTheme } from '@/providers/theme-provider';
import { Title } from '@/ui';

import { NLayout } from '../models';
import { Sider } from '../sider';
import styles from '../style.module.scss';

export const SiderPanel = (props: NLayout.TSiderPanelProps) => {
  const { title, className, children, isCollapsed } = props;
  const { theme } = useTheme();

  return (
    <Sider
      className={cn(styles.siderPanel, {
        [styles.siderActive]: !isCollapsed,
      })}
      collapsed={isCollapsed}
      collapsedWidth={0}
      width={theme.components?.Layout?.panelWidth}
      style={{
        background: theme.components?.Layout?.bodyBg,
      }}
    >
      <div className={cn(styles.siderPanelContent, className)} style={{ width: theme.components?.Layout?.panelWidth }}>
        {title && (
          <div className={styles.siderTitle}>
            <Title level={4} style={{ margin: 0 }}>
              {title}
            </Title>
          </div>
        )}
        {children}
      </div>
    </Sider>
  );
};
