import React from 'react';

import { TExtendedThemeConfig } from '@/providers/theme-provider';
import { NDrawer } from '@/ui/drawer/models.ts';

type TResizeParams = NDrawer.TProps & {
  setInitialWidth: (value: number | string) => void;
  setInitialX: (value: number) => void;
  setInitialHeight: (value: number | string) => void;
  setInitialY: (value: number) => void;
  drawerWidth: number | string;
  drawerHeight: number | string;
  initialWidth: number | string;
  initialHeight: number | string;
  initialX: number;
  initialY: number;
  setDrawerWidth: (value: number | string) => void;
  setDrawerHeight: (value: number | string) => void;
};

export const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, params: TResizeParams) => {
  const { setInitialWidth, setInitialX, setInitialHeight, setInitialY, drawerWidth, drawerHeight, placement } = params;
  const initialX = placement === 'left' ? event.clientX : window.innerWidth - event.clientX;
  const initialY = placement === 'top' ? event.clientY : window.innerHeight - event.clientY;

  setInitialWidth(drawerWidth);
  setInitialX(initialX);
  setInitialHeight(drawerHeight);
  setInitialY(initialY);
};

export const handleMouseMove = (event: MouseEvent, params: TResizeParams) => {
  const {
    initialWidth,
    initialHeight,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    placement,
    setDrawerWidth,
    setDrawerHeight,
  } = params;

  let newWidth = initialWidth;
  let newHeight = initialHeight;

  if (placement === 'left' || placement === 'right') {
    newWidth = placement === 'left' ? event.clientX : window.innerWidth - event.clientX;
    if (minWidth !== undefined && maxWidth !== undefined && newWidth >= +minWidth && newWidth <= +maxWidth) {
      setDrawerWidth(newWidth);
    }
  }

  if (placement === 'top' || placement === 'bottom') {
    newHeight = placement === 'top' ? event.clientY : window.innerHeight - event.clientY;
    if (minHeight !== undefined && maxHeight !== undefined && newHeight >= +minHeight && newHeight <= +maxHeight) {
      setDrawerHeight(newHeight);
    }
  }
};

export const handleSizeChange = (
  propSize: NDrawer.TProps['size'],
  handleChangeState: (object: { [k in 'drawerWidth' | 'drawerHeight']?: number }) => void,
  theme: TExtendedThemeConfig
) => {
  const defaultWidth = theme?.components?.Drawer?.width || 500;
  const defaultHeight = theme?.components?.Drawer?.height || 300;
  const largeWidth = theme?.components?.Drawer?.widthLG || 800;
  const largeHeight = theme?.components?.Drawer?.heightLG || 600;

  if (propSize === 'default') {
    handleChangeState({ drawerWidth: defaultWidth });
    handleChangeState({ drawerHeight: defaultHeight });
  } else if (propSize === 'large') {
    handleChangeState({ drawerWidth: largeWidth });
    handleChangeState({ drawerHeight: largeHeight });
  }
};
