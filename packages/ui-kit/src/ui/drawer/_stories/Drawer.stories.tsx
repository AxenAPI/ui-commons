import { ReactNode, useState } from 'react';

import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconClock, IconDeviceFloppy } from '@tabler/icons-react';

import { RadioChangeEvent } from 'antd';

import { Button, Radio, RadioGroup, Space } from '@/ui';

import { Drawer } from '../Drawer';
import { NDrawer } from '../models.ts';

import styles from './styles.module.css';

export default {
  title: 'Axenix UI/Drawer/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    afterOpenChange: fn(),
    onClose: fn(),
    placement: { control: 'text' },
    size: { control: 'select', options: ['default', 'large'] },
    isLoading: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    extra: { control: 'object' },
    isResizable: { control: 'boolean' },
    width: { control: 'text' },
    minWidth: { control: 'number' },
    maxWidth: { control: 'number' },
    minHeight: { control: 'number' },
    maxHeight: { control: 'number' },
    withDefaultFooter: { control: 'boolean' },
    withoutDrawerBodyPadding: { control: 'boolean' },
    isMaskClosable: { control: 'boolean' },
    isKeyboard: { control: 'boolean' },
  },
} as Meta<typeof Drawer>;

export const DefaultDrawer = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer}>Открыть drawer</Button>
      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <Space direction="vertical" className={styles.spaceContainer}>
          Content
        </Space>
      </Drawer>
    </>
  );
};

export const DrawerPlacements = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [placement, setPlacement] = useState<NDrawer.TProps['placement']>('left');

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const onChange = (e: RadioChangeEvent) => setPlacement(e.target.value);

  return (
    <>
      <RadioGroup value={placement} onChange={onChange}>
        <Radio value="top">top</Radio>
        <Radio value="right">right</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
      </RadioGroup>
      <Button onClick={handleOpenDrawer}>Открыть Drawer</Button>

      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer} placement={placement}>
        <div className={styles.spaceContainer}>
          <Space direction="vertical">Content</Space>
        </div>
      </Drawer>
    </>
  );
};

export const LoadingDrawer = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const showLoading = () => {
    setIsDrawerOpen(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <Button onClick={showLoading}>Открыть drawer</Button>
      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer} isLoading={isLoading}>
        <div className={styles.spaceContainer}>
          <Space direction="vertical">Content</Space>
        </div>
      </Drawer>
    </>
  );
};

export const CustomHeader = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer}>Открыть drawer</Button>
      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <div className={styles.spaceContainer}>
          <Space direction="vertical">Content</Space>
        </div>
      </Drawer>
    </>
  );
};

export const DrawerWithoutFooter = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer}>Открыть drawer</Button>
      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <Space direction="vertical" className={styles.spaceContainer}>
          Content
        </Space>
      </Drawer>
    </>
  );
};

export const CustomedDefaultFooter = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer}>Открыть drawer</Button>
      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <Space direction="vertical" className={styles.spaceContainer}>
          Content
        </Space>
      </Drawer>
    </>
  );
};

export const CustomFooter = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer}>Открыть drawer</Button>
      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <Space direction="vertical" className={styles.spaceContainer}>
          Content
        </Space>
      </Drawer>
    </>
  );
};

export const CustomWidth = (argTypes: NDrawer.TProps): ReactNode => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <Button onClick={handleOpenDrawer}>Открыть drawer</Button>
      <Drawer {...argTypes} isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <Space direction="vertical" className={styles.spaceContainer}>
          Content
        </Space>
      </Drawer>
    </>
  );
};

DefaultDrawer.args = {
  title: 'Заголовок',
  isDestroyOnClose: true,
  size: 'default',
  isResizable: true,
  placement: 'left',
  withDefaultFooter: true,
};

DrawerPlacements.args = {
  ...DefaultDrawer.args,
};

LoadingDrawer.args = {
  ...DefaultDrawer.args,
  isLoading: true,
};
CustomHeader.args = {
  ...DefaultDrawer.args,
  extra: (
    <>
      <Button type="text" size="small">
        <IconClock size={16} />
      </Button>
      <Button type="text" size="small">
        <IconDeviceFloppy size={16} />
      </Button>
      <Button type="text" size="small">
        <IconClock size={16} />
      </Button>
      <Button type="text" size="small">
        <IconDeviceFloppy size={16} />
      </Button>
    </>
  ),
};

DrawerWithoutFooter.args = {
  ...DefaultDrawer.args,
  withDefaultFooter: false,
};

CustomedDefaultFooter.args = {
  ...DefaultDrawer.args,
  defaultFooterProps: {
    cancelBtnText: 'Отмена',
    acceptBtnText: 'Принять',
    onAccept: () => {
      alert('Сработал callback, который определили в defaultFooterProps!');
    },
  },
};

CustomFooter.args = {
  title: 'Заголовок',
  isDestroyOnClose: true,
  size: 'default',
  isResizable: true,
  placement: 'left',
  customFooter: (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', height: '100%' }}>
      <Button type="primary">ОК</Button>
      <div style={{ display: 'flex', alignItems: 'center' }}>Дополнительный элемент</div>
    </div>
  ),
};

CustomWidth.args = {
  ...DefaultDrawer.args,
  width: '40vw',
};
