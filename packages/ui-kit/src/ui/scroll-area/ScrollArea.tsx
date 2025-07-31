import { FC } from 'react';

import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

import { useTheme } from '@/providers';

import { NScrollArea } from './models';

import styles from './styles.module.css';

/**
 * Базовый класс из библиотеки, на основе которого создается тема для скролла
 */
export const BASE_SCROLLBAR_CLASS_NAME = 'os-theme-light';
export const ScrollArea: FC<NScrollArea.TProps> = ({ children, className, orientation, options, ...restProps }) => {
  const { theme } = useTheme();
  const tokens = theme?.components?.ScrollArea;

  const cssVars = {
    '--scroll-handle-bg': tokens?.scrollThumbColor,
    '--scroll-handle-bg-hover': tokens?.scrollThumbColorHover,
    '--scroll-handle-bg-active': tokens?.scrollThumbColorActive,
    '--scroll-padding-axis': tokens?.scrollThumbPadding,
    '--scroll-padding-perpendicular': tokens?.scrollThumbPadding,
    '--scroll-width': tokens?.scrollThumbWidth,
  };

  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          theme: cn(styles.custom, BASE_SCROLLBAR_CLASS_NAME),
          visibility: 'auto',
          autoHide: 'leave',
          autoHideDelay: 0,
          ...options,
        },
        overflow: {
          x:
            orientation === 'horizontal'
              ? 'scroll'
              : orientation === 'vertical'
              ? 'hidden'
              : 'scroll',
          y:
            orientation === 'vertical'
              ? 'scroll'
              : orientation === 'horizontal'
              ? 'hidden'
              : 'scroll',
        },
      }}
      className={className}
      {...restProps}
      style={cssVars as React.CSSProperties}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
