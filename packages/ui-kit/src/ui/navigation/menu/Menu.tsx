import { cloneElement, FC, ReactElement } from 'react';

import { Menu as AntdMenu } from 'antd';

import { useTheme } from '@/providers';

import { NMenu } from './models';

import styles from './style.module.css';

export const Menu: FC<NMenu.TProps> = ({
  isForceSubMenuRender,
  isInlineCollapsed,
  isMultiple,
  isSelectable,
  mode,
  ...rest
}) => {
  const { theme } = useTheme();
  const iconSize = theme?.components?.Menu?.iconSize;

  const styleIcon = {
    width: iconSize,
    height: iconSize,
    fontSize: iconSize,
  };

  const items = rest.items?.map((item: any) => ({
    ...item,
    icon: item?.icon ? cloneElement(item.icon as ReactElement, { style: styleIcon }) : null,
  }));

  const inlineCollapsed = mode === 'inline' ? { inlineCollapsed: isInlineCollapsed } : {};

  return (
    <AntdMenu
      {...rest}
      forceSubMenuRender={isForceSubMenuRender}
      {...inlineCollapsed}
      multiple={isMultiple}
      selectable={isSelectable}
      items={items}
      className={styles.menu}
      mode={mode}
    />
  );
};
