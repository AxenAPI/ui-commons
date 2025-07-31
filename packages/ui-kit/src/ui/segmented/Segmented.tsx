import React, { FC, useMemo } from 'react';

import { Segmented as AntdSegmented } from 'antd';

import { useTheme } from '@/providers';

import { NSegmented } from './models';

import './style.module.css';

export const Segmented: FC<NSegmented.TProps> = ({ isDisabled, options, ...restProps }) => {
  const { theme } = useTheme();
  const iconSize = theme?.components?.Segmented?.fontSize;

  const menuItems = useMemo(() => {
    return options.map(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        return item;
      }

      const clonedIcon = item.icon
        ? React.cloneElement(item.icon as React.ReactElement, {
            style: {
              width: iconSize,
              height: iconSize,
            },
          })
        : null;

      return {
        ...item,
        label: (
          <>
            {clonedIcon}
            <span style={{ marginLeft: '6px' }}>{item.label}</span>
          </>
        ),
        //убираем иконку, чтобы не было задвоения
        icon: null,
      };
    });
  }, [options, iconSize]);

  return <AntdSegmented {...restProps} disabled={isDisabled} options={menuItems} />;
};
