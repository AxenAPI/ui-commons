import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';

import { MenuTheme } from 'antd';

import { Button, Divider, Switch } from '@/ui';

import { Menu } from '../Menu';
import { NMenu } from '../models';
import { COLLAPSED_INLINE, DEFAULT_ITEMS, INLINE_NAVIGATION, OPEN_CURRENT_SUBMENU, TOP_NAVIGATION } from './consts';

const meta: Meta<NMenu.TProps> = {
  title: 'Axenix UI/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<NMenu.TProps> = (args: NMenu.TProps) => <Menu {...args} />;

export const Default = Template.bind({});
export const TopNavigation = Template.bind({});
export const InlineMenu = Template.bind({});
export const VerticalMenu = Template.bind({});

Default.args = {
  items: DEFAULT_ITEMS,
};

TopNavigation.args = {
  items: TOP_NAVIGATION,
  mode: 'horizontal',
};

InlineMenu.args = {
  style: { width: 256 },
  defaultSelectedKeys: ['1'],
  defaultOpenKeys: ['sub1'],
  mode: 'inline',
  items: INLINE_NAVIGATION,
};

VerticalMenu.args = {
  style: { width: 256 },
  mode: 'vertical',
  items: INLINE_NAVIGATION,
};

export const CollapsedInlineMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <IconLayoutSidebarLeftExpand /> : <IconLayoutSidebarLeftCollapse />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        isInlineCollapsed={collapsed}
        items={COLLAPSED_INLINE}
      />
    </div>
  );
};

export const OpenCurrentSubMenu = () => {
  const getLevelKeys = (items1: NMenu.TLevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: NMenu.TLevelKeysProps[], level = 1) => {
      items2.forEach(item => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(OPEN_CURRENT_SUBMENU as NMenu.TLevelKeysProps[]);

  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  const onOpenChange: NMenu.TProps['onOpenChange'] = openKeys => {
    const currentOpenKey = openKeys.find(key => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={OPEN_CURRENT_SUBMENU}
    />
  );
};

export const ThemesMenu = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: NMenu.TProps['onClick'] = e => {
    setCurrent(e.key);
  };

  return (
    <>
      <Switch isChecked={theme === 'dark'} onChange={changeTheme} onClick={() => {}} />
      <br />
      <br />
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={INLINE_NAVIGATION}
      />
    </>
  );
};

export const SwitchMenuTheme = () => {
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [theme, setTheme] = useState<MenuTheme>('light');

  const changeMode = (value: boolean) => {
    setMode(value ? 'vertical' : 'inline');
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <>
      <Switch onChange={changeMode} onClick={() => {}} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} onClick={() => {}} /> Change Style
      <br />
      <br />
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        items={INLINE_NAVIGATION}
      />
    </>
  );
};
