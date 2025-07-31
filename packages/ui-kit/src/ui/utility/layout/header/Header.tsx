import { Layout as AntdLayout } from 'antd';
import cn from 'classnames';

import { useTheme } from '@/providers';
import { Button } from '@/ui/buttons/Button';
import { Title } from '@/ui/typography/title/Title';
import { DefaultHeaderIcons } from '@/ui/utility/layout/header/defaultIcons';

import { NLayout } from '../models';
import styles from '../style.module.scss';

export function Header({
  isShowTab,
  isShowBreadCrumbs,
  isShowMenuBtn,
  Tab,
  Breadcrumbs,
  style,
  children,
  title,
  menuIcon,
  menuIconSize,
  onToggleSider,
  className,
  defaultButtons,
  ...rest
}: NLayout.THeaderProps) {
  const { theme } = useTheme();
  const { headerSplitColor: borderStyle, headerHeight: headerHeight } = theme?.components?.Layout || {};
  const borderStyleBottom = `1px solid ${borderStyle}`;

  return (
    <AntdLayout.Header
      {...rest}
      className={cn(styles.header, className)}
      style={{ borderBottom: borderStyleBottom, ...style }}
    >
      <div className={styles.container} style={{ height: headerHeight }}>
        <div className={styles.breadcrumbs}>
          {isShowMenuBtn && (
            <Button type="text" size={menuIconSize} className={styles.menuIcon} onClick={onToggleSider}>
              {menuIcon}
            </Button>
          )}
          {isShowBreadCrumbs ? (
            Breadcrumbs
          ) : (
            <Title level={5} className={styles.title}>
              {title}
            </Title>
          )}
        </div>
        {/*такой вариант подходит только если в ребенке кнопка для слайдера*/}
        <div style={{ display: 'flex', gap: 12 }}>
          {children}
          {defaultButtons}
        </div>
      </div>
      {isShowTab && Tab}
    </AntdLayout.Header>
  );
}

Header.DefaultHeaderIcons = DefaultHeaderIcons;
