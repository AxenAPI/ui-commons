import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { IconX } from '@tabler/icons-react';

import { Drawer as AntDrawer } from 'antd';
import cn from 'classnames';

import { TExtendedThemeConfig, useTheme } from '@/providers/theme-provider';

import { DrawerFooterDefault } from './DrawerFooterDefault';
import { handleMouseDown, handleMouseMove, handleSizeChange } from './helpers';
import { NDrawer } from './models';

import styles from './styles.module.scss';

export const ResizableDragger = ({
  onMouseDown,
  placement,
  theme,
  state,
  isOpen,
}: {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  placement: NDrawer.TBaseProps['placement'];
  theme: TExtendedThemeConfig;
  state: NDrawer.TDrawerState;
  isOpen: boolean;
}) => {
  const computeResizer: Record<NDrawer.TPlacement, Record<string, string | number>> = {
    left: { left: state.drawerWidth },
    right: { right: state.drawerWidth },
    top: { top: state.drawerHeight },
    bottom: { bottom: state.drawerHeight },
  };

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      onMouseDown={onMouseDown}
      className={`${styles.dragger} ${placement === 'top' || placement === 'bottom' ? styles.draggerTop : styles.draggerBottom}`}
      style={{
        ...computeResizer[placement!],
        [placement === 'left' || placement === 'right' ? 'height' : 'width']: '100%',
        [placement === 'left' || placement === 'right' ? 'width' : 'height']: theme?.components?.Drawer?.resizerWidth,
        cursor: placement === 'left' || placement === 'right' ? 'col-resize' : 'ns-resize',
        backgroundColor: theme?.components?.Drawer?.resizerBg,
      }}
    >
      <div
        className={styles.resizer}
        style={{
          width: placement === 'top' || placement === 'bottom' ? '28px' : theme?.components?.Drawer?.resizerGutterWidth,
          height:
            placement === 'top' || placement === 'bottom' ? '2px' : theme?.components?.Drawer?.resizerGutterHeight,
          backgroundColor: theme?.components?.Drawer?.resizerGutterBg,
          borderRadius: theme?.components?.Drawer?.resizerGutterBorderRadius,
        }}
      />
    </div>
  );
};

const DEFAULT_DRAWER_WIDTH = 500;
const DEFAULT_DRAWER_HEIGHT = 0;

export function Drawer({ withDefaultFooter, defaultFooterProps, customFooter, ...props }: NDrawer.TProps) {
  const { theme } = useTheme();
  const closeIconSize = theme?.components?.Drawer?.closeIconSize;
  const [state, setState] = useState<NDrawer.TDrawerState>({
    drawerWidth: DEFAULT_DRAWER_WIDTH,
    initialWidth: 0,
    drawerHeight: DEFAULT_DRAWER_HEIGHT,
    initialHeight: 0,
    initialX: 0,
    initialY: 0,
    isResizing: false,
  });

  const {
    minWidth = theme?.components?.Drawer?.minWidth,
    maxWidth = theme?.components?.Drawer?.maxWidth,
    minHeight = theme?.components?.Drawer?.minHeight,
    maxHeight = theme?.components?.Drawer?.maxHeight,
    isResizable = false,
    placement,
    isOpen = false,
    width = theme?.components?.Drawer?.width,
    height = theme?.components?.Drawer?.height,
    size: propSize = 'default',
    className,
  } = props;

  const handleChangeState = useCallback((object: { [k in keyof typeof state]?: (typeof state)[k] }) => {
    setState(prevState => ({
      ...prevState,
      ...object,
    }));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      handleChangeState({ drawerWidth: width });
      handleChangeState({ drawerHeight: height });
    }
  }, [isOpen, width, height, handleChangeState]);

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    handleMouseDown(event, {
      setInitialWidth: value => handleChangeState({ initialWidth: value }),
      setInitialX: value => handleChangeState({ initialX: Number(value) }),
      setInitialHeight: value => handleChangeState({ initialHeight: value }),
      setInitialY: value => handleChangeState({ initialY: Number(value) }),
      drawerWidth: state.drawerWidth,
      drawerHeight: state.drawerHeight,
      initialWidth: state.initialWidth,
      initialHeight: state.initialHeight,
      initialX: state.initialX,
      initialY: state.initialY,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      placement,
      setDrawerWidth: value => handleChangeState({ drawerWidth: value }),
      setDrawerHeight: value => handleChangeState({ drawerHeight: Number(value) }),
      ...props,
    });
    handleChangeState({ isResizing: true });
  };

  const onMouseUp = useCallback(() => {
    handleChangeState({ isResizing: false });
  }, [handleChangeState]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (state.isResizing) {
        handleMouseMove(event, {
          setInitialWidth: value => handleChangeState({ initialWidth: value ?? DEFAULT_DRAWER_WIDTH }),
          setInitialX: value => handleChangeState({ initialX: Number(value) }),
          setInitialHeight: value => handleChangeState({ initialHeight: value }),
          setInitialY: value => handleChangeState({ initialY: Number(value) }),
          drawerWidth: state.drawerWidth,
          drawerHeight: state.drawerHeight,
          initialWidth: state.initialWidth,
          initialHeight: state.initialHeight,
          initialX: state.initialX,
          initialY: state.initialY,
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
          placement,
          setDrawerWidth: value => handleChangeState({ drawerWidth: value }),
          setDrawerHeight: value => handleChangeState({ drawerHeight: value }),
          ...props,
        });
      }
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [
    maxHeight,
    maxWidth,
    minWidth,
    minHeight,
    onMouseUp,
    placement,
    props,
    handleChangeState,
    state.isResizing,
    state.drawerWidth,
    state.drawerHeight,
    state.initialWidth,
    state.initialHeight,
    state.initialX,
    state.initialY,
  ]);

  useEffect(() => {
    handleSizeChange(propSize, handleChangeState, theme);
  }, [propSize, handleChangeState, theme]);

  return (
    <>
      <AntDrawer
        {...props}
        destroyOnClose={props.isDestroyOnClose}
        forceRender={props.isForceRender}
        keyboard={props.isKeyboard}
        mask={props.isMask}
        maskClosable={props.isMaskClosable}
        push={props.isPush}
        loading={props.isLoading}
        open={props.isOpen}
        className={cn(styles.drawer, className, { [styles.drawerBodyWithoutPadding]: props.withoutDrawerBodyPadding })}
        width={state.drawerWidth}
        height={state.drawerHeight}
        placement={placement}
        closeIcon={
          props.closeIcon ?? (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <IconX stroke={1.5} size={closeIconSize} />
            </span>
          )
        }
        footer={
          withDefaultFooter ? (
            <DrawerFooterDefault onClose={props.onClose} {...defaultFooterProps} />
          ) : (
            <div className={styles.customFooter}>{customFooter}</div>
          )
        }
      >
        {props.children}
      </AntDrawer>
      {createPortal(
        isResizable ? (
          <ResizableDragger
            onMouseDown={onMouseDown}
            placement={placement}
            theme={theme}
            state={state}
            isOpen={isOpen}
          />
        ) : null,
        document.body
      )}
    </>
  );
}
