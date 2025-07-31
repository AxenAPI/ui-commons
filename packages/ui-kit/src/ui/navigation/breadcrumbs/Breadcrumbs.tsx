import React, { useMemo } from 'react';

import { Breadcrumb as AntdBreadcrumb } from 'antd';

import { useTheme } from '@/providers';

import { NBreadcrumb } from './models';

import styles from './styles.module.css';

/**
 * Компонент для отображения цепочки навигации
 */
export function Breadcrumbs({ items, isLastCrumbBold, ...rest }: NBreadcrumb.TProps) {
  const { theme } = useTheme();
  const { fontSizeIcon: iconSize, fontWeightStrong, fontSizeLg, lineHeightLg } = theme?.components?.Breadcrumb ?? {};

  const updatedItems = useMemo(() => {
    return (
      items?.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const isTitleBold = isLastItem && isLastCrumbBold;

        const boldTitleStyle: React.CSSProperties = {
          fontWeight: fontWeightStrong,
          fontSize: `${fontSizeLg}px`,
          lineHeight: lineHeightLg,
        };

        // Изменение размера иконки
        const title = (
          <>
            {item.icon &&
              (item.icon
                ? React.cloneElement(item.icon as React.ReactElement, {
                    style: {
                      width: iconSize,
                      height: iconSize,
                    },
                  })
                : null)}
            {item.title && <span style={isTitleBold ? boldTitleStyle : undefined}>{item.title}</span>}
          </>
        );

        return {
          ...item,
          title,
        };
      }) ?? []
    );
  }, [items, iconSize, isLastCrumbBold, fontWeightStrong, fontSizeLg, lineHeightLg]);

  return <AntdBreadcrumb className={styles.breadcrumbs} {...rest} items={updatedItems} />;
}
