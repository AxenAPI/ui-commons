import { cloneElement, ReactElement, useEffect, useState } from 'react';

import { Tabs as AntdTabs } from 'antd';
import cn from 'classnames';

import { useTheme } from '@/providers/theme-provider';
import TabsLabelWrapper from '@/ui/navigation/tabs/TabsLabelWrapper.tsx';

import { NTab } from './models';
import { getMapSizesIcon } from './utils.ts';

import styles from './style.module.css';

export const Tabs = (props: NTab.TProps) => {
  const [currentActiveKey, setCurrentActiveKey] = useState(props?.defaultActiveKey);
  const { theme } = useTheme();

  useEffect(() => {
    if (props?.activeKey) {
      setCurrentActiveKey(props?.activeKey);
    }
  }, [props?.activeKey]);

  const handleTabChange = (key: string) => {
    setCurrentActiveKey(key);
    if (props.onChange) {
      props.onChange(key);
    }
  };

  return (
    <AntdTabs
      {...props}
      className={cn(props.className, styles.customTabs)}
      activeKey={currentActiveKey}
      onChange={handleTabChange}
      items={props.items?.map(item => {
        const { extraNode, hasBadge, badgeCount, label, icon, key, ...restItem } = item;

        const isActive = currentActiveKey === key;
        const badgeUsedType = isActive ? 'primary' : 'default';

        return {
          ...restItem,
          key: key,
          icon: icon
            ? cloneElement(icon as ReactElement, {
                style: {
                  width: getMapSizesIcon(theme)?.[props.size || 'middle'],
                  height: getMapSizesIcon(theme)?.[props.size || 'middle'],
                },
              })
            : null,
          label: (
            <TabsLabelWrapper
              label={label}
              hasBadge={hasBadge}
              badgeCount={badgeCount}
              badgeUsedType={badgeUsedType}
              extraNode={extraNode}
              isActiveTab={isActive}
            />
          ),
          disabled: item.isDisabled,
          forceRender: item.shouldForceRender,
          closable: item.isClosable,
          animated: item.isAnimated,
          active: item.isActive,
          destroyInactiveTabPane: item.shouldDestroyInactiveTabPane,
        };
      })}
      animated={props.isAnimated}
      destroyInactiveTabPane={props.shouldDestroyInactiveTabPane}
      hideAdd={props.shouldHideAdd}
      centered={props.isCentered}
      renderTabBar={props.renderTabBar as any}
    />
  );
};
