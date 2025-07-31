import { FC, useMemo } from 'react';

import { Collapse as AntdCollapse } from 'antd';
import cn from 'classnames';

import { DefaultExpandIcon } from '@/ui/accordions/_common';

import { NCollapse } from './models';

import styles from './style.module.css';

export const Collapse: FC<NCollapse.TProps> = ({
  isOutline,
  isBordered,
  isGhost,
  shouldDestroyInactivePanel,
  expandIcon,
  items,
  ...props
}) => {
  const customItems = useMemo(
    () =>
      items?.map(item =>
        isOutline
          ? {
              ...item,
              className: cn(styles.outlinedCollapsePanel, item.className),
              headerClass: cn(styles.header, item.headerClass),
            }
          : item
      ) ?? [],
    [isOutline, items]
  );

  return (
    <AntdCollapse
      {...props}
      accordion={false}
      destroyInactivePanel={shouldDestroyInactivePanel}
      bordered={isOutline ? false : isBordered}
      ghost={isGhost}
      className={cn(props.className, { [styles.outlinedCollapse]: isOutline })}
      items={customItems}
      expandIcon={expandIcon ?? DefaultExpandIcon}
    />
  );
};
